export const LOG_OUT = "LOG_OUT";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";
export const USER_EMAIL_SUCCESS = "USER_EMAIL_SUCCESS";
export const LOADER = "LOADER";
export const USER_EMAIL_OTP_SUCCESS = "USER_EMAIL_OTP_SUCCESS";
export const SET_TOKEN_UID = "SET_TOKEN_UID";
export const NEW_USER_SIGNUP_DETAIL = "NEW_USER_SIGNUP_DETAIL";
export const ICP_SCORE_SUCCESS = "ICP_SCORE_SUCCESS";
export const PROSPECT_DETAILS_SUCCESS = "PROSPECT_DETAILS_SUCCESS";
export const USER_SUBSCRIPTION_DATA_SUCCESS = "USER_SUBSCRIPTION_DATA_SUCCESS";
export const GEOLOCATION_SUCCESS = "GEOLOCATION_SUCCESS";
export const INTENT_RANGE_SUCCESS = "INTENT_RANGE_SUCCESS";

// Site key
export const SITE_KEY = import.meta.env.VITE_SITE_KEY || '6Ld7dygpAAAAACiHzxJ9F5TTdAJl25uxmqHK0IjZ';

export const industryWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const revenueWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const companySizeWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const ITEMS_PER_PAGE = 1000;
export const BASE_URL = "https://sdeiaiml.com:9005";

export const signalRank = (data: any[], name: string) => {
  const found = data.find(item => item.name === name);
  return found ? Number(found.from_value) : 0;
};

export const FirstLetterCapital = (full_name: string) => {
  if (!full_name) return ""; // Return an empty string if input is empty

  return full_name
    .split(" ") // Split the full name into individual words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back together
};

export const getIntentSignal = (ranges: any[], topics: any[], lentopic: number) => {
  const className = {
    Strong: "strong",
    "Very Strong": "very-strong",
    "Super Strong": "super-strong",
  };

  // Case for lentopic = 1
  if (lentopic == 1) {
    if (!topics || topics.length === 0) {
      return { text: "Domain shows no intent", className: "intent-signal custom-td" };
    }

    const compositeScore = topics[0]?.score || 0;

    if (compositeScore >= 60 && compositeScore <= 70) {
      return { text: "Strong", className: `intent-signal ${className["Strong"]} custom-td` };
    } else if (compositeScore >= 71 && compositeScore <= 85) {
      return { text: "Very Strong", className: `intent-signal ${className["Very Strong"]} custom-td` };
    } else if (compositeScore >= 86) {
      return { text: "Super Strong", className: `intent-signal ${className["Super Strong"]} custom-td` };
    }
  }

  // Case for lentopic = 2
  else if (lentopic == 2) {
    if (!topics || topics.length === 0) {
      return { text: "0/2 topics", className: "intent-signal custom-td" };
    }

    const compositeScore = topics[0]?.score || 0;

    if (topics.length === 1 && compositeScore < 75) {
      return { text: "Strong", className: `intent-signal ${className["Strong"]} custom-td` };
    } else if (topics.length === 1 && compositeScore >= 75) {
      return { text: "Very Strong", className: `intent-signal ${className["Very Strong"]} custom-td` };
    } else if (topics.length === 2) {
      return { text: "Super Strong", className: `intent-signal ${className["Super Strong"]} custom-td` };
    }
  }

  // Case for lentopic = 3
  else if (lentopic == 3) {
    const numMatched = Array.isArray(topics) ? topics.length : 0;

    if (numMatched === 0) {
      return { text: "0/3 topics", className: "intent-signal custom-td" };
    } else if (numMatched === 1) {
      return { text: "Strong", className: `intent-signal ${className["Strong"]} custom-td` };
    } else if (numMatched === 2) {
      return { text: "Very Strong", className: `intent-signal ${className["Very Strong"]} custom-td` };
    } else if (numMatched === 3) {
      return { text: "Super Strong", className: `intent-signal ${className["Super Strong"]} custom-td` };
    }
  }

  // Case for lentopic >= 4
  else if (lentopic >= 4) {
    const numMatched = Array.isArray(topics) ? topics.length : 0;

    if (numMatched === 0) {
      return { text: "", className: "intent-signal custom-td" };
    } else if (numMatched === 1) {
      return { text: "Strong", className: `intent-signal ${className["Strong"]} custom-td` };
    } else if (numMatched === 2 || numMatched === 3) {
      return { text: "Very Strong", className: `intent-signal ${className["Very Strong"]} custom-td` };
    } else if (numMatched >= 4) {
      return { text: "Super Strong", className: `intent-signal ${className["Super Strong"]} custom-td` };
    }
  }

  // Default case for unmatched conditions
  return { text: "-", className: "intent-signal custom-td" };
};
