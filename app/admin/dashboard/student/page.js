"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Tooltip,
  Input,
} from "@nextui-org/react";
import useSWR from "swr";
import { Pencil, Trash2, CircleCheck, CircleX } from "lucide-react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function StudentPage() {
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const rowsPerPage = 20;

  const { data, isLoading, mutate } = useSWR(
    `/admin/api/getStudents?page=${page}&limit=${rowsPerPage}`,
    fetcher,
    { keepPreviousData: true }
  );

  const pages = React.useMemo(() => {
    return data?.totalCount ? Math.ceil(data.totalCount / rowsPerPage) : 0;
  }, [data?.totalCount, rowsPerPage]);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `/admin/api/editStudentInfo/${editingStudent.student_roll}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingStudent),
        }
      );

      if (response.ok) {
        mutate();
        setEditingStudent(null);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (studentRoll) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(
          `/admin/api/deleteStudent/${studentRoll}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) mutate();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Table
        aria-label="Student Table"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>ROLL</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>DEPARTMENT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data.map((item) => (
            <TableRow key={item.student_roll}>
              <TableCell>{item.student_roll}</TableCell>
              <TableCell>
                {editingStudent?.student_roll === item.student_roll ? (
                  <Input
                    value={editingStudent.student_name}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        student_name: e.target.value,
                      })
                    }
                    size="sm"
                  />
                ) : (
                  item.student_name
                )}
              </TableCell>
              <TableCell>
                {editingStudent?.student_roll === item.student_roll ? (
                  <Input
                    value={editingStudent.student_email}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        student_email: e.target.value,
                      })
                    }
                    size="sm"
                  />
                ) : (
                  item.student_email
                )}
              </TableCell>
              <TableCell>{item.dept_short_name}</TableCell>
              <TableCell>
                {editingStudent?.student_roll === item.student_roll ? (
                  <div className="flex gap-2">
                    <Tooltip content="Save Changes" color="success" showArrow>
                      <Button
                        size="sm"
                        isIconOnly
                        variant="flat"
                        color="success"
                        onClick={handleSave}
                      >
                        <CircleCheck size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Cancel" color="danger" showArrow>
                      <Button
                        size="sm"
                        isIconOnly
                        variant="flat"
                        color="danger"
                        onClick={() => setEditingStudent(null)}
                      >
                        <CircleX size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <>
                    <Tooltip content="Edit Info" color="warning" showArrow>
                      <Button
                        isIconOnly
                        variant="light"
                        color="warning"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete Student" color="danger" showArrow>
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        className="ml-4"
                        onClick={() => handleDelete(item.student_roll)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
