import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type AddEntryCalendarProps = {
  setDate: (date: Date) => void;
  date: Date;
};

const AddEntryCalendar = ({ setDate, date }: AddEntryCalendarProps) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const handleButtonClick = (day: Date) => {
    setDate(day);
    setSelectedDay(day);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={previousMonth}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.h4
            key={format(firstDayCurrentMonth, "MMMM yyyy")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold"
          >
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </motion.h4>
        </AnimatePresence>
        <Button variant="ghost" size="icon" className="" onClick={nextMonth}>
          <span className="sr-only">Next month</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-7 text-center text-xs leading-6 text-muted">
        <div className="">S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        <AnimatePresence mode="wait" initial={false}>
          {days?.map((day, dayIdx) => (
            <motion.div
              key={day?.toString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5",
              )}
            >
              <button
                type="button"
                onClick={() => handleButtonClick(day)}
                className={cn(
                  isEqual(day, selectedDay) && "text-display-inverted",
                  !isEqual(day, selectedDay) && isToday(day) && "",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-nav",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "",
                  isEqual(day, selectedDay) &&
                    isToday(day) &&
                    "bg-surface-container-highest",
                  isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    "bg-surface-container-highest",
                  !isEqual(day, selectedDay) &&
                    "hover:bg-surface-container-higher",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "relative mx-auto flex h-8 w-8 items-center justify-center rounded-md transition",
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
                {isToday(day) && !isEqual(day, selectedDay) && (
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-end justify-center">
                    <div className="h-1.5 w-1.5 rounded-full border bg-surface-container-highest" />
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddEntryCalendar;

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
