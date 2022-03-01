import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import Signs from "./Signs";
import axios from "axios";

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

import zodiac from "../assets/zodiac.png";

const Form = ({
  data,
  setData,
  username,
  setUserName,
  selectedSign,
  setSelectedSign,
  formRef,
  email,
  setEmail,
  day,
  setDay,
}) => {
  //state

  const [signs, setSigns] = useState(() => {
    const signsArray = [
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
    ];
    if (selectedSign) {
      signsArray.map((sign) => {
        if (sign.name === selectedSign.toLowerCase()) {
          sign.active = true;
        }
      });
      return signsArray;
    } else {
      return signsArray;
    }
  });
  const [loading, setLoading] = useState(false);

  // errors
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [signsError, setSignsError] = useState(false);
  // refs
  const yesterdayRef = useRef();
  const todayRef = useRef();
  const tomorrowRef = useRef();
  const userRef = useRef();
  const emailRef = useRef();

  // https://divineapi.com/api/1.0/get_daily_horoscope.php/?api_key=42e7aaa88b48137a16a1acd04ed91125&date=2022-03-01&sign=aries&timezone=5.5

  const inputHandler = (event) => {
    if (event.target.id === "username") {
      setUserError(false);
      setUserName(event.target.value);
    } else {
      setEmailError(false);
      setEmail(event.target.value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!userRef.current.value) {
      setUserError(true);
      return;
    }
    if (!day) {
      setDayError(true);
      return;
    }
    if (!validateEmail(emailRef.current.value)) {
      setEmailError(true);
      return;
    }
    if (!selectedSign) {
      setSignsError(true);
      return;
    }
    setLoading(true);
    console.log(selectedSign);
    console.log(day);
    const options = {
      method: "POST",
      url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
      params: { sign: selectedSign, day: day },
      headers: {
        "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        "x-rapidapi-key": "cb04818fb7msh1314b7e7a7a63adp1e6b6bjsn29cfcdd861aa",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
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
    // className={`${data ? "active" : null}`}
    <form
      onSubmit={submitHandler}
      className={`general-card ${data ? "form-active" : null}`}
      ref={formRef}
    >
      <header>
        <h2>Find your Horoscope</h2>
        <img src={zodiac} alt="" />
      </header>
      <div className="p-float-label input-text">
        <InputText
          id="username"
          value={username}
          onChange={inputHandler}
          ref={userRef}
          className={`${userError ? "p-invalid" : ""}`}
          autoComplete="off"
        />
        <label htmlFor="username">Username</label>
      </div>
      {userError ? <div className="user-err">Invalid username.</div> : null}
      <div className="days">
        <div
          id="yesterday"
          ref={yesterdayRef}
          onClick={dayHandler}
          className={`${day === "yesterday" ? "active" : ""}`}
        >
          Yesterday
        </div>
        <div
          id="today"
          ref={todayRef}
          onClick={dayHandler}
          className={`${day === "today" ? "active" : ""}`}
        >
          Today
        </div>
        <div
          id="tomorrow"
          ref={tomorrowRef}
          onClick={dayHandler}
          className={`${day === "tomorrow" ? "active" : ""}`}
        >
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
          autoComplete="off"
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
      <Button label="Submit" loading={loading ? true : false} />
    </form>
  );
};

export default Form;
