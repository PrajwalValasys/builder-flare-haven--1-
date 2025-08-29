import { toast } from "react-toastify";
import axios from "axios";

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
  bundleplan,
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
  SUBSCRIPTION_REQUEST,
  CHATBOT_CHAT_URL
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

//User Login Action
export const user_signin = (data1, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(LOGIN_URL, data1, config);

    if (response.data.status === 200) {
      if (response.data.data?.is_active) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });

        callback(response.data);
        toast(response.data.message, { autoClose: 4000 });
      } else {
        dispatch({ type: LOADER, payload: false });
        toast(
          "Account is not active contact Admin or Incomplete Email and Phone Verification ",
          { autoClose: 4000 }
        );
      }
    } else if (response.data.status === 401) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

//set Business Email Action
export const set_business_email = (data3, callback) => async (dispatch) => {
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
  } catch (error) {
    dispatch({ type: LOADER, payload: false });

    if (error?.response?.data?.status === 400) {
      toast(error.response.data.message || "Invalid email format", { autoClose: 4000 });
      callback(error.response.data); // optionally pass it back
    } else {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

// User Registration Action
export const user_signup = (data2, callback) => async (dispatch) => {
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

      toast(response.data.message, { autoClose: 4000 });
      callback(response.data.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });

      toast(response.data.message, { autoClose: 4000 });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

//get user details
export const getUserDetails = (payload, token, callback) => {
  return async (dispatch) => {
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

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//Get Build my campaign Graph and Table Data
export const getCampaignGraphTableData = (paylaod, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, paylaod: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };

      const response = await axios.get(
        `${GET_CAMPAIGN_GRAPH_TABLE_DATA}/${paylaod.id}`, config
      );
      // const response = {
      //   "status": 200,
      //   "data": {
      //     "jab_level": {
      //       "all": {
      //         "C-Level": 1000,
      //         'Vice President': 1450,
      //         'Director': 1800,
      //         'Manager': 1780,
      //         'Staff': 1000
      //       },
      //       "usa": {
      //         "C-Level": 100,
      //         'Vice President': 45,
      //         'Director': 80,
      //         'Manager': 70,
      //         'Staff': 100
      //       },
      //       "APEC" : {
      //         "C-Level": 900,
      //         'Vice President': 650,
      //         'Director': 200,
      //         'Manager': 400,
      //         'Staff': 950
      //       },
      //       "North America" : {
      //         "C-Level": 9000,
      //         'Vice President': 6500,
      //         'Director': 2000,
      //         'Manager': 4000,
      //         'Staff': 9500
      //       }
      //     },
      //     "monthly_deliverables": {
      //       "usa": {
      //           "CS": 0,
      //           "MQL": 0,
      //           "HQL": 0,
      //           "BANT": 0,
      //           "Webinar": 0
      //       },
      //       "APEC": {
      //           "CS": 0,
      //           "MQL": 0,
      //           "HQL": 0,
      //           "BANT": 0,
      //           "Webinar": 0
      //       }
      //     },
      //     "quarterly_deliverables": {
      //       "Geolocation 1": {
      //           "CS": 0,
      //           "MQL": 0,
      //           "HQL": 0,
      //           "BANT": 0,
      //           "Webinar": 0
      //       },
      //       "Geolocation 2": {
      //           "CS": 0,
      //           "MQL": 0,
      //           "HQL": 0,
      //           "BANT": 0,
      //           "Webinar": 0
      //       }
      //     }, 
      //   }
      // }


      if (response.status === 200) {

        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
      }

    } catch (error) {

    }
  }
}

// update user details
export const updateUserDetails = (updatedData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${USER_DETAILS_UPDATE_URL}`,
        updatedData.getUserData,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
        // Redirect or perform additional logout logic if needed
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//Email otp Verification
export const email_otp_verification = (data4, callback) => async (dispatch) => {
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
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something went wrong", { autoClose: 4000 });
    }
  }
};

//Phone OTP Verification
export const phone_otp_verification = (data4, callback) => async (dispatch) => {
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
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something went wrong", { autoClose: 4000 });
    }
  }
};

//forgot password otp sender
export const password_reset_otp_sender =
  (data4, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const response = await axios.post(
        PASSWORD_RESET_OTP_SENDER,
        data4,
        config
      );

      if (response.data.status === 200) {
        toast(response.data.message, { autoClose: 4000 });
        dispatch({ type: USER_EMAIL_OTP_SUCCESS, payload: data4 });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        toast(response.data.message, { autoClose: 4000 });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast("Something went wrong", { autoClose: 4000 });
      }
    }
  };

//forgot password otp verify
export const forgot_password_otp_verify =
  (data4, callback) => async (dispatch) => {
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
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast("Something went wrong", { autoClose: 4000 });
      }
    }
  };

//actual rest passwor is here

export const reset_password = (data, callback) => async (dispatch) => {
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
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something went wrong", { autoClose: 4000 });
    }
  }
};

//normally storing the token and uid for sending it to the reset password
export const tokenAndUid = (data) => {
  return {
    type: SET_TOKEN_UID,
    data: data,
  };
};

// //Logout Action
// export const handleLogout = (dispatch, navigate) => {
//   dispatch({ type: "LOG_OUT", data: false });
//   navigate("/");
// };
//Logout Action
export const handleLogout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT", data: false });
};
// get all products  sub category
export const getProductSubCategory = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(GET_PRODUCTS_SUB_CATEGORY, config);
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//get product category
export const getProductsCategory = (productSubCategory, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_PRODUCTS_CATEGORY}/${productSubCategory}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//to get remaning filterd data like product name,selling prize.
export const getRemainingFilterdData = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(GET_FILTERED_DATA, data, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//  icp score
export const getIcpScore =
  (icpscoredata, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        GET_ICP_SCORE_RESULT,
        icpscoredata,
        config
      );

      if (response.data.status === 200) {
        if (
          icpscoredata.page === 1 &&
          icpscoredata.search_query === undefined
        ) {
          dispatch({ type: ICP_SCORE_SUCCESS, payload: response.data });
        }
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
      }
      callback(response.data);
    } catch (error) {
      callback(error);
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

export const SearchLeftMinus =
  (icpscoredata, token, callback) => async (dispatch) => {
    try {
      // dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        GET_ICP_SCORE_RESULT,
        icpscoredata,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: ICP_SCORE_SUCCESS, payload: response.data });
        // dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        // dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        // dispatch({ type: LOADER, payload: false });
      }
      callback(response.data);
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
// get icp split(not in use)
export const getIcpSplit = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const response = await axios.get(`${GET_ICP_SPLIT}`, data);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast("Something Went wrong");
      }
    }
  };
};

//change password
export const change_password = (data, token, callback) => async (dispatch) => {
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
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something went wrong", { autoClose: 4000 });
    }
  }
};
//resendOTPEmail
export const resendOTPEmail = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    const response = await axios.post(RESEND_OTP_EMAIL, payload, config);
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
      callback(response.data.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};
//resendOTPPhone
export const resendOTPPhone = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    const response = await axios.post(RESEND_OTP_PHONE, payload, config);
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
      callback(response.data.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};
//ABM Score
export const getAbmScore =
  (abmscoredata, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        GET_ABM_SCORE_RESULT,
        abmscoredata,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: ICP_SCORE_SUCCESS, payload: response.data });
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
      }
      callback(response.data);
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//My download list
export const mydownloadlist =
  (payload, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: false });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(MY_DOWNLOAD_LIST, payload, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        // toast(, { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//get My downloaded list data on list page like result page
export const getMyDownloadListData = (id, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(GET_MY_DOWNLOAD_LIST, id, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//get prospectdetails
export const getPeospectDetails = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(GET_PROSPECT_DROPDOWN, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//get find prospect details

export const findProspectDetails =
  (prospect, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        FIND_PROSPECT_DETAILS,
        prospect,
        config
      );

      if (response.data.status === 200) {

        dispatch({
          type: PROSPECT_DETAILS_SUCCESS,
          payload: response.data
        });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//get LAL list result
export const getLAlListResult =
  (lallistdata, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        GET_LAL_LIST_RESULT,
        lallistdata,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: ICP_SCORE_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
      }
      callback(response.data);
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//download prospect list
export const downloadProspectList =
  (payload, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        GET_PROSPECT_DOWNLOAD_LIST,
        payload,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//get subscription plan details
export const getsubscriptionDetails = (params,token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(GET_SUBSCRIPTION_PLANS_DETAILS, {
        ...config,
        params:params
      });

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//subscribe the plan with payment
export const subscribeplan = (payload, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(SUBSCRIBE, payload, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error.response && error.response.status === 401) {
      // toast("Your account is not active please contact Admin!", {
      //   autoClose: 3000,
      // });
      dispatch(handleLogout());
    }
    //else{
    //   toast("Something went wrong!", {autoClose:1000})

    // }
  }
};
//update user profile image

export const updateUserProfileImage = (formData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Change content type to multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${UPDATE_PROFILE_PIC}`,
        formData,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//get user subscription plan details
export const getUserSubscriptionPlanDetails = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${SUBSCRIPTION_PLAN_DETAILS_OF_USER}`,
        { user_id: data.user_id },
        config
      );

      if (response.data.status === 200) {
        dispatch({
          type: USER_SUBSCRIPTION_DATA_SUCCESS,
          payload: response.data,
        });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({
          type: USER_SUBSCRIPTION_DATA_SUCCESS,
          payload: response.data,
        });

        dispatch({ type: LOADER, payload: false });

        // toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        toast("Session Expired.", {
          autoClose: 3000,
        });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//check download credits to download the data
export const checkDownloadCredits =
  (data, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(DOWNLOAD_CREDIT_CHECK, data, config);
      
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
        callback(response);
      }
      else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
        callback(response);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

//subscribe the plan with payment(not in use)
export const bundelePlan = (payload, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(BUNDLE_PLAN, payload, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      toast("No Data Found");
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong");
    }
  }
};

//dashboard details when select fiter Ex. days
export const dashboardDetailsWithFilter =
  (dasboradData, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        DASHBOARD_DETAILS_FILTER_WISE,
        dasboradData,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        toast("No Data Found", { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

// details to show without filter selection
export const dashboardDetailsWithNoFilter = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_DASHBORAD_DETAILS_WITH_NO_FILTER}?user_id=${payload.user_id}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//spending history details
export const spendingHistory = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_SPENDING_HISTORY_DETAILS}/?user_id=${payload.user_id}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//Get Ticket Category
export const getTicketCategory = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${GET_TICKET_CATEGORY}`, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//get ticket subcategory
export const getTicketSubCategory = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_TICKET_SUB_CATEGORY}/${payload.selectedCategoryName}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

// //create tickit
export const createTicket = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Change content type to multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${CREATE_TICKET}`, data, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

// get list of support tickets
export const getListOfSupportTickits = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_SUPPORT_TICKET_LIST}/?user_id=${payload.user_id}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//add comments
export const addComments = (payload, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(ADD_COMMENTS, payload, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
      // toast(response?.data?.message, { autoClose: 4000 });
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      toast("No Data Found", { autoClose: 4000 });
      callback(response.data);
    } else {
      dispatch({ type: LOADER, payload: false });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error.response && error.response.status === 401) {
      // toast("Your account is not active please contact Admin!", {
      //   autoClose: 3000,
      // });
      dispatch(handleLogout());
    }
    //else{
    //   toast("Something went wrong!", {autoClose:1000})

    // }
  }
};
// get all comments
export const getAllComments =
  (payload, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_TICKIT_COMMENTS}?ticket_no=${payload.ticket_no}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
        // toast(response?.data?.message, { autoClose: 4000 });
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        toast("No Data Found", { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
// login with linkdin
export const linkdin = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      LINKDIN_LOGIN,
      {
        code: data,
      },
      config
    );

    if (response.data.status === 200) {
      if (response.data.data?.is_active) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });

        callback(response.data);
        toast(response.data.message, { autoClose: 4000 });
      } else {
        dispatch({ type: LOADER, payload: false });
        toast(
          "Account is not active contact Admin or Incomplete Email and Phone Verification ",
          { autoClose: 4000 }
        );
      }
    } else if (response.data.status === 401) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

// update user email
export const updateUserEmail = (updatedEmailData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${UPDATE_USER_EMAIL}`,
        updatedEmailData,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
        // Redirect or perform additional logout logic if needed
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//Email otp Verification
export const update_email_otp_verification =
  (data4, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        UPDATE_EMAIL_VALIDATE_OTP,
        data4,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });

        dispatch({ type: LOADER, payload: false });

        callback(response.data);
      } else if (response.data.status === 400) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast("Something went wrong");
      }
    }
  };

