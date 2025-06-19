import React, { SetStateAction, useEffect, useState } from "react";
import { Event } from "../types/types";
import "./../styles/CreateEvent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CreateEventProp {
  data: Event;
  setEventData: React.Dispatch<SetStateAction<Event>>;
}

const CreateEvent = ({ data, setEventData }: CreateEventProp) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>({
    id: undefined,
    title: "",
    description: "",
    location: "",
    date: "",
    author: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (typeof data.id === "number") {
      setEvent(data);
    }
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(event);

  const formOnSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) => {
    if (id) {
      if (typeof data.id === "number") {
        handleSubmitEdit(e, id);
      }
    }

    if (typeof data.id !== "number") {
      handleSubmitCreate(e);
    }
    return;
  };

  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/events/",
        {
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvent({
        id: undefined,
        title: "",
        description: "",
        location: "",
        date: "",
        author: "",
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setEvent({
        id: undefined,
        title: "",
        description: "",
        location: "",
        date: "",
        author: "",
      });
      setEventData({
        title: "",
        description: "",
        location: "",
        date: "",
        author: "",
      });
    }
  };

  const handleSubmitEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8000/api/events/${id}/`,
        {
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setEvent({
        id: undefined,
        title: "",
        description: "",
        location: "",
        date: "",
        author: "",
      });
      setEventData({
        title: "",
        description: "",
        location: "",
        date: "",
        author: "",
      });
    }
  };

  return (
    <form
      className="event-create-form"
      onSubmit={(e) => formOnSubmit(e, data.id)}
    >
      <span>Title:</span>
      <input
        placeholder="Titile"
        value={event.title}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <span>Desription:</span>
      {/* <input
        placeholder="Description"
        value={event.description}
        name="description"
        onChange={(e) => handleChange(e)}
      /> */}
      <textarea
        placeholder="Description"
        value={event.description}
        name="description"
        onChange={(e) => handleChange(e)}
      />
      <span>Date:</span>
      <input
        placeholder="2025-06-04"
        value={event.date}
        name="date"
        onChange={(e) => handleChange(e)}
      />
      <span>Location:</span>
      <input
        placeholder="location"
        value={event.location}
        name="location"
        onChange={(e) => handleChange(e)}
      />
      <div>
        {typeof data?.id === "number" ? (
          <button>Update</button>
        ) : (
          <button>Save</button>
        )}
      </div>
    </form>
  );
};

export default CreateEvent;
