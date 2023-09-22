import { useForm } from "react-hook-form";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { createNewUser } from "../../core/api/users";
import { RegistrationForm } from "./components/RegistrationForm";

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
    getValues,
    reset,
  } = useForm({ defaultValues });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createNewUser(data).then((res) => {
        const userData = res.data.data;
        login(userData.accessToken, userData.user);
        reset();
        navigate(`/`);
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
      <RegistrationForm
        control={control}
        getValues={getValues}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
      <NavLink to="/signin">Sign In</NavLink>
    </>
  );
};