//update user phone number

export const updateUserPhoneNumber = (
  updatedPhoneNumberData,
  token,
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${UPDATE_USER_PHONE_NUMBER}`,
        updatedPhoneNumberData,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
        // Redirect or perform additional logout logic if needed
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//update Phone OTP Verification
export const update_phone_otp_verification =
  (data4, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        UPDATE_PHONE_NUMBER_VALIDATE_OTP,
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
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error) {
        toast("Something went wrong", { autoClose: 4000 });
      }
    }
  };

//check prospect download credits to download the data
export const checkProspectDownloadCredits =
  (data, token, callback) => async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        PROSPECT_DOWNLOAD_CREDIT_CHECK,
        data,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
        callback(response);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };

// Remove profile photo
export const removeProfilePhoto = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${REMOVE_PROFILE_PHOTO}/${payload.user}`,

        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });

        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

// Remove profile photo
export const deleteTicketsFromList = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          ticket_nos: data,
        },
      };

      const response = await axios.delete(`${DELETE_TICKETS}`, config);
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        // toast("Your account is not active please contact Admin!", {
        //   autoClose: 3000,
        // });
        dispatch(handleLogout());
      }
      //else{
      //   toast("Something went wrong!", {autoClose:1000})

      // }
    }
  };
};

//check prospect download credits to download the data
export const checkDomainNames = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      CHECK_DOMAIN_NAMES,
      { domains: data },
      config
    );

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 404) {
      dispatch({ type: LOADER, payload: false });
      toast(response.data.message, { autoClose: 4000 });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error.response && error.response.status === 401) {
      // toast("Your account is not active please contact Admin!", {
      //   autoClose: 3000,
      // });
      dispatch(handleLogout());
    }
    //else{
    //   toast("Something went wrong!", {autoClose:1000})

    // }
  }
};

