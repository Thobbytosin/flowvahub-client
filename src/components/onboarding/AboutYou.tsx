import React, { useState } from "react";
import PageTitle from "../ui/PageTitle";
import type { FormType } from "./Onboard";
import Button from "../ui/Button";
import type {
  ErrorAction,
  ErrorState,
  FieldType,
} from "../../utils/errorReducer";
import RevealWrapper, { scaleIn } from "../animation/RevealWrapper";

const descriptionArray = [
  { title: "Freelancer", value: "freelancer" },
  { title: "Solo Entrepreneur", value: "soloEntrepreneur" },
  { title: "Small Team", value: "smallTeam" },
  { title: "Creator", value: "creator" },
];

const workArray = [
  { title: "Design", value: "design" },
  { title: "Development", value: "development" },
  { title: "Writing", value: "writing" },
  { title: "Marketing", value: "marketing" },
];

type Props = {
  setForm: (form: Partial<FormType>) => void;
  handleNext: () => void;
  errorState: ErrorState;
  dispatch: React.Dispatch<ErrorAction>;
};

const AboutYou = ({ setForm, handleNext, dispatch, errorState }: Props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedWorkOptions, setSelectedWorkOptions] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");

  const handleCheck = (value: string) => {
    if (errorState.hasError && errorState.field === "work") {
      dispatch({ type: "CLEAR_ERROR" });
    }

    if (value === "other") {
      if (selectedWorkOptions.includes("other")) {
        setSelectedWorkOptions((prev) => prev.filter((v) => v !== "other"));
      } else {
        setOtherText("");
        setSelectedWorkOptions((prev) => [...prev, "other"]);
      }
    } else {
      setSelectedWorkOptions((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // clear any existing errors
    dispatch({ type: "CLEAR_ERROR" });

    // if fieldset is empty
    if (selectedOption.trim() === "") {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please select an option",
          field: "selfDescription",
          component: "aboutYou",
        },
      });
      return;
    }

    // if second fieldset is empty
    if (selectedWorkOptions.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please select at least one option",
          field: "work",
          component: "aboutYou",
        },
      });
      return;
    }

    // if other is selected but input is empty
    if (
      (selectedWorkOptions.includes("other") && otherText.trim() === "") ||
      (selectedWorkOptions.includes("other") && otherText.length < 1)
    ) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please describe your 'Other' option.",
          field: "work-other",
          component: "aboutYou",
        },
      });
      return;
    }

    // if other text is same as any of the listed title
    if (
      workArray.some(
        (w) =>
          w.title === otherText.trim() ||
          w.title.toLowerCase() === otherText.toLowerCase().trim()
      ) ||
      otherText.trim() === "Other" ||
      otherText.toLowerCase().trim() === "other"
    ) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Category exists. Please enter a new category of work.",
          field: "work-other-2",
          component: "aboutYou",
        },
      });

      return;
    }

    // find the selected option from the array
    const findFinalDescription = descriptionArray.find(
      (d) => d.value === selectedOption
    );

    // get final description
    const finalDescription = findFinalDescription?.title;

    // filter the selected work/works
    const userMatchedWorks = selectedWorkOptions
      .map((item) => workArray.find((work) => work.value === item))
      .filter(Boolean);

    // get the corressponding  selected works titles (ensure it returns a value not undefined)
    const seletectedTitles = userMatchedWorks
      .map((s) => s?.title)
      .filter((title) => typeof title === "string");

    // final work selection
    let finalSelection: string[] = [];
    if (seletectedTitles && otherText) {
      finalSelection = [...seletectedTitles, otherText];
    } else {
      finalSelection = [...seletectedTitles];
    }

    // add to the form
    setForm({ selfDescription: finalDescription, work: finalSelection });

    handleNext(); // go to the next screen
  };

  // check the error for which field
  const hasErrorFor = (field: FieldType): boolean => {
    return errorState.hasError && errorState.field === field;
  };

  return (
    <RevealWrapper animate variants={scaleIn}>
      <div>
        <PageTitle
          key="about-title"
          title="About You"
          paragraph="Help us tailor your library by telling us a bit about yourself."
        />

        <form onSubmit={handleSubmit} role="form" aria-labelledby="form-title">
          {/* First Fieldset: Self Description */}
          <fieldset>
            <legend id="self-description" className="font-semibold mb-4">
              What best describes you?
            </legend>

            {hasErrorFor("selfDescription") && (
              <div
                className="mt-2 mb-4 warning"
                role="alert"
                aria-live="assertive"
              >
                <span className="mr-2">*</span>
                <span>{errorState.message}</span>
              </div>
            )}

            {descriptionArray.map((desc, index) => (
              <label
                key={index}
                className="flex items-center gap-2 mb-3"
                htmlFor={`selfDescription-${desc.value}`}
              >
                <input
                  type="radio"
                  name="choice"
                  id={`selfDescription-${desc.value}`}
                  value={desc.value}
                  checked={selectedOption === desc.value}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    if (hasErrorFor("selfDescription")) {
                      dispatch({ type: "CLEAR_ERROR" });
                    }
                  }}
                  aria-labelledby={`selfDescription-${desc.value}`}
                  required
                />
                <span>{desc.title}</span>
              </label>
            ))}
          </fieldset>

          {/* Second Fieldset: Work Description */}
          <fieldset className="mt-4">
            <legend id="work-description" className="font-semibold mb-4">
              What kind of work do you do?
            </legend>

            {hasErrorFor("work") && (
              <div
                className="mt-2 mb-4 warning"
                role="alert"
                aria-live="assertive"
              >
                <span className="mr-2">*</span>
                <span>{errorState.message}</span>
              </div>
            )}

            {workArray.map((work, index) => (
              <label
                key={index}
                className="flex items-center gap-2 mb-3 cursor-pointer"
                htmlFor={`work-${work.value}`}
              >
                <input
                  type="checkbox"
                  id={`work-${work.value}`}
                  checked={selectedWorkOptions.includes(work.value)}
                  onChange={(e) => handleCheck(work.value)}
                  aria-labelledby={`work-${work.value}`}
                />
                <span>{work.title}</span>
              </label>
            ))}

            {/* Other Checkbox */}
            <div className="md:flex items-center gap-2">
              <div className="flex items-center gap-2">
                <label
                  key={"other"}
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="work-other"
                >
                  <input
                    type="checkbox"
                    id="work-other"
                    checked={selectedWorkOptions.includes("other")}
                    onChange={(e) => handleCheck("other")}
                    aria-labelledby="work-other"
                  />
                  <span>Other</span>
                </label>

                {/* Show other input */}
                {selectedWorkOptions.includes("other") && (
                  <input
                    type="text"
                    id="work-other-text"
                    value={otherText}
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      if (
                        errorState.hasError &&
                        errorState.field === "work-other"
                      ) {
                        dispatch({ type: "CLEAR_ERROR" });
                      }
                    }}
                    placeholder="Please specify..."
                    className="w-[50%] md:w-[70%] p-2 border border-gray-300 rounded focus:border-primary"
                    aria-label="Other work category"
                    required
                  />
                )}
              </div>

              {hasErrorFor("work-other") && (
                <div
                  className="mt-2 mb-4 warning"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="mr-2">*</span>
                  <span>{errorState.message}</span>
                </div>
              )}

              {hasErrorFor("work-other-2") && (
                <div
                  className="mt-2 mb-4 warning"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="mr-2">*</span>
                  <span className="text-sm">
                    Category exists. Please enter a new category of work.
                  </span>
                </div>
              )}
            </div>
          </fieldset>

          {/* Continue Button */}
          <Button
            handleClickForm={handleSubmit}
            title="Continue"
            type="submit"
            key={"aboutYou"}
            aria-label="Continue to the next step"
          />
        </form>
      </div>
    </RevealWrapper>
  );
};

export default AboutYou;
