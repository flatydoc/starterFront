import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AddEventForm } from "./components/AddEventForm";
import { Toast } from "primereact/toast";
import { addEvent } from "./core/api/events.js";
import { addArtist } from "../Artists/core/api/artists.js";
import { useState, useCallback, useEffect } from "react";
import { getAll } from "../Artists/core/api/artists.js";

export const AddEvent = () => {
  const [artists, setArtists] = useState([]);

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
    poster: "",
    date: "",
    time: "",
    tags: [],
    photos: [],
    artists: [],
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
        return artist.nickname.toLowerCase().startsWith(query.toLowerCase());
      });
    }

    setSuggestions(suggestions);
  };

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
              }}
            >
              @{suggestion.name + " " + suggestion.surname}
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
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    const existingArtists = [];
    const notExistingArtists = [];
    let artistsList;

    const existingArtistSet = new Set(
      data.artists.split(" ").map((nickname) => nickname.substring(1))
    );

    data.artists.split(" ").forEach((nickname) => {
      const artist = artists.find(
        (artist) => artist.nickname === nickname.substring(1)
      );

      if (artist && !existingArtistSet.has(artist.id)) {
        existingArtists.push(artist.id);
      } else if (!artist && !notExistingArtists.includes(nickname)) {
        notExistingArtists.push(nickname);
      }
    });

    artistsList = notExistingArtists.map((artist) => {
      return { nickname: artist.substring(1) };
    });

    const processArray = async (artistsList) => {
      for (const artist of artistsList) {
        try {
          await addArtist(artist).then((res) => {
            existingArtists.push(res.data.data.artist.id);
          });
        } catch (error) {
          showError();
        }
      }
    };

    try {
      await processArray(artistsList);
      data.artists = existingArtists;
      await addEvent(data).then(() => {
        showSuccess();
        reset();
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
      />
    </>
  );
};