// Get profile downloads on basis of type and subtype
export const getProfileDownloads = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_PROFILE_DOWNLOADS}/?user_id=${data.user_id}&type=${data.type}&subType=${data.subType}&day=${data.days}`,

        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
    }
  };
};

export const getPieProfileDownloads = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_PIE_PROFILE_DOWNLOADS}/?user_id=${data.user_id}`,

        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
    }
  };
};

export const getTicketsGraphData = (data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_TICKET_GRAPH_DATA}/?user_id=${data.user_id}`,

        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
    }
  };
};

//User API's

export const addStandardUser = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        ADD_STANDARD_USER_DATA,
        payload,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast("Staff Created Successfully", { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 409) {
        dispatch({ type: LOADER, payload: false });
        toast(response.data.message, { autoClose: 4000 });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getAllStandardUsers = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${ALL_STANDARD_USERS}/${payload.user_id}`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getStandardUserDetails = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${STANDARD_USER_DETAILS_URL}/${payload.user_id}/`,
        config
      );

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

// update user details
export const updateStandardUserDetails = (id, data, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${STANDARD_USER_DETAILS_UPDATE_URL}/${id}/`,
        data,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const deleteStandardUser = (id, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${DELETE_STANDARD_USER}/${id}`,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast("Staff Deleted Successfully", { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const blockStandardUser = (id, token,payload, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.put(`${BLOCK_STANDARD_USER}/${id}/`,payload, config);
      toast(response?.data?.message, { autoClose: 4000 });
      if (response.data.status === 200) {
        // toast(response?.data?.message, { autoClose: 4000 });
        // dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        callback(response.data);
        // toast(response?.data?.message, { autoClose: 4000 });
      }
      dispatch({ type: LOADER, payload: false });
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error?.message, { autoClose: 4000 });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getAllTopics = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${GET_ALL_TOPICS}`, config);
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.result);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getAllTopicsWithUrl = (search, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_TOPICS_WITH_URL}?topic_url=${search}`,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.result);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getGeoLocation = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_ALL_COUNTRY}`,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        dispatch({ type: GEOLOCATION_SUCCESS, payload: response.data.result });
        callback(response.data.result);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const updateTicketImage = (ticket_id, formData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Change content type to multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${UPDATE_TICKET_IMAGE(ticket_id)}`,
        formData,
        config
      );

      if (response.data) {
        dispatch({ type: LOADER, payload: false });
        toast("File Uploaded Successfully", { autoClose: 4000 });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

export const getTicketByID = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${GET_TICKET_BY_ID}/${payload.ticketId}`,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      }
    }
  };
};

