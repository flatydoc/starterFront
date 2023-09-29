import { Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import classNames from "classnames";
import styles from "./RegistrationForm.module.scss";
import { Button } from "primereact/button";

export const RegistrationForm = ({
  control,
  handleSubmit,
  onSubmit,
  getFormErrorMessage,
  errors,
  watch,
  loading,
}) => {
  const password = watch("password");

  const comparePass = (v) => {
    if (v === password) {
      return true;
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required." }}
          render={({ field, fieldState }) => (
            <div className={styles.formItem}>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    styles.input
                  )}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Name*</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address.",
            },
          }}
          render={({ field, fieldState }) => (
            <div className={styles.formItem}>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames(
                    { "p-invalid": fieldState.invalid },
                    styles.input
                  )}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Email*</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password is too short (minimum is 6 characters)",
            },
          }}
          render={({ field, fieldState }) => (
            <div className={styles.formItem}>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <Password
                  toggleMask
                  feedback={false}
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    styles.input
                  )}
                />
                <label htmlFor={field.name}>Password*</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Controller
          name="repeatedPassword"
          control={control}
          rules={{
            required: "Repeat password.",
            validate: {
              checkPass: (v) =>
                comparePass(v) ||
                "Password confirmation doesn't match password",
            },
            minLength: {
              value: 6,
              message:
                "Password confirmation is too short (minimum is 6 characters)",
            },
          }}
          render={({ field, fieldState }) => (
            <div className={styles.formItem}>
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
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    styles.input
                  )}
                  feedback={false}
                />
                <label htmlFor={field.name}>Re-enter password*</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Button disabled={loading} label="Create accaunt" type="submit" />
      </form>
    </>
  );
};
