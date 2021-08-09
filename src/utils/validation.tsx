import validator from "validator";

export const isNotEmpty = (value: string) => value.trim() !== "";
export const isEmail = (value: string) => value.includes("@");
export const passwordValidator = (value: string) =>
  validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
export const getStartDayOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 0).getDay();

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const hasAtLeastFiveLetters = (value: string) => value.length >= 5;
