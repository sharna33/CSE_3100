const db = require("@/config/db").default;

export async function setTeachers(
  teacher_name,
  department_id,
  teacher_email,
  teacher_password
) {
  try {
    // Check if department_id exists
    const [departments] = await db.execute(
      "SELECT department_id FROM departments WHERE department_id = ?",
      [department_id]
    );

    if (departments.length === 0) {
      console.error("Invalid department_id: ", department_id);
      return { error: "Invalid department_id" };
    }

    // Proceed with inserting the teacher
    const [result] = await db.execute(
      "INSERT INTO teachers (teacher_name, department_id, teacher_email, teacher_password) VALUES (?, ?, ?, ?)",
      [teacher_name, department_id, teacher_email, teacher_password]
    );

    return result;
  } catch (err) {
    console.error("An error occurred while inserting teacher: ", err);
    throw new Error(err.message);
  }
}

export async function setStudents(
  student_roll,
  student_name,
  student_email,
  student_password
) {
  try {
    const [result] = await db.execute(
      "INSERT INTO students (student_roll, student_name, student_email, student_password) VALUES (?, ?, ?, ?)",
      [student_roll, student_name, student_email, student_password]
    );

    return result;
  } catch (err) {
    console.error("An error occurred while inserting student: ", err);
    throw new Error(err.message);
  }
}
