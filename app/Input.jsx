"use client";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({
  setValue,
  nextRef = null,
  type = "text",
  placeholder = "",
  onSubmit = () => null,
  ref,
  value,
  regEx,
  error=""
}) => {
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef) {
        nextRef.current.focus();
      } else {
        onSubmit();
      }
    }
  };

  const [inputType, setinputType] = useState("password");
  return (
    <div className="focus-within:[&>span]:w-60 w-fit mx-auto relative">
      <input
        type={type === "password" ? inputType : type}
        className="border-b border-b-gray-400 w-60 outline-0"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        onKeyDown={(e) => handleKeyDown(e, nextRef)}
      />
      <span className="w-0 border-t-2 border-t-primary duration-300 mx-auto block" />
      <div className="text-red-500 h-7">
        {value && !regEx.test(value) && error}
      </div>
      {value && type === "password" && (
        <div
          className="absolute top-1 right-1 cursor-pointer"
          onClick={() => {
            setinputType((prev) => (prev === "password" ? "text" : "password"));
          }}
        >
          {inputType === "text" ? <BsEyeSlash /> : <BsEye />}
        </div>
      )}
    </div>
  );
};

export default Input;
