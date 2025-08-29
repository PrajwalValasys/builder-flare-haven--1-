import { LOADER } from "../../utils/constants";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

interface LoadingAction {
  type: string;
  payload: boolean;
}

export const loadingReducer = (state = initialState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    // Instead of making two things for loading false and true we manage it in one way directly by passing action.payload to it.
    case LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
