import { useReducer, useState } from "react";
import { initialState, reducer } from "../../utils/reducer";
import OnboardingLanding from "./onboardingLanding";
import AboutYou from "./AboutYou";
import UserLocation from "./UserLocation";
import ToolStack from "./ToolStack";
import Tracking from "./Tracking";
import SetupComplete from "./SetupComplete";
import { errorInitialState, errorReducer } from "../../utils/errorReducer";

export type FormType = {
  selfDescription: string;
  work: string[];
  country: string;
  toolStack: string[];
  goals: string[];
};
export function Onboard() {
  const [onboardingState, dispatch] = useReducer(reducer, initialState);
  const [errorState, errorDispatch] = useReducer(
    errorReducer,
    errorInitialState
  );
  const {
    onboardingLanding,
    aboutYou,
    location,
    setupComplete,
    toolStack,
    tracking,
  } = onboardingState;
  const initialFormState = {
    selfDescription: "",
    work: [""],
    country: "",
    toolStack: [""],
    goals: [""],
  };

  const [form, setForm] = useState<FormType>(initialFormState);

  const onboardingArray = Object.entries(onboardingState).map(
    ([key, value]) => ({
      step: key,
      active: value.active,
      passed: value.passed,
    })
  );

  return (
    <main className=" min-h-screen w-screen flex items-center justify-center py-20">
      <div className="  w-[80%] lg:w-[60%] min-h-[80%] bg-white rounded-theme  card-shadow p-10 ">
        {/* swiper */}
        <div className=" w-full h-[6px] bg-[#e0e0e0] rounded-full mb-[2rem] flex ">
          {onboardingArray.map((item, index) => (
            <div
              key={index}
              className={`${
                item.passed ? "w-[20%] bg-primary" : " bg-transparent"
              } ${
                item.passed &&
                item.step === "onboardingLanding" &&
                "rounded-l-full"
              } ${
                item.passed && item.step === "tracking" && "rounded-r-full"
              } `}
            />
          ))}
        </div>

        {/* onboarding landing */}
        {onboardingLanding.active && (
          <OnboardingLanding
            handleNext={() => {
              dispatch({ type: "SET_ACTIVE_STEP", payload: "aboutYou" });
              dispatch({ type: "COMPLETE_UP_TO", payload: "aboutYou" });
            }}
          />
        )}
        {aboutYou.active && (
          <AboutYou
            setForm={(updatedValues) =>
              setForm((prev) => ({ ...prev, ...updatedValues }))
            }
            handleNext={() => {
              dispatch({ type: "SET_ACTIVE_STEP", payload: "location" });
              dispatch({ type: "COMPLETE_UP_TO", payload: "location" });
            }}
            errorState={errorState}
            dispatch={errorDispatch}
          />
        )}
        {location.active && (
          <UserLocation
            setForm={(updatedValue) =>
              setForm((prev) => ({ ...prev, ...updatedValue }))
            }
            handleNext={() => {
              dispatch({ type: "SET_ACTIVE_STEP", payload: "toolStack" });
              dispatch({ type: "COMPLETE_UP_TO", payload: "toolStack" });
            }}
            errorState={errorState}
            dispatch={errorDispatch}
          />
        )}
        {toolStack.active && (
          <ToolStack
            setForm={(updatedValue) =>
              setForm((prev) => ({ ...prev, ...updatedValue }))
            }
            handleNext={() => {
              dispatch({ type: "SET_ACTIVE_STEP", payload: "tracking" });
              dispatch({ type: "COMPLETE_UP_TO", payload: "tracking" });
            }}
            errorState={errorState}
            dispatch={errorDispatch}
          />
        )}
        {tracking.active && (
          <Tracking
            setForm={(updatedValue) =>
              setForm((prev) => ({ ...prev, ...updatedValue }))
            }
            handleNext={() => {
              dispatch({ type: "SET_ACTIVE_STEP", payload: "setupComplete" });
              dispatch({ type: "COMPLETE_UP_TO", payload: "setupComplete" });
            }}
            errorState={errorState}
            dispatch={errorDispatch}
            form={form}
          />
        )}
        {setupComplete.active && <SetupComplete />}
      </div>
    </main>
  );
}
