export type ComponentType = "aboutYou" | "location" | "tracking" | "toolStack";
export type FieldType =
  | "selfDescription"
  | "work"
  | "work-other"
  | "work-other-2"
  | "country"
  | "toolStack"
  | "tracking";

export type ErrorState = {
  hasError: boolean;
  field?: FieldType | undefined;
  message: string;
  type?: ComponentType;
};

export type ErrorAction =
  | {
      type: "SET_ERROR";
      payload: {
        message: string;
        field?: FieldType | undefined;
        component?: ComponentType;
      };
    }
  | { type: "CLEAR_ERROR" };

export const errorInitialState: ErrorState = {
  hasError: false,
  message: "",
  field: undefined,
  type: undefined,
};

export const errorReducer = (
  state: ErrorState,
  action: ErrorAction
): ErrorState => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        hasError: true,
        message: action.payload.message,
        type: action.payload.component,
        field: action.payload.field,
      };

    case "CLEAR_ERROR":
      return errorInitialState;

    default:
      return state;
  }
};
