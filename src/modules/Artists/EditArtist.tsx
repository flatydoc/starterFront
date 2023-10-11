import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { get, editArtist, removeArtist } from "./core/api/artists.js";
import { EditArtistForm } from "./components/EditArtistForm.jsx";
import { Toast } from "primereact/toast";
import { FieldError } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext.js";
import { IArtist } from "types/index.js";
import { IDefaultValues } from "./core/types/form.types.js";

export const EditArtist = () => {
  const [artist, setArtist] = useState<IArtist>();

  const { artistId } = useParams<{ artistId: string }>();

  const getArtist = useCallback(async () => {
    await get(artistId)
      .then((res) => {
        setArtist(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [artistId]);

  useEffect(() => {
    getArtist();
  }, [getArtist]);

  const defaultValues: IDefaultValues = {
    id: parseInt(artistId!),
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

  useEffect(() => {
    reset(artist);
  }, [artist, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: IDefaultValues) => {
    try {
      await editArtist(data).then(() => {
        showSuccess();
        // navigate(-1);
      });
    } catch (error) {
      showError();
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
      summary: "Успешно",
      detail: "Данные артиста обновлены",
    });
  };

  const showError = (): void => {
    toast.current?.show({
      severity: "error",
      summary: "Ошибка",
      detail: "Повторите попытку позже",
    });
  };

  const deleteArtist = async () => {
    try {
      await removeArtist(artistId).then(() => {
        navigate("/artists");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <Toast ref={toast} />
      <EditArtistForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
      {user?.isAdmin && <button onClick={deleteArtist}>delete</button>}
    </>
  );
};
