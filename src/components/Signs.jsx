import { createRef, useRef, useState } from "react";

const Signs = ({
  signs,
  setSigns,
  setSelectedSign,
  setSignsError,
  selectedSign,
}) => {
  const signRefs = useRef([]);

  signRefs.current = signs.map((_, i) => signRefs.current[i] ?? createRef());

  const signSelectHandler = (ref) => {
    const tempSigns = [...signs];
    tempSigns.map((sign) => {
      if (sign.name === ref.current.id) {
        setSelectedSign(sign.name);
        sign.active = true;
      } else {
        sign.active = false;
      }
    });
    setSignsError(false);
    setSigns(tempSigns);
  };

  const signsHtml = signs.map((sign, index) => {
    return (
      <div
        key={sign.name}
        className={`sign ${sign.active ? "active" : ""}`}
        id={sign.name}
        ref={signRefs.current[index]}
        onClick={() => signSelectHandler(signRefs.current[index])}
      >
        <img src={sign.logo} alt="" />
        <div className="sign-name">{sign.name}</div>
      </div>
    );
  });
  return <div className="signs">{signsHtml}</div>;
};

export default Signs;
