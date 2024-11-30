const db = require("@/config/db").default;
import { decrypt, encrypt } from "@/middlewares/crypto";

export async function getTeachers() {
  const [rows, fields] = await db.execute("SELECT * FROM teachers");
  // console.log("T: ", rows);
  return rows;
}

export async function getStudents() {
  const [rows, fields] = await db.execute("SELECT * FROM students");
  return rows;
}

export async function getStudent(roll, password) {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM students WHERE student_roll = ?",
      [roll]
    );
    if (rows.length > 0) {
      // console.log("Password: ", encrypt(password));
      // console.log("Encrypted: ", encrypt("devMeek_007"));
      if (decrypt(rows[0].student_password) == password) {
        return rows;
      } else {
        return "Invalid password";
      }
    } else {
      return "Student not found";
    }
  } catch (error) {
    console.error("An error occurred while fetching student: ", error);
    return error;
  }
}

export async function getTeacher(email, password) {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM teachers WHERE teacher_email = ?",
      [email]
    );
    if (rows.length > 0) {
      if (decrypt(rows[0].teacher_password) === password) {
        return rows;
      } else {
        return "Invalid password";
      }
    } else {
      return "Teacher not found";
    }
  } catch (error) {
    console.error("An error occurred while fetching teacher: ", error);
    return error;
  }
}

export async function getDepartments() {
  const [rows, fields] = await db.execute("SELECT * FROM departments");
  return rows;
}

export async function getAllCourse() {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM courses GROUP BY course_code"
    );
    return rows;
  } catch (error) {
    console.error("An error occurred while fetching courses: ", error);
    throw new Error(error.message);
  }
}

export async function getTeacherCourses(teacher_id) {
  try {
    console.log("Teacher ID: ", teacher_id);
    const [rows, fields] = await db.execute(
      `SELECT * FROM courses
      NATURAL JOIN courses_teacher_relationship ctr
      WHERE ctr.teacher_id = ?`,
      [teacher_id]
    );
    return rows;
  } catch (error) {
    console.error("An error occurred while fetching teacher courses: ", error);
    throw new Error(error.message);
  }
}
