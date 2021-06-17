import {MONTHS} from "../constants/DateConsts";

export const getFullMonthsNames = () => MONTHS
export const getFullMonthName = (monthNumber:number) => MONTHS[monthNumber]
export const getShortenedMonthsNames = () => MONTHS.map(month=>month.substr(0,3).toUpperCase())
export const getShortenedMonthName = (monthNumber:number) => MONTHS.map(month=>month.substr(0,3).toUpperCase())[monthNumber]
