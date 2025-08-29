import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Brain,
  Cpu,
  Sparkles,
  Network,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Play,
} from "lucide-react";
import { user_signin } from "../store/actions/userActions";
import { loginValidation } from "../utils/validation";
import { RootState } from "../types";

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.user);
  const { isLoading } = useSelector((state: RootState) => state.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidation),
  });

  useEffect(() => {
    setMounted(true);
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (show2FA && resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0) {
      setCanResendOTP(true);
    }
  }, [show2FA, resendCountdown]);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      dispatch(user_signin(data, (response: any) => {
        if (response.status === 200) {
          navigate("/");
        } else if (response.status === 401) {
          // Handle unauthorized
        }
      }));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) return;

    setIsVerifying(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("2FA verification:", { otpValue });
    setIsVerifying(false);

    // Here you would redirect to dashboard
    // For demo, we'll just reset
    setShow2FA(false);
    setOtpValue("");
  };

  const handleResendOTP = async () => {
    setCanResendOTP(false);
    setResendCountdown(30);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Resending OTP");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleMagicLink = () => {
    const { username } = getValues();
    console.log("Send magic link to:", username);
  };

  // AI/ML themed floating elements
  const aiElements = [
    {
      top: "10%",
      left: "15%",
      delay: "0s",
      size: "w-3 h-3",
      color: "bg-valasys-orange/30",
    },
    {
      top: "25%",
      right: "20%",
      delay: "1s",
      size: "w-2 h-2",
      color: "bg-valasys-blue/40",
    },
    {
      top: "40%",
      left: "8%",
      delay: "2s",
      size: "w-4 h-4",
      color: "bg-valasys-green/25",
    },
    {
      top: "60%",
      right: "12%",
      delay: "3s",
      size: "w-2.5 h-2.5",
      color: "bg-valasys-orange/35",
    },
    {
      top: "75%",
      left: "25%",
      delay: "4s",
      size: "w-3.5 h-3.5",
      color: "bg-valasys-blue/30",
    },
    {
      top: "85%",
      right: "35%",
      delay: "0.5s",
      size: "w-2 h-2",
      color: "bg-valasys-green/40",
    },
  ];

  // Integration partners data
  const integrations = [
    {
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      description: "CRM Integration",
      color: "bg-blue-500",
    },
    {
      name: "HubSpot",
      logo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png",
      description: "Marketing Automation",
      color: "bg-orange-500",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_logo.svg",
      description: "Office 365 Suite",
      color: "bg-blue-600",
    },
    {
      name: "Pipedrive",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Pipedrive_logo.svg",
      description: "Sales Pipeline",
      color: "bg-green-500",
    },
    {
      name: "Zoom",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
      description: "Video Conferencing",
      color: "bg-blue-400",
    },
    {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      description: "Team Communication",
      color: "bg-purple-500",
    },
  ];

  if (show2FA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background AI Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {aiElements.map((element, index) => (
            <div
              key={index}
              className={`absolute ${element.size} ${element.color} rounded-full animate-pulse`}
              style={{
                top: element.top,
                left: element.left,
                right: element.right,
                animationDelay: element.delay,
              }}
            />
          ))}
        </div>

        {/* 2FA Card */}
        <Card className="w-full max-w-md border-valasys-gray-200 shadow-xl bg-white/95 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-valasys-orange rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VAIS</span>
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-valasys-gray-900">
                Two-Factor Authentication
              </CardTitle>
              <p className="text-valasys-gray-600 text-sm mt-2">
                Enter the 6-digit verification code sent to your device
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-valasys-gray-700">
                  Verification Code
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    className="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                      <InputOTPSlot
                        index={3}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isVerifying || otpValue.length !== 6}
                className="w-full bg-valasys-orange hover:bg-valasys-orange-light text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102"
              >
                {isVerifying ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify Code
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={!canResendOTP}
                className={`text-sm font-medium transition-colors ${
                  canResendOTP
                    ? "text-valasys-orange hover:text-valasys-orange-light"
                    : "text-valasys-gray-400 cursor-not-allowed"
                }`}
              >
                {canResendOTP ? (
                  <div className="flex items-center justify-center space-x-1">
                    <RefreshCw className="h-3 w-3" />
                    <span>Resend code</span>
                  </div>
                ) : (
                  `Resend code in ${resendCountdown}s`
                )}
              </button>
            </div>

            <button
              onClick={() => setShow2FA(false)}
              className="w-full text-sm text-valasys-gray-600 hover:text-valasys-gray-800 transition-colors"
            >
              ← Back to login
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valasys-gray-50 via-white to-valasys-orange/5 lg:grid lg:grid-cols-2 relative overflow-hidden">
      {/* Background AI/Neural Network Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {aiElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.size} ${element.color} rounded-full animate-pulse`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              animationDelay: element.delay,
            }}
          />
        ))}

        {/* Neural Network Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="neural-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#1A73E8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00C48C" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M50,200 Q200,100 350,200 T650,200"
            stroke="url(#neural-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M100,300 Q300,200 500,300 T800,300"
            stroke="url(#neural-gradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M0,400 Q200,300 400,400 T700,400"
            stroke="url(#neural-gradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center p-8 relative z-10">
        <div
          className={`w-full max-w-md space-y-6 transform transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          {/* Login Card */}
          <Card className="border-valasys-gray-200 shadow-xl hover:shadow-2xl transition-all duration-400 backdrop-blur-sm bg-white/95">
            <CardHeader className="space-y-1 pb-4 text-center">
              {/* VAIS Logo Badge */}
              <div className="mx-auto w-12 h-12 bg-valasys-orange rounded-xl flex items-center justify-center shadow-lg mb-4">
                <span className="text-white font-bold text-sm">VAIS</span>
              </div>
              <CardTitle className="text-lg font-semibold text-valasys-gray-900">
                Sign in
              </CardTitle>
              <p className="text-sm text-valasys-gray-600">
                to your Valasys AI Score account
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-valasys-gray-700 flex items-center space-x-1"
                  >
                    <Mail className="h-3 w-3" />
                    <span>Email Address</span>
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-200 ${focusedField === "username" ? "text-valasys-orange" : "text-valasys-gray-400"}`}
                    />
                    <Input
                      id="username"
                      type="email"
                      placeholder="you@company.com"
                      {...register("username")}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20 transition-all duration-200 ${errors.username ? "border-red-500" : ""}`}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-valasys-gray-700 flex items-center space-x-1"
                  >
                    <Lock className="h-3 w-3" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-200 ${focusedField === "password" ? "text-valasys-orange" : "text-valasys-gray-400"}`}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 pr-10 border-valasys-gray-300 focus:border-valasys-orange focus:ring-valasys-orange/20 transition-all duration-200 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-valasys-gray-400 hover:text-valasys-orange transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="border-valasys-gray-300 hover:border-valasys-orange transition-colors duration-200"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-valasys-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-valasys-orange hover:text-valasys-orange-light font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Google reCAPTCHA Placeholder */}
                <div className="bg-valasys-gray-50 border border-valasys-gray-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-valasys-gray-600">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">reCAPTCHA verification</span>
                  </div>
                  <p className="text-xs text-valasys-gray-500 mt-1">
                    Protected by Google reCAPTCHA
                  </p>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-valasys-orange hover:bg-valasys-orange-light text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-valasys-gray-500">
                    or
                  </span>
                </div>
              </div>

              {/* Social Authentication Options */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Microsoft")}
                    className="border-valasys-gray-300 hover:bg-valasys-gray-50 transition-all duration-200"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_logo.svg"
                      alt="Microsoft"
                      className="w-4 h-4 mr-2"
                    />
                    Microsoft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="border-valasys-gray-300 hover:bg-valasys-gray-50 transition-all duration-200"
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      className="w-4 h-4 mr-2"
                    />
                    Google
                  </Button>
                </div>

                {/* Magic Link Button */}
                <Button
                  variant="outline"
                  onClick={handleMagicLink}
                  disabled={!getValues("username")}
                  className="w-full border-valasys-gray-300 hover:bg-valasys-gray-50 transition-all duration-200"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Send me a magic link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <p className="text-sm text-valasys-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-valasys-orange hover:text-valasys-orange-light transition-colors"
              >
                Request access
              </a>
            </p>

            {/* Privacy, Terms, Security Links */}
            <div className="flex items-center justify-center space-x-4 text-xs text-valasys-gray-500">
              <a
                href="#"
                className="hover:text-valasys-gray-700 transition-colors"
              >
                Privacy
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-valasys-gray-700 transition-colors"
              >
                Terms
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-valasys-gray-700 transition-colors"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Video & Integrations */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-valasys-orange/10 via-valasys-blue/10 to-valasys-green/10 backdrop-blur-sm">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-valasys-orange/15 via-valasys-orange-light/10 to-valasys-blue/15"></div>

        <div className="relative z-10 flex flex-col justify-center space-y-8 p-8 w-full">
          {/* Video Section */}
          <div
            className={`space-y-4 transform transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-valasys-gray-900 flex items-center justify-center space-x-2">
                <Play className="h-6 w-6 text-valasys-orange" />
                <span>See VAIS in Action</span>
              </h2>
              <p className="text-valasys-gray-600">
                Watch how AI transforms your sales process
              </p>
            </div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm border border-white/20">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-64 object-cover"
                poster="/placeholder.svg"
              >
                <source
                  src="https://cdn.builder.io/o/assets%2F30afb9e14ebd49aea9f5ae01cdf07930%2F8104f428ea2041e4b1e7817c489b1720?alt=media&token=183f0972-b931-4c24-bb07-a6086bd27c3a&apiKey=30afb9e14ebd49aea9f5ae01cdf07930"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Integrations Section */}
          <div
            className={`space-y-4 transform transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-valasys-gray-900 flex items-center justify-center space-x-2">
                <Globe
                  className="h-5 w-5 text-valasys-blue animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                <span>Powered by 50+ Integrations</span>
              </h3>
              <p className="text-valasys-gray-600 text-sm">
                Connect seamlessly with your existing tech stack
              </p>
            </div>

            {/* Integration Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300 group cursor-pointer hover:scale-105 transform shadow-lg border border-white/30 ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="h-10 w-10 mx-auto mb-3 bg-white rounded-lg p-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200 shadow-md">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full ${integration.color} rounded flex items-center justify-center text-white text-xs font-bold">${integration.name[0]}</div>`;
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-valasys-gray-900 text-sm group-hover:text-valasys-orange transition-colors duration-200">
                    {integration.name}
                  </h4>
                  <p className="text-xs text-valasys-gray-600 group-hover:text-valasys-gray-800 transition-colors duration-200">
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>

            {/* View All Integrations Link */}
            <div className="text-center pt-2">
              <a
                href="#"
                className="inline-flex items-center space-x-1 text-sm font-medium text-valasys-orange hover:text-valasys-orange-light transition-colors duration-200 group"
              >
                <span>View all integrations</span>
                <ExternalLink className="h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div
            className={`flex items-center justify-center space-x-6 pt-6 border-t border-white/20 transform transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-valasys-green" />
              </div>
              <span className="text-sm font-medium text-valasys-gray-800">
                SOC 2 Compliant
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Shield className="h-4 w-4 text-valasys-blue" />
              </div>
              <span className="text-sm font-medium text-valasys-gray-800">
                GDPR Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
