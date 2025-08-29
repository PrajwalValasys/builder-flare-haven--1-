import { hostBackURl } from "../config/http";

const BASE_URL = hostBackURl;

export const LOGIN_URL = `${BASE_URL}/login/`;
export const REGISTER_URL = `${BASE_URL}/register`;
export const PASSWORD_RESET_OTP_SENDER = `${BASE_URL}/password-reset-otp-sender/`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password-reset`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}/change_password`;
export const USER_DETAILS_URL = `${BASE_URL}/get_profile`;
export const USER_DETAILS_UPDATE_URL = `${BASE_URL}/update_profile/`;
export const VERIFY_EMAIL = `${BASE_URL}/verify_email/`;
export const VERIFY_EMAIL_OTP = `${BASE_URL}/validate-email-otp/`;
export const VERIFY_PHONE_OTP = `${BASE_URL}/validate-phone-otp/`;
export const GET_PRODUCTS_CATEGORY = `${BASE_URL}/get-products-category`;
export const GET_PRODUCTS_SUB_CATEGORY = `${BASE_URL}/get_product_sub_category/`;
export const GET_FILTERED_DATA = `${BASE_URL}/get-filtered-data/`;
export const GET_ICP_SCORE_RESULT = `${BASE_URL}/icp-score/`;
export const GET_ABM_SCORE_RESULT = `${BASE_URL}/verify_abm/`;
export const GET_LAL_LIST_RESULT = `${BASE_URL}/lal_list/`;
export const FORGOT_PASSWORD_VERIFY_OTP = `${BASE_URL}/password-reset/`;
export const GET_ICP_SPLIT = `${BASE_URL}/icp_split/`;
export const RESEND_OTP_EMAIL = `${BASE_URL}/resend-otp-email/`;
export const RESEND_OTP_PHONE = `${BASE_URL}/resend-otp-phone/`;
export const MY_DOWNLOAD_LIST = `${BASE_URL}/my_download_list/`;
export const GET_PROSPECT_DROPDOWN = `${BASE_URL}/get_prospect_dropdown/`;
export const FIND_PROSPECT_DETAILS = `${BASE_URL}/find_prospect/`;
export const GET_MY_DOWNLOAD_LIST = `${BASE_URL}/get_my_download_list/`;

export const GET_PROSPECT_DOWNLOAD_LIST = `${BASE_URL}/prospect_download_list/`;
export const GET_SUBSCRIPTION_PLANS_DETAILS = `${BASE_URL}/get_plans/`;
export const SUBSCRIBE = `${BASE_URL}/Subscribe/`;
export const UPDATE_PROFILE_PIC = `${BASE_URL}/udpate_profile_pic/`;
export const SUBSCRIPTION_PLAN_DETAILS_OF_USER = `${BASE_URL}/get_user_plan/`;
export const DOWNLOAD_CREDIT_CHECK = `${BASE_URL}/download_credit_check/`;
export const BUNDLE_PLAN = `${BASE_URL}/buy_additional_credit/`;
export const DASHBOARD_DETAILS_FILTER_WISE = `${BASE_URL}/dashboard/`;
export const GET_DASHBORAD_DETAILS_WITH_NO_FILTER = `${BASE_URL}/get_dashboard_stats/`;
export const GET_SPENDING_HISTORY_DETAILS = `${BASE_URL}/get_spending_history`;
export const GET_TICKET_CATEGORY = `${BASE_URL}/get_ticket_category/`;
export const GET_TICKET_SUB_CATEGORY = `${BASE_URL}/get_ticket_sub_category`;
export const CREATE_TICKET = `${BASE_URL}/tickets_create/`;
export const GET_SUPPORT_TICKET_LIST = `${BASE_URL}/get_support_tickets`;
export const ADD_COMMENTS = `${BASE_URL}/add_comments/`;
export const GET_TICKIT_COMMENTS = `${BASE_URL}/get_ticket_comments/`;
export const LINKDIN_LOGIN = `${BASE_URL}/user-accounts/linkedin/`;
export const GET_USER_STATUS = `${BASE_URL}/get_user_status`;
export const UPDATE_USER_EMAIL = `${BASE_URL}/update_email`;
export const UPDATE_EMAIL_VALIDATE_OTP = `${BASE_URL}/update_email_validate_otp`;
export const UPDATE_USER_PHONE_NUMBER = `${BASE_URL}/update_phone_number`;
export const UPDATE_PHONE_NUMBER_VALIDATE_OTP = `${BASE_URL}/update_phone_number_validate_otp`;

export const PROSPECT_DOWNLOAD_CREDIT_CHECK = `${BASE_URL}/prospect_credit_check/`;
export const REMOVE_PROFILE_PHOTO = `${BASE_URL}/profile_delete`;
export const DELETE_TICKETS = `${BASE_URL}/delete_tickets/`;
export const CHECK_DOMAIN_NAMES = `${BASE_URL}/check_domains/`;
export const GET_PROFILE_DOWNLOADS = `${BASE_URL}/get_dashboard_graph`;
export const GET_PIE_PROFILE_DOWNLOADS = `${BASE_URL}/get_dashboard_pai`;
export const GET_TICKET_GRAPH_DATA = `${BASE_URL}/get_ticket_graphdata`;

export const ADD_STANDARD_USER_DATA = `${BASE_URL}/createSub_user`;
export const ALL_STANDARD_USERS = `${BASE_URL}/userstaff`;
export const STANDARD_USER_DETAILS_UPDATE_URL = `${BASE_URL}/get_update_userstaff`;
export const DELETE_STANDARD_USER = `${BASE_URL}/userstaff`;
export const BLOCK_STANDARD_USER = `${BASE_URL}/userstaff`;
export const STANDARD_USER_DETAILS_URL = `${BASE_URL}/get_update_userstaff`;

export const GET_ALL_TOPICS = `${BASE_URL}/topics`;
export const GET_TOPICS_WITH_URL = `${BASE_URL}/get_url_topics`;
export const UPDATE_TICKET_IMAGE = (id: string) =>
  `${BASE_URL}/tickets/${id}/update-image/`;

export const GET_TICKET_BY_ID = `${BASE_URL}/get_ticket_details`;

export const GET_ALL_COUNTRY = `${BASE_URL}/get_all_country`;
export const GET_PROSPECT_JOB_TITLE = `${BASE_URL}/get_job_title_suggestions`;
// Save Searches
export const GETALLRECENTSEARCHES = `${BASE_URL}/vaisfilter`;
// Save Searches END
export const GET_FILE_DOWNLOAD = `${BASE_URL}/download_file`;

export const GET_NOTICE_LIST = `${BASE_URL}/dashbard/notices`;

export const getNotifications = `${BASE_URL}/notification/`;

export const getCampaign = `${BASE_URL}/campaign/`;

export const GET_CAMPAIGN_GRAPH_TABLE_DATA = `${BASE_URL}/get-campaign-graph-table-data`;

export const Accept_campaign_URL = `${BASE_URL}/accept-campaign`;

export const Delete_campaign_URL = `${BASE_URL}/campaigns/soft-delete`;

export const GtwoURL = `${BASE_URL}/g2-url/`;

export const GET_FAQ = `${BASE_URL}/get-faq/`;

export const GET_IntentRange = `${BASE_URL}/api/bombora-intent-ranges/`;

export const GET_USER_CAMPAIGN_TRACK = `${BASE_URL}/user-campaign-tracks`;

export const SEND_CONTACT_US_EMAIL = `${BASE_URL}/contact-us-email/`;

export const SUBSCRIPTION_REQUEST = `${BASE_URL}/subscriptionrequest/`;
