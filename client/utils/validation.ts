import * as Yup from "yup";

export const registerValidation = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  designation: Yup.string().required("Designation is required"),
  company: Yup.string().required("Company name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    ),
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginValidation = Yup.object({
  username: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgetPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const otpValidation = Yup.object().shape({
  otp: Yup.number().required("Required").integer("Must be a single digit"),
});

const blockedDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "yandex.com",
];

export const emailRegistrarionValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^(?!.*\.com\.com$)(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .test(
      "restricted-domain",
      "Personal email domains are not allowed. Use your business email.",
      (value) => {
        if (!value) return true;
        const domain = value.split("@")[1]?.toLowerCase();
        return !blockedDomains.includes(domain);
      }
    )
});

export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    ),
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const BuildYourIcpValidation = Yup.object({
  product_sub_category_name: Yup.string().required(
    "Product subcategory name is required"
  ),
  location: Yup.array().min(1, "Geolocation is required")
});

export const changePasswordValidation = Yup.object({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string()
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const ABM_Validation = Yup.object({
  product_sub_category_name: Yup.string().required(
    "Subcategory name is required"
  ),
  uploadAbmFile: Yup.string().required("ABM File is required ."),
});

export const LAL_Validation = Yup.object({
  product_sub_category_name: Yup.string().required(
    "Subcategory name is required"
  ),
  uploadLALFile: Yup.string().required("LAL File is required"),
});

export const findProspectValidation = Yup.object({
  job_function: Yup.array().min(1, "Job function is required"),
  job_level: Yup.array().min(1, "Job level is required"),
  location: Yup.array().min(1, "Geolocation  is required"),
  campaign_name: Yup.string().required("Campaign name  is required"),
});
