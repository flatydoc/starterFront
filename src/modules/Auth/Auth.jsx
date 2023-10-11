import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { makeAuth } from "../../core/api/users";
import { AuthForm } from "./components/AuthForm";
import { Message } from "primereact/message";
import styles from "./Auth.module.scss";

export const Auth = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await makeAuth(data).then((res) => {
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
      <h2 className={styles.title}>Log in</h2>
      <AuthForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
        loading={loading}
      />
      {serverError && <Message severity="error" text={serverError} />}
      <p>
        <span style={{ color: "#6c757d" }}>Don't have an account yet?</span>
        <NavLink className={styles.link} to="/signup">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};
