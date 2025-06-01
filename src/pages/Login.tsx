import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/auth.store";
import { message } from "antd";
import { BaseInput } from "../components/shared/BaseInput";
import { BaseButton } from "../components/shared/BaseButton";
import { VALIDATION_RULES } from "@/constants/shared.const";
import { TValidationRule } from "@/models/types/shared.type";
import { createNewAccessCode, validateAccessCode } from "@/api/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateInput = (value: string, rule: TValidationRule): boolean => {
    if (value.length !== rule.length) {
      setError(rule.errorMessage);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      setter(value);
    };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsLoading(true);
    setError("");

    if (!validateInput(phoneNumber, VALIDATION_RULES.phone)) return;

    try {
      await createNewAccessCode(phoneNumber);
      setIsCodeSent(true);
      message.success("Access code has been sent to your phone number");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to send access code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !accessCode) return;

    setIsLoading(true);
    setError("");

    if (!validateInput(accessCode, VALIDATION_RULES.code)) return;

    try {
      const response = await validateAccessCode(phoneNumber, accessCode);
      if (response.success) {
        login(phoneNumber);
        localStorage.setItem("phoneNumber", phoneNumber);
        message.success("Login successful");
        navigate("/app");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to verify access code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (isPhoneInput: boolean) => {
    const config = isPhoneInput
      ? {
          label: "Phone Number",
          value: phoneNumber,
          onChange: handleInputChange(setPhoneNumber),
          maxLength: VALIDATION_RULES.phone.length,
          placeholder: "Enter your phone number",
        }
      : {
          label: "Access Code",
          value: accessCode,
          onChange: handleInputChange(setAccessCode),
          maxLength: VALIDATION_RULES.code.length,
          placeholder: "Enter 6-digit access code",
        };

    return (
    <>
      <BaseInput
        {...config}
        disabled={isLoading}
        errorMessage={error}
        required
      />
      {!isCodeSent && (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">
            Enter the 6-digit access code sent to your phone number via sms
          </span>
        </div>
      )}
    </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}
        >
          <div className="flex flex-col gap-4">
            {renderInput(!isCodeSent)}
          </div>
          <div className="mt-4">
            <BaseButton
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              {isCodeSent ? "Verify Code" : "Send Code"}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
