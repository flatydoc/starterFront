import { useNavigate } from "react-router-dom";

export const TasksList = ({ tasks }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/tasks/${id}`, { state: { id } });
  };

  return (
    <>
      {tasks.map((task, i) => (
        <div key={task.id}>
          <div>{task.title}</div>
          <button onClick={() => handleClick(task.id)}>edit</button>
        </div>
      ))}
    </>
  );
};
