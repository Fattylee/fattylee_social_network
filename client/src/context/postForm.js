import { createContext } from "react";
import { useForm } from "../utils/hooks";

const FormContext = createContext({
  error: null,
  setError: (errorValue) => null,
  value: null,
  setValue: (value) => null,
  handleSubmit: (event) => null,
  handleInput: (event) => null,
});

const FormProvider = (props) => {
  const value = useForm({ body: "", id: "" });
  return <FormContext.Provider value={{ ...value }} {...props} />;
};

export { FormContext, FormProvider };
