import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { createNewUser } from "../../core/api/users";
import { RegistrationForm } from "./components/RegistrationForm";
import { Message } from "primereact/message";
import styles from "./Registration.module.scss";

export const Registration = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ defaultValues });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createNewUser(data).then((res) => {
        const userData = res.data.data;
        login(userData.accessToken, userData.user);
        setLoading(false);
        navigate(`/`);
      });
    } catch (error) {
      setServerError(error.response.data.message);
      setLoading(false);
    }
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Sign up</h2>
      <RegistrationForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
        watch={watch}
        loading={loading}
      />
      {serverError && <Message severity="error" text={serverError} />}
      <p>
        <span style={{ color: "#6c757d" }}>
          Do you already have an account?
        </span>
        <NavLink className={styles.link} to="/signin">
          Log in
        </NavLink>
      </p>
    </div>
  );
};
