// import { useNavigate } from "react-router-dom";

export const CategoriesList = ({ categories }) => {
  //   const navigate = useNavigate();

  //   const handleClick = (id) => {
  //     navigate(`/events/${id}`, { state: { id } });
  //   };

  let categoryElements = categories?.map((c, i) => <p>{c.name}</p>);

  return <div>{categoryElements}</div>;
};
