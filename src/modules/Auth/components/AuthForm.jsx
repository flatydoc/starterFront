import { Controller } from "react-hook-form";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import classNames from "classnames";
import styles from "./AuthForm.module.scss";

export const AuthForm = ({
  control,
  handleSubmit,
  onSubmit,
  getFormErrorMessage,
  errors,
  loading,
}) => {
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    { "p-invalid": fieldState.error },
                    styles.input
                  )}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Email</label>
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
              message: "Password cannot be shorter than 6 characters",
            },
          }}
          render={({ field, fieldState }) => (
            <div className={styles.formItem}>
              <label
                htmlFor={field.name}
                className={classNames(
                  { "p-error": errors.value },
                  styles.input
                )}
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
                <label htmlFor={field.name}>Password</label>
              </span>
              {getFormErrorMessage(field.name)}
            </div>
          )}
        />
        <Button disabled={loading} label="Log in" type="submit" />
      </form>
    </>
  );
};
