"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@nextui-org/react";

export default function ClassRoutine() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    classRoutine: [],
    classTimes: [],
    weekdays: [],
  });
  const [noDataMessage, setNoDataMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(`/api/classRoutine`);
        let json = await res.json();

        if (res.status !== 200) {
          setNoDataMessage(json.error);
          setIsLoading(false);
          return {
            items: [],
          };
        }

        setData({
          classRoutine: json.data.classRoutine || [],
          classTimes: json.data.classTimes || [],
          weekdays: json.data.weekdays || [],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const { classRoutine, classTimes, weekdays } = data;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h">
      <h1 className="text-center p-4 text-3xl">Class Routine</h1>
      <Table
        // isStriped
        aria-label="Class Routine"
        classNames={{
          table: "min-h",
        }}
      >
        <TableHeader>
          <TableColumn
            key="weekday"
            className="bg-slate-700 text-md text-question text-center font-normal"
          >
            Weekday
          </TableColumn>
          {classTimes.map((time) => (
            <TableColumn
              key={time.class_time_id}
              className="bg-slate-700 text-md text-question text-center font-normal"
            >
              {time.time}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={weekdays}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={noDataMessage}
        >
          {(weekday) => (
            <TableRow key={weekday.day_id}>
              <TableCell className="text-purple-500">
                {weekday.weekday_name === today ? (
                  <Chip color="warning" variant="dot">
                    {weekday.weekday_name}
                  </Chip>
                ) : (
                  <Chip color="secondary" variant="flat">
                    {weekday.weekday_name}
                  </Chip>
                )}
              </TableCell>
              {classTimes.map((time) => {
                const routine = classRoutine.find(
                  (r) =>
                    r.weekday === weekday.day_id &&
                    r.starting_time === time.class_time_id
                );
                if (routine) {
                  const colSpan =
                    routine.ending_time - routine.starting_time + 1;
                  return (
                    <TableCell
                      key={time.class_time_id}
                      aria-colspan={colSpan > 1 ? colSpan : undefined}
                      colSpan={colSpan > 1 ? colSpan : undefined}
                      className="table-cell"
                    >
                      <div className="text-center">
                        {routine.course_name.length > 15
                          ? `${routine.course_name.substring(0, 15)}...`
                          : routine.course_name}
                      </div>
                    </TableCell>
                  );
                } else {
                  return <TableCell key={time.class_time_id} />;
                }
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
