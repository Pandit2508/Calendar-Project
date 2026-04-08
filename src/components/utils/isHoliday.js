import { format } from "date-fns";
import { holidays } from "../data/holidays";

export const getHoliday = (day) => {
  const formatted = format(day, "yyyy-MM-dd");
  return holidays.find((h) => h.date === formatted);
};