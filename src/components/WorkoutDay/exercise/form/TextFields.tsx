import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styles from "./TextFields.module.css";

const TextFields: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type,
  ...props
}) => {
  const theme = createMuiTheme({
    overrides: {
      MuiInput: {
        underline: {
          "&&&&:hover:before": {
            borderBottom: "2px solid #11998e",
          },
          "&&&&:after": {
            borderBottom: "2px solid #11998e",
          },
          color: "#9b9b9b",
        },
      },
    },
  });

  const [field] = useField<{}>(props);

  return (
    <ThemeProvider theme={theme}>
      <TextField
        style={{ width: "80%" }}
        placeholder={placeholder}
        type={type}
        {...field}
        autoComplete="off"
      />
    </ThemeProvider>
  );
};

export default TextFields;
