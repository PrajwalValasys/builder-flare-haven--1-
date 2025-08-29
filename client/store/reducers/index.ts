import storage from "redux-persist/lib/storage";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { LOG_OUT } from "../../utils/constants";
import { persistReducer } from "redux-persist";
import {
  icpScore,
  userLoginReducer,
  verifyEmailOtpReducer,
  verifyEmailReducer,
  storeTokenAndUid,
  newUserSignUpDetailsReducer,
  prospectDetailsReducer,
  userSubscriptionDataReducer,
  geoLocationReducer,
  IntentRanges
} from "./User";

import { loadingReducer } from "./Loading";

const userPersistConfig = {
  key: "front-end-app",
  storage: storage,
  blacklist: ["router", "loader"],
};

const rootReducer = persistCombineReducers(userPersistConfig, {
  user: userLoginReducer,
  loading: loadingReducer,
  verifyEmail: verifyEmailReducer,
  icpScoreResult: icpScore,
  verifyEmailOtp: verifyEmailOtpReducer,
  uidAndToken: storeTokenAndUid,
  newUserDetails: newUserSignUpDetailsReducer,
  prospectDetails: prospectDetailsReducer,
  userSubscriptionData: userSubscriptionDataReducer,
  geoLocation: geoLocationReducer,
  IntentRanges: IntentRanges
});

const persistConfig = {
  key: "front-end-app",
  storage: storage,
  blacklist: ["loading"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
