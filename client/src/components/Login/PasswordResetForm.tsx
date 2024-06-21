import "../../Styling/Components/LoginComponent/_passwordReset.scss";
import { useRef } from "react";
interface PasswordResetFormProps {
  submitRequestPassword: (query: string) => void;
  setFormSubmited: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  submitRequestPassword,
  setFormSubmited,
}) => {
  const emailREF = useRef<HTMLInputElement>(null);
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequestPassword(emailREF?.current?.value ?? "");
    setFormSubmited((prev) => !prev);
  };
  return (
    <div className="passwordResetForm__wrap">
      <div className="passwordResetForm__wrap__text">
        <p className="passwordResetForm__wrap__text-title">
          Reset Your Password
        </p>

        <p className="passwordResetForm__wrap__text-subTitle">
          Enter your email address and we’ll send you a password reset link
        </p>
      </div>
      <form onSubmit={handleResetPassword}>
        <label>email</label>
        <input
          type="email"
          ref={emailREF}
          required
          placeholder="your@email.com"
        />
        <button>Rest Password</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