//Get Prospect Job title --Rupali
export const getProspectJobTitle = (token, searchTerm, callback) => {
  // console.log("dispatch calling")
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: false });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_PROSPECT_JOB_TITLE}?job_title=${searchTerm}`, config);
      console.log(response.data)
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.result);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });

        toast(response?.data?.message, { autoClose: 4000 });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        console.log(error)
        // dispatch(handleLogout());
      }

    }
  };
};

// Get All recent search 
export const getAllSavedSearches = (paylaod, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${GETALLRECENTSEARCHES}/${paylaod.user_id}`,
        config
      );
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        toast("Something went wrong!", { autoClose: 1000 })
      }
    } finally {
      
      dispatch({ type: LOADER, payload: false });
    }

  };
}
// Get All recent search END
export const getDownloadFile = async (file_id, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_FILE_DOWNLOAD}/${file_id}/`, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        console.log(error)
        // dispatch(handleLogout());
      }

    }
  }
}

export const getNoticBoard = (date, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_NOTICE_LIST}?date=${date}`, config);
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
    }
  }
}

export const GetNotifications = (token, params, callback) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${getNotifications}`, {
        params: params,
        ...config
      });

      if (response.data.status === 200) {
        // dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast("Session Expired.", {
          autoClose: 3000,
        });
        dispatch(handleLogout());
      }
      // dispatch({ type: LOADER, payload: false });
    }
  }
}

export const Read_Notification = (payalod, token, callback) => {
  return async (dispatch) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${getNotifications}`, payalod, config);
      if (response.data.status === 200) {

        callback(response.data);
      } else if (response.data.status === 404) {

      }
    } catch (error) {

    }
  }
}

