import React, { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import type { FormType } from "./Onboard";
import Button from "../../components/ui/Button";
import type {
  ErrorAction,
  ErrorState,
  FieldType,
} from "../../utils/errorReducer";
import RevealWrapper, {
  fadeInDown,
} from "../../components/animation/RevealWrapper";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "Nigeria",
];

type Props = {
  setForm: (form: Partial<FormType>) => void;
  handleNext: () => void;
  errorState: ErrorState;
  dispatch: React.Dispatch<ErrorAction>;
};

const UserLocation = ({ setForm, handleNext, dispatch, errorState }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (selectedCountry === "") {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please select a country",
          component: "location",
          field: "country",
        },
      });
      return;
    }
    dispatch({ type: "CLEAR_ERROR" });
    setForm({ country: selectedCountry });
    handleNext();
  };

  const handleSkip = () => {
    dispatch({ type: "CLEAR_ERROR" });
    setForm({ country: "" });
    handleNext();
  };

  // check the error for which field
  const hasErrorFor = (field: FieldType): boolean => {
    return errorState.hasError && errorState.field === field;
  };

  return (
    <RevealWrapper animate variants={fadeInDown}>
      <div>
        <PageTitle
          key="location-title"
          title="Where Are You Based?"
          paragraph="This helps us personalize tool suggestions, currencies, and rewards for you."
        />
        <div className="w-full">
          {/* Country Selection */}
          <div>
            <label
              htmlFor="country"
              className="block mb-2 font-semibold"
              id="country-label"
            >
              Country
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                dispatch({ type: "CLEAR_ERROR" });
              }}
              className="border rounded-theme border-[#ddd] p-3 rounded w-full focus-border-primary"
              aria-labelledby="country-label"
            >
              <option value="">Select your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {hasErrorFor("country") && (
              <div className="mt-4 warning" role="alert">
                <span className="mr-2">*</span>
                <span>{errorState.message}</span>
              </div>
            )}
          </div>

          <div className="w-full flex  items-center justify-between mt-20 md:mt-30">
            {/* Continue Button */}
            <Button
              handleClick={handleContinue}
              title="Continue"
              type="button"
              key={"location"}
              addMargin={false}
              aria-label="Continue to next step"
            />

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="md:w-[30%] w-[60%] md:text-base text-sm text-center cursor-pointer text-dark transition-all duration-500 hover:text-primary"
              aria-label="Skip this step"
            >
              Skip this step
            </button>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
};

export default UserLocation;
