import React from "react";
import { Field } from "formik";
import { Checkbox } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const BodyPartToExercise = () => {
  const theme = createMuiTheme({
    overrides: {
      MuiCheckbox: {
        colorSecondary: {
          color: "#11998e !important",
          "&$checked": {
            color: "#ff7f50 !important",
          },
        },
      },
    },
  });

  return (
    <>
      <label>
        <ThemeProvider theme={theme}>
          <Field
            type="radio"
            name="typeOfExercise"
            value="legs"
            as={Checkbox}
          />
        </ThemeProvider>
        Legs
      </label>
      <label>
        <Field
          type="radio"
          name="typeOfExercise"
          value="glutes"
          as={Checkbox}
        />
        Glutes
      </label>
      <label>
        <Field type="radio" name="typeOfExercise" value="abs" as={Checkbox} />
        Abs
      </label>
      <label>
        <Field type="radio" name="typeOfExercise" value="back" as={Checkbox} />
        Back
      </label>
      <label>
        <Field type="radio" name="typeOfExercise" value="arms" as={Checkbox} />
        Arms
      </label>
    </>
  );
};

export default BodyPartToExercise;
