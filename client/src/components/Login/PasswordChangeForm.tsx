import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  password: string;
  confirm: string;
};

interface PasswordChangeFormType {
  submitPasswordChange: (query: string) => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormType> = ({
  submitPasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setconfirmPassword] = useState<boolean>(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<FormData>({
    mode: "all",
  });

  const password = watch("password");
  const errorMessage = errors.confirm?.message || errors.password?.message;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    submitPasswordChange(data?.password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="passwordShow">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
                message:
                  "Password should be at least 6 characters and include at least 1 letter, 1 number, and 1 special character",
              },
            })}
            placeholder="password"
          />

          <p
            onClick={() => setShowPassword(!showPassword)}
            className="passwordShow-toggle"
          >
            show
          </p>
        </div>

        <div className="passwordShow">
          <input
            type={confirmPassword ? "text" : "password"}
            {...register("confirm", {
              required: "Confirm Password is required",
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
                message:
                  "Password should be at least 6 characters and include at least 1 letter, 1 number, and 1 special character",
              },
              validate: (value) =>
                value === password || "Passwords don't match!",
            })}
            placeholder="Confirm Password"
          />
          <p
            onClick={() => setconfirmPassword(!confirmPassword)}
            className="passwordShow-toggle"
          >
            show
          </p>
        </div>
        <button type="submit">change</button>

        {errorMessage && (
          <p className="editInput__error widthXS">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default PasswordChangeForm;
