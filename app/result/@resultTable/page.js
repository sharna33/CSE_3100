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
  Chip,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function ResultTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");

  let list = useAsyncList({
    async load({ signal }) {
      try {
        let res = await fetch(`/api/ctResult`, {
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
      <h1 className="text-center p-4 text-3xl">CT Marks</h1>
      <Table
        aria-label="Current Semester CT Marks"
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
          <TableColumn key="ct_1" className="text-center">
            CT 01
          </TableColumn>
          <TableColumn key="ct_2" className="text-center">
            CT 02
          </TableColumn>
          <TableColumn key="ct_3" className="text-center">
            CT 03
          </TableColumn>
          <TableColumn key="ct_4" className="text-center">
            CT 04
          </TableColumn>
          <TableColumn key="avg" className="text-center">
            AVG
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
              <TableCell>{item.ct_1}</TableCell>
              <TableCell>{item.ct_2}</TableCell>
              <TableCell>{item.ct_3}</TableCell>
              <TableCell>{item.ct_4}</TableCell>
              <TableCell>
                <Chip
                  color={
                    item.bestThreeAvg >= 15
                      ? "success"
                      : item.bestThreeAvg >= 10
                      ? "warning"
                      : "danger"
                  }
                  variant="flat"
                >
                  {item.bestThreeAvg}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
