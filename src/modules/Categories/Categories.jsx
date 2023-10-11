import { AuthContext } from "../../core/context/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "./core/api/categories.js";
import { CategoriesList } from "./components/CategoriesList";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = useCallback(async () => {
    await getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.isAdmin && <NavLink to={`add`}>Add</NavLink>}
      <CategoriesList categories={categories} />
    </div>
  );
};
