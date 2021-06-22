import React from "react";
import { Field } from "formik";
import { Checkbox, Radio } from "@material-ui/core";
import styles from "./BodyPartToExercise.module.css";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const BodyPartToExercise = () => {
  const theme = createMuiTheme({
    overrides: {
      MuiCheckbox: {
        root: {
          color: "#11998e !important",
          "&&&&:before": {
            color: "#11998e",
          },
        },
        colorSecondary: {
          color: "#11998e;",
          "&$checked": {
            color: "#11998e",
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
            type="checkbox"
            name="typeOfExercise"
            value="legs"
            as={Checkbox}
            className={styles.input}
          />
        </ThemeProvider>
        Legs
      </label>
      <label>
        <Field
          type="checkbox"
          name="typeOfExercise"
          value="glutes"
          as={Checkbox}
        />
        Glutes
      </label>
      <label>
        <Field
          type="checkbox"
          name="typeOfExercise"
          value="abs"
          as={Checkbox}
        />
        Abs
      </label>
      <label>
        <Field
          type="checkbox"
          name="typeOfExercise"
          value="back"
          as={Checkbox}
        />
        Back
      </label>
      <label>
        <Field
          type="checkbox"
          name="typeOfExercise"
          value="arms"
          as={Checkbox}
        />
        Arms
      </label>
    </>
  );
};

export default BodyPartToExercise;
