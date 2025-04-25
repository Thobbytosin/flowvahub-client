import React, { useState } from "react";
import RevealWrapper, {
  springFadeInRight,
} from "../../components/animation/RevealWrapper";
import Button from "../../components/ui/Button";
import PageTitle from "../../components/ui/PageTitle";
import { styles } from "../../styles/styles";

type Props = {};

const SetupComplete = (props: Props) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleGoToDashboard = () => {
    setShowPopup(true);
  };
  return (
    <RevealWrapper animate variants={springFadeInRight}>
      <div className="h-[50vh] w-full flex flex-col justify-between relative">
        {showPopup && (
          <div
            className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center"
            role="dialog"
            aria-labelledby="popup-title"
            aria-describedby="popup-description"
          >
            <div className="bg-white rounded-theme flex flex-col justify-center items-center p-10">
              <h2 id="popup-title" className={styles.heading}>
                Onboarding Complete!
              </h2>
              <p id="popup-description" className="mt-4">
                Taking you to your dashboard now
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="rounded-theme mt-8 text-white cursor-pointer bg-primary px-8 py-4 font-semibold"
                aria-label="Close popup and go to dashboard"
              >
                Ok
              </button>
            </div>
          </div>
        )}

        <div>
          <PageTitle
            key="setupComplete-title"
            title="Setup Complete!"
            paragraph="Your Flowva library is ready to use. We'll take you to your dashboard now where you can start organizing your tools and tracking your productivity."
          />
        </div>

        {/* button */}
        <Button
          handleClick={handleGoToDashboard}
          title="Go to Dashboard"
          type="button"
          key={"setupComplete"}
          addMargin={false}
          aria-label="Go to your dashboard"
        />
      </div>
    </RevealWrapper>
  );
};

export default SetupComplete;
