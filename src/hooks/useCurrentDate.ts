import { useParams } from "react-router-dom";
import { getFullMonthName } from "../utils/dateUtils";

interface paramTypes {
  day: string;
  month: string;
}
export const useCurrentDate = () => {
  const params = useParams<paramTypes>();
  const { day, month } = params;

  let monthToNumber = parseInt(month) - 1;
  let monthName = getFullMonthName(monthToNumber);
  return { day, month, monthName };
};
