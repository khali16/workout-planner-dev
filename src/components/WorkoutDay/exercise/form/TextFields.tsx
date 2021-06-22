import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import classNames from "classnames";
const TextFields: React.FC<FieldAttributes<{}>> = ({
  placeholder,
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
        {...field}
      />
    </ThemeProvider>
  );
};

export default TextFields;
