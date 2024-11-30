const db = require("@/config/db").default;

export async function CTMarksInputSearch(Department, Course, Section) {
  try {
    let [ctResults] = await db.execute(
      `SELECT *,
        SUBSTRING(student_roll, 3, 2) AS department,
        CASE
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 60 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 121 THEN 'B'
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 120 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 181 THEN 'C'
          ELSE 'A'
        END AS section
      FROM ct_result NATURAL JOIN courses
      WHERE SUBSTRING(student_roll, 3, 2) = ? AND course_code = ? AND
        CASE
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 60 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 121 THEN 'B'
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 120 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 181 THEN 'C'
          ELSE 'A'
        END = ?`,
      [Department, Course, Section]
    );
    console.log("CT Marks fetched successfully. Rows: ", ctResults.length);

    return ctResults;
  } catch (error) {
    console.log(error.message);
    throw new Error("CT Marks could not be fetched.");
  }
}

export async function CTMarksInputUpdate(ctResultId, ctMarks, course_teacher) {
  try {
    let [findTeachers] = await db.execute(
      `SELECT teacher_id
      FROM ct_result NATURAL JOIN courses NATURAL JOIN courses_teacher_relationship
      WHERE ct_result_id = ?`,
      [ctResultId]
    );
    const teacherIds = findTeachers.map((row) => row.teacher_id);
    if (!teacherIds.includes(course_teacher)) {
      throw new Error("You are not allowed to change this result.");
    }

    const marks = [ctMarks.ct_1, ctMarks.ct_2, ctMarks.ct_3, ctMarks.ct_4];
    if (marks.some((mark) => mark < 0 || mark > 20)) {
      throw new Error("Marks must be between 0 and 20.");
    }

    let [result] = await db.execute(
      `UPDATE ct_result
      SET ct_1 = ?, ct_2 = ?, ct_3 = ?, ct_4 = ?
      WHERE ct_result_id = ?`,
      [ctMarks.ct_1, ctMarks.ct_2, ctMarks.ct_3, ctMarks.ct_4, ctResultId]
    );
    console.log(
      "CT Marks updated successfully. Rows affected: ",
      result.affectedRows
    );

    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error(`CT Marks could not be updated. ${error.message}`);
  }
}

export async function CTMarksReset(course_id, teacher_id) {
  try {
    let [check_teacher] = await db.execute(
      `SELECT teacher_id
      FROM courses_teacher_relationship
      WHERE course_id = ? AND teacher_id = ?`,
      [course_id, teacher_id]
    );
    if (check_teacher.length === 0) {
      throw new Error("You are not allowed to reset this course's marks.");
    }

    let [result] = await db.execute(
      `
      INSERT IGNORE INTO ct_result (course_id, student_roll, ct_1, ct_2, ct_3, ct_4)
      SELECT
          c.course_id, s.student_roll, 0, 0, 0, 0
      FROM
          students s
      JOIN
          courses c
      ON
          c.department = CAST(SUBSTRING(s.student_roll, 3, 2) AS UNSIGNED)
          AND c.section = CASE
              WHEN CAST(SUBSTRING(s.student_roll, 5, 3) AS UNSIGNED) <= 60 THEN 'A'
              WHEN CAST(SUBSTRING(s.student_roll, 5, 3) AS UNSIGNED) <= 120 THEN 'B'
              ELSE 'C'
          END
          AND LEFT(c.course_code, 2) = CONCAT(
              YEAR(CURDATE()) - CAST(CONCAT('20', LEFT(s.student_roll, 2)) AS UNSIGNED) - 1,
              CASE WHEN MONTH(CURDATE()) < 7 THEN 1 ELSE 2 END
          )
      JOIN
          courses_teacher_relationship ctr
      ON
          ctr.course_id = c.course_id
      WHERE
          ctr.course_id = ?
          AND ctr.teacher_id = ?
          AND NOT EXISTS (
              SELECT 1
              FROM ct_result cr
              WHERE cr.course_id = c.course_id
              AND cr.student_roll = s.student_roll
          );
      `,
      [course_id, teacher_id]
    );
    console.log(
      "CT Marks reset successfully. Rows affected: ",
      result.affectedRows
    );

    return result;
  } catch (error) {
    console.log(error.message);
    throw new Error(`CT Marks could not be reset. ${error.message}`);
  }
}
