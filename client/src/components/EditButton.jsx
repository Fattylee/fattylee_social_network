import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FormContext } from "../context/postForm";

export const EditButton = ({ username, post: { id, body } }) => {
  const { setValue } = useContext(FormContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {user?.username?.toLowerCase() === username?.toLowerCase() && (
        <Button
          icon="write"
          color="blue"
          onClick={() => {
            setValue({ body, id });
            document.querySelector("#textArea")?.focus();
          }}
        />
      )}
    </>
  );
};
