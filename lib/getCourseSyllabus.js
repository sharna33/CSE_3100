const db = require("@/config/db").default;

export async function getStudentCourseSyllabus(studentInfo) {
  const year = studentInfo.semester.year + "" + studentInfo.semester.semester;
  try {
    const [courseSyllabus] = await db.execute(
      `SELECT * FROM courses
      WHERE section = ?
      AND department = ?
      AND course_code LIKE "${year}__"`,
      [studentInfo.section, studentInfo.department.department_id]
    );

    if (courseSyllabus.length === 0) {
      throw new Error(process.env.NO_COURSE_FOUND);
    }

    return courseSyllabus;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCourseSyllabus(courseCode, studentInfo) {
  try {
    // console.log(courseCode, studentInfo);
    const [courseSyllabus] = await db.execute(
      `SELECT * FROM courses
      WHERE section = ?
      AND department = ?
      AND course_code = ?`,
      [studentInfo.section, studentInfo.department.department_id, courseCode]
    );

    if (courseSyllabus.length === 0) {
      throw new Error(process.env.NO_COURSE_FOUND);
    }

    return courseSyllabus[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
