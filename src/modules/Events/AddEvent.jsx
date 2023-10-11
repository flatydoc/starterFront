import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AddEventForm } from "./components/AddEventForm";
import { Toast } from "primereact/toast";
import { addEvent } from "./core/api/events.js";
import { useState, useCallback, useEffect } from "react";
import { getAll } from "../Artists/core/api/artists.js";
import { getCategories } from "../Categories/core/api/categories.js";
import { useNavigate } from "react-router-dom";

export const AddEvent = () => {
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getAllArtists = useCallback(async () => {
    await getAll()
      .then((res) => {
        setArtists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllArtists();
  }, [getAllArtists]);

  const defaultValues = {
    title: "",
    text: "",
    posterUrl: "",
    // date: "",
    // time: "",
    category: "",
    photos: [],
    artists: "",
    place: "",
    price: "",
  };

  const [suggestions, setSuggestions] = useState([]);

  const onSearch = (event) => {
    const query = event.query;
    let suggestions;

    if (!query.trim().length) {
      suggestions = [...artists];
    } else {
      suggestions = artists.filter((artist) => {
        return artist.nickname;
      });
    }

    setSuggestions(suggestions);
  };

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

  const itemTemplate = (suggestion) => {
    return (
      <div className="flex align-items-center">
        <span className="flex flex-column ml-2">
          {suggestion.nickname}
          {suggestion.name && suggestion.surname && (
            <small
              style={{
                fontSize: ".75rem",
                color: "var(--text-secondary-color)",
              }}>
              {suggestion.name + " " + suggestion.surname}
            </small>
          )}
        </span>
      </div>
    );
  };

  const toast = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    if (data.artists) {
      const artistsList = data.artists
        .split(" ")
        .filter((artist) => artist.startsWith("@"))
        .map((artist) => ({ nickname: artist.slice(1) }));
      data.artists = artistsList;
    }
    data.category = data.category.id;
    try {
      await addEvent(data).then(() => {
        showSuccess();
        navigate("/events");
      });
    } catch (error) {
      showError();
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
      <AddEventForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        getFormErrorMessage={getFormErrorMessage}
        itemTemplate={itemTemplate}
        suggestions={suggestions}
        onSearch={onSearch}
        categories={categories}
      />
    </>
  );
};
