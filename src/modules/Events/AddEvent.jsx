import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AddEventForm } from "./components/AddEventForm";
import { Toast } from "primereact/toast";
import { add } from "./core/api/events.js";

export const AddEvent = ({ getAllEvents }) => {
  const defaultValues = {
    title: "",
    text: "",
    date: "",
    place: "",
    price: "",
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
      await add(data).then(() => {
        showSuccess();
        // getAllEvents();
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
      summary: "Задача создана",
      detail: "123",
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Ошибка",
      detail: "Повторите попытку позже",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <AddEventForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
    </>
  );
};
