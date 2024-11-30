"use client";
import React, { useState, useEffect } from "react";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import useSWR from "swr";
import { Pencil, Trash2, CircleCheck, CircleX } from "lucide-react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TeacherPage() {
  const [page, setPage] = useState(1);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [departments, setDepartments] = useState([]);

  const rowsPerPage = 20;
  const { data, isLoading, mutate } = useSWR(
    `/admin/api/getTeachers?page=${page}&limit=${rowsPerPage}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const pages = React.useMemo(() => {
    return data?.totalCount ? Math.ceil(data.totalCount / rowsPerPage) : 0;
  }, [data?.totalCount, rowsPerPage]);

  const loadingState =
    isLoading || data?.data.length === 0 ? "loading" : "idle";

  useEffect(() => {
    if (editingTeacher) {
      fetch("/api/getDeptInfo")
        .then((res) => res.json())
        .then((data) => setDepartments(data))
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, [editingTeacher]);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `/admin/api/editTeacherInfo/${editingTeacher.teacher_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingTeacher),
        }
      );

      if (response.ok) {
        mutate();
        setEditingTeacher(null);
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleCancel = () => {
    setEditingTeacher(null);
  };

  const handleDelete = async (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        const response = await fetch(`/admin/api/deleteTeacher/${teacherId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          mutate(); // Refresh the data
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Table
        aria-label="Teacher Table with Pagination"
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
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>DEPARTMENT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data.map((item) => (
            <TableRow key={item.teacher_id}>
              <TableCell>{item.teacher_id}</TableCell>
              <TableCell>
                {editingTeacher?.teacher_id === item.teacher_id ? (
                  <Input
                    value={editingTeacher.teacher_name}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        teacher_name: e.target.value,
                      })
                    }
                    size="sm"
                  />
                ) : (
                  item.teacher_name
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.teacher_id === item.teacher_id ? (
                  <Input
                    value={editingTeacher.teacher_email}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        teacher_email: e.target.value,
                      })
                    }
                    size="sm"
                  />
                ) : (
                  item.teacher_email
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.teacher_id === item.teacher_id ? (
                  <Select
                    selectedKeys={[editingTeacher.department_id?.toString()]}
                    onChange={(e) =>
                      setEditingTeacher({
                        ...editingTeacher,
                        department_id: parseInt(e.target.value),
                      })
                    }
                    size="sm"
                  >
                    {departments?.data?.map((dept) => (
                      <SelectItem
                        key={dept.department_id}
                        value={dept.department_id}
                      >
                        {dept.dept_short_name}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  item.dept_short_name
                )}
              </TableCell>
              <TableCell>
                {editingTeacher?.teacher_id === item.teacher_id ? (
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
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        className="ml-4"
                        onClick={handleCancel}
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
                    <Tooltip content="Delete Teacher" color="danger" showArrow>
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        className="ml-4"
                        onClick={() => handleDelete(item.teacher_id)}
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
