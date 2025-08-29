import axios from "axios";
import { toast } from "react-toastify";

import {
  REGISTER_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  USER_DETAILS_URL,
  USER_DETAILS_UPDATE_URL,
  VERIFY_EMAIL,
  VERIFY_EMAIL_OTP,
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCTS_SUB_CATEGORY,
  GET_FILTERED_DATA,
  GET_ICP_SCORE_RESULT,
  PASSWORD_RESET_OTP_SENDER,
  FORGOT_PASSWORD_VERIFY_OTP,
  GET_ICP_SPLIT,
  CHANGE_PASSWORD_URL,
  VERIFY_PHONE_OTP,
  RESEND_OTP_EMAIL,
  RESEND_OTP_PHONE,
  GET_ABM_SCORE_RESULT,
  MY_DOWNLOAD_LIST,
  GET_PROSPECT_DROPDOWN,
  FIND_PROSPECT_DETAILS,
  GET_MY_DOWNLOAD_LIST,
  GET_LAL_LIST_RESULT,
  GET_PROSPECT_DOWNLOAD_LIST,
  GET_SUBSCRIPTION_PLANS_DETAILS,
  SUBSCRIBE,
  UPDATE_PROFILE_PIC,
  SUBSCRIPTION_PLAN_DETAILS_OF_USER,
  DOWNLOAD_CREDIT_CHECK,
  DASHBOARD_DETAILS_FILTER_WISE,
  GET_DASHBORAD_DETAILS_WITH_NO_FILTER,
  GET_SPENDING_HISTORY_DETAILS,
  GET_TICKET_CATEGORY,
  GET_TICKET_SUB_CATEGORY,
  CREATE_TICKET,
  GET_SUPPORT_TICKET_LIST,
  ADD_COMMENTS,
  GET_TICKIT_COMMENTS,
  LINKDIN_LOGIN,
  GET_USER_STATUS,
  UPDATE_EMAIL_VALIDATE_OTP,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER_VALIDATE_OTP,
  PROSPECT_DOWNLOAD_CREDIT_CHECK,
  REMOVE_PROFILE_PHOTO,
  DELETE_TICKETS,
  BUNDLE_PLAN,
  CHECK_DOMAIN_NAMES,
  GET_PROFILE_DOWNLOADS,
  GET_PIE_PROFILE_DOWNLOADS,
  GET_TICKET_GRAPH_DATA,
  ADD_STANDARD_USER_DATA,
  ALL_STANDARD_USERS,
  STANDARD_USER_DETAILS_UPDATE_URL,
  DELETE_STANDARD_USER,
  BLOCK_STANDARD_USER,
  STANDARD_USER_DETAILS_URL,
  GET_ALL_TOPICS,
  GET_TOPICS_WITH_URL,
  UPDATE_TICKET_IMAGE,
  GET_TICKET_BY_ID,
  GET_ALL_COUNTRY,
  GET_PROSPECT_JOB_TITLE,
  GETALLRECENTSEARCHES,
  GET_FILE_DOWNLOAD,
  GET_NOTICE_LIST,
  getNotifications,
  getCampaign,
  GET_CAMPAIGN_GRAPH_TABLE_DATA,
  Accept_campaign_URL,
  Delete_campaign_URL,
  GtwoURL,
  GET_FAQ,
  GET_IntentRange,
  GET_USER_CAMPAIGN_TRACK,
  SEND_CONTACT_US_EMAIL,
  SUBSCRIPTION_REQUEST
} from "../../api/api";

import {
  REQUEST_LOGIN_SUCCESS,
  USER_EMAIL_SUCCESS,
  LOADER,
  ICP_SCORE_SUCCESS,
  USER_EMAIL_OTP_SUCCESS,
  SET_TOKEN_UID,
  NEW_USER_SIGNUP_DETAIL,
  PROSPECT_DETAILS_SUCCESS,
  USER_SUBSCRIPTION_DATA_SUCCESS,
  GEOLOCATION_SUCCESS,
  INTENT_RANGE_SUCCESS,
} from "../../utils/constants";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export type AppDispatch = (action: any) => void;

//User Login Action
export const user_signin = (data1: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(LOGIN_URL, data1, config);

    if (response.data.status === 200) {
      if (response.data.data?.is_active) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });

        callback(response.data);
        toast.success(response.data.message);
      } else {
        dispatch({ type: LOADER, payload: false });
        toast.error(
          "Account is not active contact Admin or Incomplete Email and Phone Verification "
        );
      }
    } else if (response.data.status === 401) {
      dispatch({ type: LOADER, payload: false });
      toast.info(response.data.message);
    } else if (response.data.status === 429) {
      dispatch({ type: LOADER, payload: false });
      toast.error("Too many failed login attempts. Try again after 10 minutes.");
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something Went Wrong");
    }
  }
};

//set Business Email Action
export const set_business_email = (data3: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_EMAIL, data3, config);

    if (response.data.status === 200) {
      dispatch({ type: USER_EMAIL_SUCCESS, payload: data3 });
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });

    if (error?.response?.data?.status === 400) {
      toast.error(error.response.data.message || "Invalid email format");
      callback(error.response.data);
    } else {
      toast.error("Something Went Wrong");
    }
  }
};

// User Registration Action
export const user_signup = (data2: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(REGISTER_URL, data2, config);

    if (response.data.status === 200) {
      data2.password = undefined;
      data2.re_password = undefined;
      dispatch({
        type: NEW_USER_SIGNUP_DETAIL,
        payload: { ...data2, user_id: response.data.data.user_id },
      });
      dispatch({ type: LOADER, payload: false });

      toast.success(response.data.message);
      callback(response.data.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something Went Wrong");
    }
  }
};

//Logout Action
export const handleLogout = () => async (dispatch: AppDispatch) => {
  dispatch({ type: "LOG_OUT", data: false });
};

//get user details
export const getUserDetails = (payload: any, token: string, callback: (data: any) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${USER_DETAILS_URL}/${payload.userId}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

//Email otp Verification
export const email_otp_verification = (data4: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_EMAIL_OTP, data4, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something went wrong");
    }
  }
};

//Phone OTP Verification
export const phone_otp_verification = (data4: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_PHONE_OTP, data4, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something went wrong");
    }
  }
};

//forgot password otp sender
export const password_reset_otp_sender =
  (data4: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const response = await axios.post(
        PASSWORD_RESET_OTP_SENDER,
        data4,
        config
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        dispatch({ type: USER_EMAIL_OTP_SUCCESS, payload: data4 });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        toast.error(response.data.message);
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error: any) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast.error("Something went wrong");
      }
    }
  };

//forgot password otp verify
export const forgot_password_otp_verify =
  (data4: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const response = await axios.post(
        FORGOT_PASSWORD_VERIFY_OTP,
        data4,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error: any) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast.error("Something went wrong");
      }
    }
  };

//actual reset password is here
export const reset_password = (data: any, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  let apipayload = {
    password: data.password,
  };
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.patch(
      `${RESET_PASSWORD_URL}/${data.uid}/${data.token}/`,
      apipayload,
      config
    );
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something went wrong");
    }
  }
};

//normally storing the token and uid for sending it to the reset password
export const tokenAndUid = (data: any) => {
  return {
    type: SET_TOKEN_UID,
    data: data,
  };
};

//change password
export const change_password = (data: any, token: string, callback: (data: any) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${CHANGE_PASSWORD_URL}/`, data, config);
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error: any) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast.error("Something went wrong");
    }
  }
};
