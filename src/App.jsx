import React, { useRef, useState } from "react";
import Form from "./components/Form";
import "./App.scss";
import ResultCard from "./components/ResultCard";

const App = () => {
  const [data, setData] = useState(null);
  const [username, setUserName] = useState("");
  const [selectedSign, setSelectedSign] = useState("");
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
      />
      {data ? (
        <ResultCard
          data={data}
          name={username}
          sign={selectedSign}
          resultRef={resultRef}
          formRef={formRef}
          setData={setData}
        />
      ) : null}
    </div>
  );
};

export default App;
