import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../../../modules/Tasks/core/api/tasks";

export const EditTaskPage = () => {
  const [task, setTask] = useState([]);
  const location = useLocation();
  const getTask = useCallback(async () => {
    await get(location.state.id)
      .then((res) => {
        setTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getTask();
  }, [getTask]);

  return <div>{task.title}</div>;
};
