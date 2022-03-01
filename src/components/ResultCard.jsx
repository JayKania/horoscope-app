import React from "react";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const ResultCard = ({ data, name, sign, resultRef, formRef, setData }) => {
  //   console.log(data.current_date);

  const navigationHandler = () => {
    resultRef.current.className = "general-card";
    formRef.current.className = "general-card";
    setData(null);
  };

  return (
    <div
      id="result"
      className={`general-card ${data ? "result-active" : null}`}
      ref={resultRef}
    >
      {/* <InputTextarea rows={5} cols={30} autoResize /> */}
      <div className="back-button" onClick={navigationHandler}>
        <i className="pi pi-arrow-left" style={{ fontSize: "1.5em" }}></i>
      </div>
      <h2>Your Horoscope</h2>
      <div className="result-field result-name">
        <label htmlFor="name">Name:</label>
        <InputText id="name" disabled value={name} />
      </div>
      <div className="result-field result-date">
        <label htmlFor="date">Current Date:</label>
        <InputText id="date" disabled value={data.current_date} />
      </div>
      <div className="result-field result-desc">
        <label htmlFor="desc">Description:</label>
        <InputTextarea
          rows={5}
          autoResize
          id="desc"
          value={data.description}
          disabled
        />
      </div>
      <div className="result-field result-your-sign">
        <label htmlFor="your-sign">Your Sign:</label>
        <InputText id="your-sign" disabled value={sign} />
      </div>
      <div className="result-field result-compatible-sign">
        <label htmlFor="compatible-sign">Compatibility:</label>
        <InputText id="compatible-sign" disabled value={data.compatibility} />
      </div>
    </div>
  );
};

export default ResultCard;
