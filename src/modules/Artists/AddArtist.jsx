import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AddArtistForm } from "./components/AddArtistForm";
import { Toast } from "primereact/toast";
import { addArtist } from "./core/api/artists.js";

export const AddArtist = () => {
  const defaultValues = {
    name: "",
    surname: "",
    nickname: "",
    city: "",
  };

  const toast = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      await addArtist(data).then(() => {
        showSuccess();
        reset();
      });
    } catch (error) {
      showError();
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

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Some text",
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error text",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddArtistForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
    </>
  );
};
