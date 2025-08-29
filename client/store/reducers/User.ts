import {
  ICP_SCORE_SUCCESS,
  LOG_OUT,
  REQUEST_LOGIN_SUCCESS,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_OTP_SUCCESS,
  SET_TOKEN_UID,
  NEW_USER_SIGNUP_DETAIL,
  PROSPECT_DETAILS_SUCCESS,
  USER_SUBSCRIPTION_DATA_SUCCESS,
  GEOLOCATION_SUCCESS,
  INTENT_RANGE_SUCCESS
} from "../../utils/constants";

interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  userInfo?: any;
}

interface UserAction {
  type: string;
  payload?: any;
  data?: any;
}

const initialState: UserState = {
  token: null,
  isLoggedIn: false,
};

export const userLoginReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
      };

    case LOG_OUT:
      return {
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const verifyEmailReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case USER_EMAIL_SUCCESS:
      return { ...state, regEmailInfo: action.payload };
    default:
      return state;
  }
};

export const icpScore = (state = {}, action: UserAction) => {
  switch (action.type) {
    case ICP_SCORE_SUCCESS:
      return { ...state, icpScore: action.payload };
    default:
      return state;
  }
};

export const verifyEmailOtpReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case USER_EMAIL_OTP_SUCCESS:
      return { ...state, emailOtp: action.payload };
    default:
      return state;
  }
};

export const storeTokenAndUid = (state = {}, action: UserAction) => {
  switch (action.type) {
    case SET_TOKEN_UID:
      return { ...state, token: action.data?.token, uid: action.data?.uid };
    default:
      return state;
  }
};

export const newUserSignUpDetailsReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case NEW_USER_SIGNUP_DETAIL:
      return { ...state, newUserDetails: action.payload };
    default:
      return state;
  }
};

export const prospectDetailsReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case PROSPECT_DETAILS_SUCCESS:
      return { ...state, prospectDetails: action.payload };
    default:
      return state;
  }
};

export const userSubscriptionDataReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case USER_SUBSCRIPTION_DATA_SUCCESS:
      return { ...state, userSubscriptionData: action.payload };

    default:
      return state;
  }
};

export const geoLocationReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      return { ...state, geolocation: action.payload };
    default:
      return state;
  }
};

export const IntentRanges = (state = {}, action: UserAction) => {
  switch (action.type) {
    case INTENT_RANGE_SUCCESS:
      return { ...state, intentRange: action.payload };
    default:
      return state;
  }
};
