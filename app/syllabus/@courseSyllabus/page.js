"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function CourseSyllabus() {
  const [isLoading, setIsLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");

  let list = useAsyncList({
    async load({ signal }) {
      try {
        let res = await fetch(`/api/courseSyllabus`, {
          signal,
        });
        let json = await res.json();

        if (res.status !== 200) {
          setNoDataMessage(json.error);
          setIsLoading(false);
          return {
            items: [],
          };
        }

        setIsLoading(false);
        return {
          items: json.data || [],
        };
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
        return {
          items: [],
        };
      }
    },
  });

  return (
    <div className="min-h">
      <h1 className="text-center p-4 text-3xl">Semester Syllabus</h1>
      <Table
        aria-label="Current Semester Syllabus"
        classNames={{
          table: "min-h",
        }}
      >
        <TableHeader className="">
          <TableColumn key="course_code" className="text-center">
            Course Code
          </TableColumn>
          <TableColumn key="course_name" className="text-center">
            Course Name
          </TableColumn>
          <TableColumn key="course_credit" className="text-center">
            Course Credit
          </TableColumn>
          <TableColumn key="syllabus" className="text-center">
            Syllabus
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={noDataMessage}
        >
          {(item) => (
            <TableRow key={item.course_code}>
              <TableCell>{item.course_code}</TableCell>
              <TableCell className="text-center">{item.course_name}</TableCell>
              <TableCell className="text-center">
                {item.course_credit}
              </TableCell>
              <TableCell>
                {item.syllabus ? (
                  <Link href={`/syllabus/courseSyllabus/${item.course_code}`}>
                    🔗 Link &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      size="xs"
                    />
                  </Link>
                ) : (
                  "No Syllabus Available"
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
