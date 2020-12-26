import { useState } from "react";

export const useForm = (initialValue, cb) => {
  const [error, setError] = useState({});
  const [value, setValue] = useState(initialValue);

  const handleInput = (e, { name, value }) => {
    setValue((prevSate) => ({ ...prevSate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cb();
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