export const getCampains = (params, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${getCampaign}`, {
        params: params,
        ...config
      });
      if (response.data.status === 200) {
        callback(response.data);
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      console.log("error")
    }
  }
}

export const AddCampains = (payalod, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${getCampaign}`, payalod, config);
      if (response.data.status === 201) {
        callback(response.data);
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
    }
  }
}


export const AcceptCampains = (payalod, id, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${Accept_campaign_URL}/${id}/`, payalod, config);
      if (response.status === 200) {
        callback(response.data);
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error")
    }
  }
}


export const CampainsDelete = (id, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${Delete_campaign_URL}/${id}/`, config);
      if (response.status === 200) {
        callback(response.data);
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error")
    }
  }
}

export const getGtwoURL = (paylaod, token, callback) => {
  console.warn("paylaod", paylaod);

  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GtwoURL}${paylaod}`, { ...config });
      if (response.status === 200) {
        callback(response.data);
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error: ", error)
    }
  }
}

export const getFAQs = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_FAQ}`, { ...config });
      if (response.status === 200) {
        callback(response.data);
        // toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error: ", error)
    }
  }
}


export const getBomboraIntentRange = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_IntentRange}`, { ...config });
      if (response.status === 200) {
        callback(response.data);
        dispatch({ type: INTENT_RANGE_SUCCESS, payload: response?.data?.data });
        // toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error: ", error)
    }
  }
}


export const getDownloadMultipleFile = async (payalod, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${GET_FILE_DOWNLOAD}s/`, payalod, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        console.log(error)
        // dispatch(handleLogout());
      }

    }
  }
}


export const getUserCampaignTrack = (user_id,params,token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${GET_USER_CAMPAIGN_TRACK}/${user_id}`, { ...config,params });
      if (response.status === 200) {
        callback(response.data);
        dispatch({ type: INTENT_RANGE_SUCCESS, payload: response?.data?.data });
        // toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error: ", error)
    }
  }
}


export const ContactUsEmail = (payalod,token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(SEND_CONTACT_US_EMAIL, payalod, config);
      if (response.status === 200) {
        callback(response.data);
        toast(response.data.message, { autoClose: 1000 })
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast(response.data.message, { autoClose: 1000 })
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      toast(error.message, { autoClose: 1000 })
      console.log("error")
    }
  }
}



export const subscriptionRequest = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      const response = await axios.post(
        SUBSCRIPTION_REQUEST,
        payload,
        config
      );

      if (response.data && (response.status === 200 || response.data.status === 200)) {
        // Optionally dispatch a Redux action here if needed
        // dispatch({ type: "SUBSCRIPTION_REQUEST_SUCCESS", payload: response.data });
        if (callback) callback({ status: 200, data: response.data });
      } else {
        // dispatch({ type: "SUBSCRIPTION_REQUEST_FAILURE", payload: response.data });
        if (callback) callback({ status: response.status, data: response.data });
      }
    } catch (error) {
      // dispatch({ type: "SUBSCRIPTION_REQUEST_ERROR", error });
      if (callback) callback({ status: 500, error });
    }
  };
};

// Chatbot: send a message and receive the assistant's reply
export const sendChatMessage = (message, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      CHATBOT_CHAT_URL,
      { message },
      { headers: { "Content-Type": "application/json" } }
    );

    if (callback) callback(response?.data);
  } catch (error) {
    const status = error?.response?.status;

    if (status === 500) {
      // For 500, always return this exact message
      if (callback) callback({ error: true, message: "Something went wrong try again!" });
      return;
    }

    // Fallback for other errors (network, 4xx, or different server payload)
    const msg =
      (error?.response?.data && error?.response?.data?.message) ||
      error?.message ||
      "Request failed";

    if (callback) callback({ error: true, message: msg });
  }
};