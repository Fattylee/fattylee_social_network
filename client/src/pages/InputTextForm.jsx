import React, { useState } from "react";
import { Form } from "semantic-ui-react";

export const InputTextForm = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <Form>
        <Form.Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => {
            console.log(e.key, value);
            console.log("keyUp");
          }}
          onKeyDown={(e) => {
            console.log(e.key, value);
            console.log("keyDown");
          }}
        />
      </Form>
    </div>
  );
};
