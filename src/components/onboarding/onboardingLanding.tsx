import React from "react";
import RevealWrapper from "../../components/animation/RevealWrapper";
import Button from "../../components/ui/Button";

type Props = {
  handleNext: () => void;
};

const OnboardingLanding = ({ handleNext }: Props) => {
  return (
    <RevealWrapper animate>
      <div className="w-full h-fit flex flex-col justify-around">
        <div>
          <h1
            className="text-[2rem] font-bold mt-16 md:mt-20 mb-4 text-primary"
            id="welcome-title"
          >
            Welcome to Flowva
          </h1>
          <p
            className="text-sm md:text-base"
            id="welcome-description"
            aria-describedby="welcome-description"
          >
            Your smart library for organizing tools, tracking usage, and turning
            productivity into rewards. Let's set up your digital library in 2
            minutes.
          </p>
        </div>

        {/* Button */}
        <Button
          handleClick={handleNext}
          title="Let's Go"
          type="button"
          key={"onboarding-landing"}
          aria-labelledby="welcome-title"
        />
      </div>
    </RevealWrapper>
  );
};

export default OnboardingLanding;
