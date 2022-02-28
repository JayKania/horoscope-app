import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import Signs from "./Signs";

import aquarius from "../assets/aquarius.png";
import aries from "../assets/aries.png";
import cancer from "../assets/cancer.png";
import capricorn from "../assets/capricorn.png";
import gemini from "../assets/gemini.png";
import leo from "../assets/leo.png";
import libra from "../assets/libra.png";
import pisces from "../assets/pisces.png";
import sagittarius from "../assets/sagittarius.png";
import scorpio from "../assets/scorpio.png";
import taurus from "../assets/taurus.png";
import virgo from "../assets/virgo.png";

const Form = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [signs, setSigns] = useState([
    { name: "aquarius", logo: aquarius, active: false },
    { name: "aries", logo: aries, active: false },
    { name: "cancer", logo: cancer, active: false },
    { name: "capricorn", logo: capricorn, active: false },
    { name: "gemini", logo: gemini, active: false },
    { name: "leo", logo: leo, active: false },
    { name: "libra", logo: libra, active: false },
    { name: "pisces", logo: pisces, active: false },
    { name: "sagittarius", logo: sagittarius, active: false },
    { name: "scorpio", logo: scorpio, active: false },
    { name: "taurus", logo: taurus, active: false },
    { name: "virgo", logo: virgo, active: false },
  ]);
  const [selectedSign, setSelectedSign] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dayError, setDayError] = useState("");
  const [signsError, setSignsError] = useState("");
  const yesterdayRef = useRef();
  const todayRef = useRef();
  const tomorrowRef = useRef();
  const userRef = useRef();
  const emailRef = useRef();

  const inputHandler = (event) => {
    if (event.target.id === "username") {
      setUserError(false);
      setUserName(event.target.value);
    } else {
      setEmailError(false);
      setEmail(event.target.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!userRef.current.value) {
      setUserError(true);
    }
    if (!validateEmail(emailRef.current.value)) {
      setEmailError(true);
    }
    if (!day) {
      setDayError(true);
    }
    if (!selectedSign) {
      setSignsError(true);
    }
  };

  const dayHandler = (event) => {
    if (event.target.id === "yesterday") {
      yesterdayRef.current.className = "active";
      todayRef.current.className = "";
      tomorrowRef.current.className = "";
      setDay("yesterday");
    } else if (event.target.id === "today") {
      yesterdayRef.current.className = "";
      todayRef.current.className = "active";
      tomorrowRef.current.className = "";
      setDay("today");
    } else {
      yesterdayRef.current.className = "";
      todayRef.current.className = "";
      tomorrowRef.current.className = "active";
      setDay("tomorrow");
    }
    setDayError(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Find your Horoscope</h2>
      <div className="p-float-label input-text">
        <InputText
          id="username"
          value={username}
          onChange={inputHandler}
          ref={userRef}
          className={`${userError ? "p-invalid" : ""}`}
        />
        <label htmlFor="username">Username</label>
      </div>
      {userError ? <div className="user-err">Invalid username.</div> : null}
      <div className="days">
        <div id="yesterday" ref={yesterdayRef} onClick={dayHandler}>
          Yesterday
        </div>
        <div id="today" ref={todayRef} onClick={dayHandler}>
          Today
        </div>
        <div id="tomorrow" ref={tomorrowRef} onClick={dayHandler}>
          Tomorrow
        </div>
      </div>
      {dayError ? <div className="day-err">Please select a day.</div> : null}
      <div className="p-float-label email">
        <InputText
          id="email"
          value={email}
          onChange={inputHandler}
          ref={emailRef}
          className={`${emailError ? "p-invalid" : ""}`}
        />
        <label htmlFor="email">Email id</label>
      </div>
      {emailError ? (
        <div className="email-err">Invalid email address.</div>
      ) : null}
      <Signs
        signs={signs}
        setSigns={setSigns}
        selectedSign={selectedSign}
        setSelectedSign={setSelectedSign}
        setSignsError={setSignsError}
      />
      {signsError ? (
        <div className="signs-err">Please select a sign.</div>
      ) : null}
      <div className="submit">
        <input type="submit" />
      </div>
    </form>
  );
};

export default Form;
