import React, { useState } from "react";
import type { FormType } from "./Onboard";
import type {
  ErrorAction,
  ErrorState,
  FieldType,
} from "../../utils/errorReducer";
import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import RevealWrapper from "../../components/animation/RevealWrapper";
import { toast } from "sonner";
import { useMutateData } from "../../hook/useApi";
const goalsArray = [
  { title: "Subscription costs", value: "subscription" },
  { title: "Tool usage & engagement", value: "toolUse" },
  { title: "Unused/duplicate tools", value: "unusedTools" },
  { title: "Personalized tool suggestions", value: "personalizedTools" },
];

type Props = {
  setForm: (form: Partial<FormType>) => void;
  handleNext: () => void;
  errorState: ErrorState;
  dispatch: React.Dispatch<ErrorAction>;
  form: FormType;
};

const Tracking = ({
  dispatch,
  errorState,
  handleNext,
  setForm,
  form,
}: Props) => {
  const [selectedTrackingOptions, setSelectedTrackingOptions] = useState<
    string[]
  >([]);
  const { mutate: updateUser, isPending: updatePending } = useMutateData({
    url: "/user/update-user-preference",
    method: "PUT",
    mutationKey: ["update-user-preference"],
  });

  const handleCheck = (value: string) => {
    if (errorState.hasError && errorState.field === "tracking") {
      dispatch({ type: "CLEAR_ERROR" });
    }

    setSelectedTrackingOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // clear any existing errors
    dispatch({ type: "CLEAR_ERROR" });

    // if fieldset is empty
    if (selectedTrackingOptions.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please select at least one option",
          field: "tracking",
          component: "tracking",
        },
      });
      return;
    }

    // filter the selected work/works
    const userMatchedGoals = selectedTrackingOptions
      .map((item) => goalsArray.find((goal) => goal.value === item))
      .filter(Boolean);

    // get the corressponding  selected works titles (ensure it returns a value not undefined)
    const seletectedTitles = userMatchedGoals
      .map((s) => s?.title)
      .filter((title) => typeof title === "string");

    // final work selection
    const finalSelection: string[] = [...seletectedTitles];

    // sent to backend
    updateUser(
      { ...form, goals: finalSelection },
      {
        onSuccess: async (data: any) => {
          toast.success("Profile Updated", {
            description: data.message,
            duration: 4000,
          });

          setTimeout(() => {
            handleNext(); // go to the next screen
          }, 2000);
        },
        onError: (error: any) => {
          toast.error(`${error.response.data.message}`, {
            description: "Something went wrong. Try again",
            duration: 4000,
          });
        },
      }
    );
  };

  // check the error for which field
  const hasErrorFor = (field: FieldType): boolean => {
    return errorState.hasError && errorState.field === field;
  };

  return (
    <RevealWrapper animate>
      <div>
        <PageTitle
          key="tracking-title"
          title="What Do You Want to Track or Improve?"
          paragraph="This helps us personalize your dashboard and features."
        />

        <form onSubmit={handleSubmit}>
          {/* fieldset */}
          <fieldset className="mt-4">
            <legend className="font-semibold mb-4">Select your goals</legend>

            {hasErrorFor("tracking") && (
              <div className="mt-2 mb-4 warning" role="alert">
                <span className="mr-2">*</span>
                <span>{errorState.message}</span>
              </div>
            )}

            {goalsArray.map((goal, index) => (
              <label
                key={index}
                className="flex items-center gap-2 mb-3 cursor-pointer"
                htmlFor={`goal-${goal.value}`}
              >
                <input
                  type="checkbox"
                  id={`goal-${goal.value}`}
                  name="tracking-goal"
                  checked={selectedTrackingOptions.includes(goal.value)}
                  onChange={(e) => handleCheck(goal.value)}
                  aria-checked={selectedTrackingOptions.includes(goal.value)}
                  aria-label={`Select goal: ${goal.title}`}
                />
                <span>{goal.title}</span>
              </label>
            ))}
          </fieldset>

          {/* Submit Button */}
          <Button
            handleClickForm={handleSubmit}
            title="Continue"
            type="submit"
            key={"tracking"}
            finalPage
            loading={updatePending}
            aria-label="Continue to the next step"
          />
        </form>
      </div>
    </RevealWrapper>
  );
};

export default Tracking;
