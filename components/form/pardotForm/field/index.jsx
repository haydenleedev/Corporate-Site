import { useContext } from "react";
import { cn } from "../../../../utils/generic";
import PardotFormContext from "../context";
import { getErrorMessage, isHiddenField } from "../utils/helpers";
import FieldResolver from "./resolver";
import style from "../form.module.scss";
import FormError from "../../formError";

const Field = (props) => {
  const { field, index } = props;
  const { state, handleDispatch, isDealRegistrationForm } =
    useContext(PardotFormContext);

  const isFirstPartnerFieldIndex =
    state.firstPartnerFieldIndex === null &&
    field.name.toLowerCase().match(/partner/) &&
    !field.name.toLowerCase().match(/partner area of interest/) &&
    !isHiddenField(field, isDealRegistrationForm);

  const shouldBeHiddenStateSelect =
    field.name.toLowerCase().match(/state/) &&
    ((!field.name.toLowerCase().match(/partner/) && !state.stateFieldVisible) ||
      (field.name.toLowerCase().match(/partner/) &&
        !state.partnerStateFieldVisible));

  if (isFirstPartnerFieldIndex) {
    handleDispatch({
      type: pardotFormActions.setFirstPartnerFieldIndex,
      value: index,
    });
  }
  return (
    <label
      key={`formField${index}`}
      className={cn({
        "display-none":
          isHiddenField(field, isDealRegistrationForm) ||
          shouldBeHiddenStateSelect,
        [style.error]: state.formErrors[index],
        [style.valid]: state.touchedFields[index] && !state.formErrors[index],
      })}
    >
      {!isHiddenField(field, isDealRegistrationForm) && (
        <span>
          {index == state.firstPartnerFieldIndex && (
            <span
              className={cn([
                "heading-6",
                style["pt-3"],
                style["mt-3"],
                style["pb-2"],
                style["bt-1"],
              ])}
            >
              {isDealRegistrationForm
                ? "Your Information"
                : isChannelRequestForm
                ? "Partner Information"
                : null}
            </span>
          )}
          {field.isRequired && <span className={style.required}>*</span>}{" "}
          <span>
            {field.name.toLowerCase() === "company"
              ? "Company Name"
              : field.name.toLowerCase() === "email"
              ? "Work Email"
              : field.name}
          </span>
        </span>
      )}
      <FieldResolver {...props} />
      {state.formErrors[index] && (
        <FormError
          message={
            state.pasteError && state.pasteError.index === index
              ? state.pasteError.msg
              : getErrorMessage(field.name)
          }
        />
      )}
    </label>
  );
};

export default Field;
