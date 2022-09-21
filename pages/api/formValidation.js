export default async function handler(req, res) {
  try {
    // parsedBody structure: {check: {ip: "", domain: ""}, client: {}, token: "" }
    const parsedBody = JSON.parse(req.body);
    // check IP/domain blocklist first
    const blockCheckData = new URLSearchParams();
    blockCheckData.append("ip", parsedBody.check.ip);
    blockCheckData.append("domain", parsedBody.check.domain);
    let blockCheckResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbw2L1DpM7EWcBR1BWEFon_FvYHX8TbRrdTH585k-kPiaAO4hj6aaRr6p_i2A5UVM3LX/exec",
      {
        method: "POST",
        body: blockCheckData,
      }
    );
    blockCheckResponse = await blockCheckResponse.json();
    if (blockCheckResponse.blacklisted || blockCheckResponse.error) {
      return res
        .status(200)
        .json({ submissionAllowed: false, reason: "Disallowed" });
    }
    // if block list check was ok, proceed to creating recaptcha accessment
    let assessment = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/ujet-cx-marketing-website/assessments?key=AIzaSyDei7-DOrMEvJzzIefivfXHRmOVt2uyFdo`,
      {
        method: "POST",
        body: JSON.stringify({
          event: {
            token: parsedBody.token,
            siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY,
            expectedAction: "FORM_SUBMISSION",
          },
        }),
      }
    );
    assessment = await assessment?.json();
    const isAcceptableScore = assessment?.riskAnalysis?.score >= 0.3;
    if (!isAcceptableScore)
      return res
        .status(200)
        .json({ submissionAllowed: false, reason: "ReCAPTCHA failed" });
    // block list check and recaptcha assesment were ok, proceed to saving client data
    const clientData = new URLSearchParams();
    Object.keys(parsedBody.client).forEach((key) => {
      clientData.append(key, parsedBody.client[key]);
    });
    let clientDataResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbwS8kFTFhN4vPpykcC9LcxsCdSjxtMnWXCHwNxUsOxKOKeZo90YGDztuIeBqrIQzhWhLw/exec",
      {
        method: "POST",
        body: clientData,
      }
    );
    clientDataResponse = await clientDataResponse.json();
    console.log("Response:", clientDataResponse);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false, reason: "Error" });
  }
}
