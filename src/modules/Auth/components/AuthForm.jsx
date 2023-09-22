import { Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import classNames from "classnames";

export const AuthForm = ({
  control,
  getValues,
  handleSubmit,
  onSubmit,
  getFormErrorMessage,
  errors,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Email</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <Password
                  toggleMask
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  className={classNames({ "p-invalid": fieldState.error })}
                  feedback={false}
                />
                <label htmlFor={field.name}>Password</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
