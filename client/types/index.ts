export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  designation?: string;
  is_active: boolean;
  token?: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data?: User;
}

export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export interface RootState {
  user: {
    isLoggedIn: boolean;
    userInfo?: User;
    token?: string;
  };
  loading: {
    isLoading: boolean;
  };
  verifyEmail: {
    regEmailInfo?: any;
  };
  icpScoreResult: {
    icpScore?: any;
  };
  verifyEmailOtp: {
    emailOtp?: any;
  };
  uidAndToken: {
    token?: string;
    uid?: string;
  };
  newUserDetails: {
    newUserDetails?: any;
  };
  prospectDetails: {
    prospectDetails?: any;
  };
  userSubscriptionData: {
    userSubscriptionData?: any;
  };
  geoLocation: {
    geolocation?: any;
  };
  IntentRanges: {
    intentRange?: any;
  };
}
