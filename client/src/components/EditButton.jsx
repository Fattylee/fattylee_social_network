import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FormContext } from "../context/postForm";
import { useViewpoint } from "../utils/hooks";

export const EditButton = ({ username, post: { id, body }, history }) => {
  const { setValue } = useContext(FormContext);
  const { user } = useContext(AuthContext);
  const breakPoint = useViewpoint();

  return (
    <>
      {user?.username?.toLowerCase() === username?.toLowerCase() && (
        <Button
          size={breakPoint === "mobile" ? "tiny" : "medium"}
          icon="write"
          color="blue"
          onClick={() => {
            setValue({ body, id });
            if (history) {
              history.push("/");
            }
          }}
        />
      )}
    </>
  );
};
