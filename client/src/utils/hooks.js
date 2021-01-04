import { useCallback, useEffect, useState } from "react";

export const useForm = (initialValue, cb) => {
  const [error, setError] = useState({});
  const [value, setValue] = useState(initialValue);

  const handleInput = (e, { name, value }) => {
    setValue((prevSate) => ({ ...prevSate, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
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
  const getWidth = (width) => {
    if (width < 768) {
      return "mobile";
    } else if (width >= 768 && width <= 991) {
      return "tablet";
    } else if (width > 991 && width <= 1200) {
      return "computer";
    } else if (width > 1200) {
      return "large screen";
    }
  };

  const [breakPoint, setBreakPoint] = useState(getWidth(window.innerWidth));

  const handleResize = useCallback(() => {
    setBreakPoint(getWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return breakPoint;
};
