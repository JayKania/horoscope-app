import React, { useEffect, useRef, useState } from "react";
import Form from "./components/Form";
import "./App.scss";
import ResultCard from "./components/ResultCard";

const App = () => {
  const [data, setData] = useState(() => {
    if (localStorage.length) {
      return {
        current_date: localStorage.getItem("current_date"),
        compatibility: localStorage.getItem("compatible"),
        description: localStorage.getItem("description"),
      };
    } else {
      return null;
    }
  });
  const [username, setUserName] = useState(() => {
    if (localStorage.length) {
      return localStorage.getItem("name");
    } else {
      return "";
    }
  });
  const [selectedSign, setSelectedSign] = useState(() => {
    if (localStorage.length) {
      return localStorage.getItem("sign");
    } else {
      return "";
    }
  });
  const [email, setEmail] = useState(() => {
    if (localStorage.length) {
      return localStorage.getItem("email");
    } else {
      return "";
    }
  });
  const [day, setDay] = useState(() => {
    if (localStorage.length) {
      return localStorage.getItem("day");
    } else {
      return "";
    }
  });
  const formRef = useRef();
  const resultRef = useRef();

  return (
    <div id="app">
      <Form
        data={data}
        setData={setData}
        username={username}
        setUserName={setUserName}
        selectedSign={selectedSign}
        setSelectedSign={setSelectedSign}
        formRef={formRef}
        email={email}
        setEmail={setEmail}
        day={day}
        setDay={setDay}
      />
      {data ? (
        <ResultCard
          data={data}
          name={username}
          sign={selectedSign}
          resultRef={resultRef}
          formRef={formRef}
          setData={setData}
          email={email}
          day={day}
        />
      ) : null}
    </div>
  );
};

export default App;
