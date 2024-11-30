const db = require("@/config/db").default;

export async function getStudents(page, limit) {
  const offset = (page - 1) * limit;
  try {
    const [rows] = await db.execute(
      `SELECT s.*, d.dept_short_name
       FROM students s
       JOIN departments d ON SUBSTRING(s.student_roll, 3, 2) = d.department_id
       ORDER BY s.student_roll ASC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [countRows] = await db.execute(
      "SELECT COUNT(*) as count FROM students"
    );
    return { rows: rows, totalCount: countRows[0].count };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { error: error.message };
  }
}

export async function updateStudent(studentRoll, studentData) {
  try {
    const [rows] = await db.execute(
      `UPDATE students
       SET student_name = ?,
           student_email = ?
       WHERE student_roll = ?`,
      [studentData.student_name, studentData.student_email, studentRoll]
    );
    return rows.affectedRows > 0
      ? { success: true }
      : { error: "Student not found" };
  } catch (error) {
    console.error("Error updating student:", error);
    return { error: error.message };
  }
}

export async function deleteStudent(studentRoll) {
  try {
    const [rows] = await db.execute(
      "DELETE FROM students WHERE student_roll = ?",
      [studentRoll]
    );
    return rows.affectedRows > 0
      ? { success: true }
      : { error: "Student not found" };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { error: error.message };
  }
}
