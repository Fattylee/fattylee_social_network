import { useEffect, useState } from "react";

export const useForm = (initialValue, cb) => {
  const [error, setError] = useState({});
  const [value, setValue] = useState(initialValue);

  const handleInput = (e, { name, value }) => {
    setValue((prevSate) => ({ ...prevSate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cb) cb();
  };

  return {
    error,
    setError,
    value,
    setValue,
    handleSubmit,
    handleInput,
  };
};

export const useViewpoint = () => {
  const [breakPoint, setBreakPoint] = useState(window.innerWidth);

  const getWidth = (width) => {
    if (width <= 320) {
      return "xs";
    } else if (width > 320 && width <= 700) {
      return "sm";
    } else if (width > 700 && width <= 920) {
      return "md";
    } else if (width > 920 && width <= 1200) {
      return "lg";
    } else {
      return "xl";
    }
  };
  const handleResize = (e) => {
    console.log(window.innerWidth, "*****SIZE*****");
    setBreakPoint(getWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakPoint;
};
