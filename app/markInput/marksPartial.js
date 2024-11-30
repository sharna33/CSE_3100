import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEdit,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    key: "student_roll",
    label: "ROLL",
  },
  {
    key: "ct_1",
    label: "CT 01",
  },
  {
    key: "ct_2",
    label: "CT 02",
  },
  {
    key: "ct_3",
    label: "CT 03",
  },
  {
    key: "ct_4",
    label: "CT 04",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const getKeyValue = (obj, key) => {
  return obj[key];
};

export function MarksPartial({ rows, course_id, fetchRows }) {
  const [editedRows, setEditedRows] = useState(rows);
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setEditedRows(rows);
  }, [rows]);

  const handleInputChange = (e, rowId, columnKey) => {
    const { value } = e.target;
    setEditedRows((prevRows) =>
      prevRows.map((row) =>
        row.ct_result_id === rowId ? { ...row, [columnKey]: value } : row
      )
    );
  };

  const handleSaveClick = async (row) => {
    try {
      const response = await fetch("/api/updateCTMarks", {
        method: "PUT",
        body: JSON.stringify({
          ctResultId: row.ct_result_id,
          ctMarks: {
            ct_1: row.ct_1,
            ct_2: row.ct_2,
            ct_3: row.ct_3,
            ct_4: row.ct_4,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.status === 200) {
        setMessage("CT Marks updated successfully.");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleResetCTMarks = async () => {
    setIsResetting(true);
    try {
      const response = await fetch("/api/resetCTMarks", {
        method: "POST",
        body: JSON.stringify({
          course_id: course_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.status === 200) {
        setMessage("CT Marks reset successfully.");
        await fetchRows(); // Fetch updated rows
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsResetting(false);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const noCTMarks = editedRows.every(
    (row) =>
      row.ct_1 === 0 && row.ct_2 === 0 && row.ct_3 === 0 && row.ct_4 === 0
  );

  return (
    <>
      <div className="flex justify-center mt-4">
        <Chip className="m-2 " color="success" variant="bordered" size="lg">
          Students Found: {rows.length}
        </Chip>
      </div>
      {message && (
        <div className="flex justify-center mt-4">
          <Chip
            className="mb-2"
            color={message.includes("Error") ? "danger" : "success"}
            variant="flat"
            size="lg"
            startContent={
              message.includes("Error") ? (
                <FontAwesomeIcon icon={faCircleXmark} />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} />
              )
            }
          >
            {message}
          </Chip>
        </div>
      )}
      {noCTMarks && (
        <div className="flex justify-center m-4">
          <Button
            color="warning"
            variant="flat"
            onClick={handleResetCTMarks}
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset CT Marks"}
          </Button>
        </div>
      )}
      <Table aria-label="Students CT Marks">
        <TableHeader columns={columns} align="center">
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={editedRows} align="center">
          {(item) => (
            <TableRow key={item.ct_result_id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "action" ? (
                    <Tooltip
                      showArrow
                      content="Save Changes"
                      delay={500}
                      closeDelay={250}
                    >
                      <Button
                        isIconOnly
                        color="warning"
                        variant="ghost"
                        className="text-center"
                        onClick={() => handleSaveClick(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="" />
                      </Button>
                    </Tooltip>
                  ) : column.key === "student_roll" ? (
                    getKeyValue(item, column.key)
                  ) : (
                    <Input
                      type="number"
                      name={column.key}
                      value={getKeyValue(item, column.key)}
                      className="text-center"
                      onChange={(e) =>
                        handleInputChange(e, item.ct_result_id, column.key)
                      }
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
