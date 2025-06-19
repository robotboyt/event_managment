import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import type { Event } from "../types/types";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

interface HomePageProps {
  editEvent: (data: Event) => void;
}

const HomePage = ({ editEvent }: HomePageProps) => {
  const [data, setData] = useState<Event[]>();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/events/");
    setData(res.data);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/events/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const registerToEvent = async (id: number) => {
    let stringId = id.toString();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register_event/",
        {
          event: stringId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events">
      {data?.map((item) => (
        <div key={item.id} className="event-item">
          <div className="event-description">
            <h3>Title:{item.title}</h3>
            <p>{item.description}</p>
            <div className="date-location">
              <p>Date: {item.date}</p>
              <span>Location: {item.location}</span>
            </div>
            <span>Author: {item.author}</span>
            <div className="buttons">
              <button onClick={() => item?.id && registerToEvent(item.id)}>
                I'll Go
              </button>
              {item.author === user ? (
                <>
                  <button onClick={() => item?.id && handleDelete(item.id)}>
                    Delete
                  </button>
                  <button onClick={() => editEvent(item)}>Edit</button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
