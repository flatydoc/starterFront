import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { get, editEvent, removeEvent } from "./core/api/events.js";
import { EditEventForm } from "./components/EditEventForm.jsx";
import { Toast } from "primereact/toast";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";

export const EditEvent = () => {
  const [event, setEvent] = useState();
  const { user } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const getEvent = useCallback(async () => {
    await get(eventId)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const defaultValues = {
    title: "",
    text: "",
    posterUrl: "",
    date: "",
    time: "",
    tags: [],
    photos: [],
    artists: [],
    place: "",
    price: "",
    id: eventId,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(event);
  }, [event, reset]);

  const toast = useRef(null);

  const onSubmit = async (data) => {
    data.id = eventId;
    try {
      await editEvent(data).then(() => {
        showSuccess();
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

  const deleteEvent = async () => {
    try {
      await removeEvent(eventId).then(() => {
        navigate("/events");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <EditEventForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
      {user?.isAdmin && <button onClick={deleteEvent}>delete</button>}
    </>
  );
};
