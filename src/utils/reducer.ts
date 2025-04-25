interface State {
  onboardingLanding: { active: boolean; passed: boolean };
  aboutYou: { active: boolean; passed: boolean };
  location: { active: boolean; passed: boolean };
  toolStack: { active: boolean; passed: boolean };
  tracking: { active: boolean; passed: boolean };
  setupComplete: { active: boolean; passed: boolean };
}

// initial state
export const initialState: State = {
  onboardingLanding: { active: true, passed: false },
  aboutYou: { active: false, passed: false },
  location: { active: false, passed: false },
  toolStack: { active: false, passed: false },
  tracking: { active: false, passed: false },
  setupComplete: { active: false, passed: false },
};

type Action =
  | { type: "SET_ACTIVE_STEP"; payload: keyof State }
  | { type: "COMPLETE_UP_TO"; payload: keyof State };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ACTIVE_STEP":
      return Object.keys(state).reduce((acc, key) => {
        acc[key as keyof State] = {
          active: key === action.payload,
          passed: acc[key as keyof State]?.passed || false,
        };

        return acc;
      }, {} as State);

    case "COMPLETE_UP_TO":
      const keys = Object.keys(state) as (keyof State)[];
      const index = keys.indexOf(action.payload);
      const newState = {} as State;

      keys.forEach((key, i) => {
        newState[key] = {
          active: i === index, // present is true
          passed: i < index, // previous steps are true
        };
      });

      return newState;

    default:
      return state;
  }
};
