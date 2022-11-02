import FormError from "../../formError";
import HoneypotFields from "../../honeypotFields";
import Field from "../field";
import PardotFormContext from "../context";
import style from "../form.module.scss";
import EmailStep from "./emailStep";
import { useContext } from "react";

const StepForm = ({ customAction, btnColor, submit, config }) => {
  const { state, formRef, handleSubmit, isContactForm } =
    useContext(PardotFormContext);
  const isFirstStep = !state.fieldsMatchedToStep && !state.finalStepSubmitted;
  const isStep = state.fieldsMatchedToStep && !state.finalStepSubmitted;
  const isFinalStep = state.finalStepSubmitted;
  if (isFirstStep) {
    return (
      <form
        className={style.pardotForm}
        ref={formRef}
        style={{ display: state.clientJSEnabled ? "" : "none" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        autoComplete={isContactForm ? "off" : "on"}
      >
        <EmailStep stepFields={config.items[0].fields} />
      </form>
    );
  } else if (isStep) {
    return (
      <form
        action={state.action}
        method={customAction ? null : "post"}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete={isContactForm ? "off" : "on"}
        className={style.pardotForm}
        style={{ display: state.clientJSEnabled ? "" : "none" }}
        ref={formRef}
      >
        {state.fieldData?.map((field, index) => (
          <Field field={field} index={index} />
        ))}

        {(state.includeTimeStampInEmailAddress ||
          state.stepEmailFieldValue) && (
          <input name="hiddenemail" className="display-none" />
        )}
        <HoneypotFields />
        <div className="layout mt-4 d-flex flex-direction-column align-items-center">
          <input
            type="submit"
            className={`button ${btnColor ? btnColor : "orange"}`}
            value={state.submissionInProgress ? "Please wait..." : submit}
            required="required"
          />
          {!state.submissionAllowed && (
            <FormError
              message={"Something went wrong. Please try again later."}
            />
          )}
        </div>
      </form>
    );
  } else if (isFinalStep) {
    return <p>Thank you for contacting us.</p>;
  }
};

export default StepForm;
