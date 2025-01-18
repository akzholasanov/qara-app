import { useState } from 'react';
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  format,
  eachDayOfInterval,
  getYear,
} from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // To get the current day in dd-MM-yyyy format
  const getCurrentDay = () => format(currentDate, 'dd-MM-yyyy');

  // To get the current short day name (Mon, Tue, ...)
  const shortDayName = format(currentDate, 'EEE'); // Abbreviated day name (Mon, Tue, ...)

  // Example - January 16
  const fullDate = format(currentDate, 'MMMM d'); // Full date like "January 16"

  // To get the current year
  const year = getYear(currentDate); // Get the full year

  // Get the current week (array of dates)
  const getCurrentWeek = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end }).map((date) => ({
      date: format(date, 'd'),
      day: format(date, 'EEE').toLocaleUpperCase(),
    })
    );
  };

  // Get the current full day name (e.g., "Monday")
  const getDayOfWeek = () => format(currentDate, 'EEEE');

  // Switch to the next week
  const goToNextWeek = () => setCurrentDate((prev) => addWeeks(prev, 1));

  // Switch to the previous week
  const goToPreviousWeek = () => setCurrentDate((prev) => subWeeks(prev, 1));

  // Get the next week (without changing the state)
  const getNextWeek = () => {
    const start = startOfWeek(addWeeks(currentDate, 1), { weekStartsOn: 1 });
    const end = endOfWeek(addWeeks(currentDate, 1), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end }).map((date) =>
      format(date, 'yyyy-MM-dd')
    );
  };

  // Get the previous week (without changing the state)
  const getPreviousWeek = () => {
    const start = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
    const end = endOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end }).map((date) =>
      format(date, 'yyyy-MM-dd')
    );
  };

  return {
    currentDate: getCurrentDay(),
    year,
    fullDayName: getDayOfWeek(),
    shortDayName,
    fullDate,
    currentWeek: getCurrentWeek(),
    previousWeek: getPreviousWeek(),
    nextWeek: getNextWeek(),
    goToNextWeek,
    goToPreviousWeek,
  };
};
