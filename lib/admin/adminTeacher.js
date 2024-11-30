const db = require("@/config/db").default;

export async function getTeachers(page, limit) {
  const offset = (page - 1) * limit;
  try {
    const [rows, fields] = await db.execute(
      "SELECT \
      teacher_id, teacher_name, department_id, teacher_email, \
      department_id, dept_name, dept_short_name \
      FROM teachers NATURAL JOIN departments \
      order by teacher_name ASC \
      LIMIT ? OFFSET ?",
      [limit, offset]
    );
    const [countRows] = await db.execute(
      "SELECT COUNT(*) as count FROM teachers NATURAL JOIN departments"
    );
    const totalCount = countRows[0].count;
    return { rows, totalCount };
  } catch (error) {
    console.error("An error occurred while fetching teachers: ", error);
    return error;
  }
}

export async function updateTeacher(teacherId, teacherData) {
  try {
    const [rows] = await db.execute(
      `UPDATE teachers
      SET teacher_name = ?,
      teacher_email = ?,
      department_id = ?
      WHERE teacher_id = ?`,
      [
        teacherData.teacher_name,
        teacherData.teacher_email,
        teacherData.department_id,
        teacherId,
      ]
    );

    if (rows.affectedRows === 0) {
      return { error: "Teacher not found" };
    }

    return { success: true, affectedRows: rows.affectedRows };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { error: error.message };
  }
}

export async function deleteTeacherByID(teacherId) {
  try {
    // Check if teacher exists first
    const [checkRows] = await db.execute(
      "SELECT teacher_id FROM teachers WHERE teacher_id = ?",
      [teacherId]
    );

    if (checkRows.length === 0) {
      return { error: "Teacher not found" };
    }

    const [rows] = await db.execute(
      "DELETE FROM teachers WHERE teacher_id = ?",
      [teacherId]
    );

    return rows.affectedRows;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return { error: error.message };
  }
}
