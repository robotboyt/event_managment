import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import { Event } from "./types/types";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<Event>({
    title: "",
    description: "",
    location: "",
    date: "",
    author: "",
  });

  const handleEditEvent = (data: Event) => {
    setEventData(data);
    navigate("/create");
  };

  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage editEvent={handleEditEvent} />} />
        <Route
          path="/create"
          element={<CreateEvent data={eventData} setEventData={setEventData} />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
