import { useState } from "react";
import OtpInput from "react-otp-input";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your verification logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl p-6 bg-white w-full space-y-8 border-2 border-gray-200 rounded-2xl shadow-md">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center text-base text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 md:text-lg text-gray-600">
            We've sent a verification code to your email address. Please enter
            it below to confirm your account.
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleVerify} className="space-y-6 w-full">
          <div className="flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ width: "4px" }}></span>}
              shouldAutoFocus={true}
              inputStyle={{
                border: "1px solid #b9b9b9",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="text-center text-2xl font-bold border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  type="text"
                  inputMode="numeric"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={otp.length !== 6 || isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-base text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-medium text-base text-blue-600 hover:text-blue-500"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
