"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function EyeButton({ passwordID }) {
  let [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let handelEyeClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
    let password = document.getElementById(passwordID);
    if (isPasswordVisible) {
      password.type = "password";
    } else {
      password.type = "text";
    }
  };

  return (
    <>
      <button type="button" onClick={handelEyeClick}>
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </button>
    </>
  );
}
