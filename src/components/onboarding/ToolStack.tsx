import React, { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import type { FormType } from "./Onboard";
import type {
  ErrorAction,
  ErrorState,
  FieldType,
} from "../../utils/errorReducer";
import Button from "../../components/ui/Button";
import RevealWrapper, {
  fadeInLeft,
} from "../../components/animation/RevealWrapper";

const tools = [
  { name: "Notion", icon: "📝" },
  { name: "Trello", icon: "📋" },
  { name: "Slack", icon: "💬" },
  { name: "ClickUp", icon: "✅" },
  { name: "Canva", icon: "🎨" },
  { name: "Zapier", icon: "⚡" },
  { name: "Stripe", icon: "💳" },
  { name: "Figma", icon: "✏️" },
  { name: "Calendly", icon: "📅" },
];

type Props = {
  setForm: (form: Partial<FormType>) => void;
  handleNext: () => void;
  errorState: ErrorState;
  dispatch: React.Dispatch<ErrorAction>;
};

const ToolStack = ({ handleNext, setForm, dispatch, errorState }: Props) => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const toggleTool = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName)
        ? prev.filter((p) => p !== toolName)
        : [...prev, toolName]
    );
  };

  const handleContinue = () => {
    if (selectedTools.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Please select a tool stack or you can skip for now",
          component: "toolStack",
          field: "toolStack",
        },
      });
      return;
    }

    dispatch({ type: "CLEAR_ERROR" });

    setForm({ toolStack: selectedTools });
    handleNext();
  };

  const handleSkip = () => {
    dispatch({ type: "CLEAR_ERROR" });
    setForm({ toolStack: [""] });
    handleNext();
  };

  // check the error for which field
  const hasErrorFor = (field: FieldType): boolean => {
    return errorState.hasError && errorState.field === field;
  };

  return (
    <RevealWrapper animate variants={fadeInLeft}>
      <div>
        <PageTitle
          key="tool-stack-title"
          title="Your Tool Stack"
          paragraph="Which tools are part of your workflow? We'll pre-load and organize them in your library."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => toggleTool(tool.name)}
              className={`cursor-pointer flex flex-col justify-center items-center gap-2 px-4 py-8 border rounded-lg transition-all duration-500 hover:border-primary ${
                selectedTools.includes(tool.name)
                  ? "bg-primary-light border-primary"
                  : "bg-white border-[#ddd]"
              }`}
              role="button"
              aria-pressed={selectedTools.includes(tool.name)}
              tabIndex={0}
              aria-label={`Select ${tool.name} tool`}
            >
              <span className="text-xl md:text-2xl">{tool.icon}</span>
              <span className="font-medium">{tool.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[#666] mb-[1.5rem]">
          You can always add more tools later in your library settings.
        </p>

        {hasErrorFor("toolStack") && (
          <div className="mt-4 warning" role="alert">
            <span className="mr-2">*</span>
            <span>{errorState.message}</span>
          </div>
        )}

        <div className="w-full flex items-center justify-between mt-16">
          {/* Continue Button */}
          <Button
            handleClick={handleContinue}
            title="Continue"
            type="button"
            key={"toolStack"}
            addMargin={false}
            aria-label="Continue to the next step"
          />

          {/* Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="md:w-[45%] w-[50%] text-wrap md:text-right text-center cursor-pointer text-dark transition-all duration-500 hover:text-primary md:text-base text-sm"
            aria-label="Skip this step and add tools later"
          >
            Skip – I'll add them later
          </button>
        </div>
      </div>
    </RevealWrapper>
  );
};

export default ToolStack;
