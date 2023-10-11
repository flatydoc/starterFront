import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AddArtistForm } from "./components/AddArtistForm";
import { Toast } from "primereact/toast";
import { addArtist } from "./core/api/artists.js";
import { FieldError } from "react-hook-form";
import { IDefaultValues } from "./core/types/form.types";

export const AddArtist = () => {
  const defaultValues: IDefaultValues = {
    name: "",
    surname: "",
    nickname: "",
    city: "",
    bio: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IDefaultValues>({ defaultValues });

  const onSubmit = async (data: IDefaultValues) => {
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

  const getFormErrorMessage = (name: string): JSX.Element | null => {
    const error = (errors as Record<string, FieldError>)[name];
    return error ? (
      <small className="p-error">{error.message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const toast = useRef<Toast | null>(null);

  const showSuccess = (): void => {
    toast.current?.show({
      severity: "success",
      summary: "Задача создана",
      detail: "123",
    });
  };

  const showError = (): void => {
    toast.current?.show({
      severity: "error",
      summary: "Ошибка",
      detail: "Повторите попытку позже",
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
