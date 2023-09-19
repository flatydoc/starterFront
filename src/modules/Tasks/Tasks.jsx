import { TasksList } from "./components/TasksList";
import { Form } from "./components/Form";
import { getAll } from "./core/api/tasks";
import { add } from "./core/api/tasks";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../core/context/AuthContext";
import { Toast } from "primereact/toast";

export const Tasks = () => {
  const { user } = useContext(AuthContext);

  const defaultValues = {
    title: "",
    text: "",
    owner: user.id,
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
        getAllTasks();
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

  const [tasks, setTasks] = useState([]);

  const getAllTasks = useCallback(async () => {
    await getAll()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <div>
      <Toast ref={toast} />
      <Form
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
      />
      <TasksList tasks={tasks} user={user} />
    </div>
  );
};
