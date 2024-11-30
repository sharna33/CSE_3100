import { parse } from "cookie";
const db = require("@/config/db").default;

export default async function getRollInfo(roll) {
  roll = roll.toString();
  if (roll.length !== 7) {
    return "Invalid Roll";
  }

  const _series = roll.slice(0, 2);
  const _dept = roll.slice(2, 4);
  const _rollNo = parseInt(roll.slice(4, 7), 10);
  let section = "A";
  if (_rollNo > 60 && _rollNo < 121) {
    section = "B";
  } else if (_rollNo > 120 && _rollNo < 181) {
    section = "C";
  }

  try {
    const [dept] = await db.execute(
      "SELECT * FROM departments WHERE `department_id` = ?",
      [_dept]
    );

    if (dept.length === 0) {
      throw new Error("Department not found");
    }

    const [studentInfo] = await db.execute(
      "SELECT * FROM students WHERE `student_roll` = ?",
      [roll]
    );

    if (studentInfo.length === 0) {
      throw new Error("Invalid Roll");
    }

    delete studentInfo[0].student_password;

    const semYear = new Date().getFullYear() - parseInt(`20${_series}`, 10) - 1;
    const semNumber = new Date().getMonth() + 1 < 7 ? 1 : 2;

    return {
      series: _series,
      department: dept[0],
      shortRoll: _rollNo,
      studentInfo: studentInfo[0],
      semester: {
        year: semYear,
        semester: semNumber,
      },
      section: section,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
