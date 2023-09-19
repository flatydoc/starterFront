import { useForm } from "react-hook-form";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { makeAuth } from "../../core/api/users";
import { Form } from "./components/Form";

export const AuthForm = () => {
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

  const onSubmit = async (data) => {
    try {
      await makeAuth(data).then((res) => {
        const userData = res.data.data;
        login(userData.accessToken, userData.user);
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
      <Form
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
