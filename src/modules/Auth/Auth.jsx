import { useForm } from "react-hook-form";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { makeAuth } from "../../core/api/users";
import { AuthForm } from "./components/AuthForm";

export const Auth = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await makeAuth(data).then((res) => {
        const userData = res.data.data;
        login(userData.accessToken, userData.user);
        navigate(`/`);
        reset();
      });
    } catch (error) {
      console.log(error);
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
    <>
      <AuthForm
        control={control}
        getValues={getValues}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
      <NavLink to="/signup">Sign up</NavLink>
    </>
  );
};
