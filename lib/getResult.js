const db = require("@/config/db").default;

export async function getResultOfStudent(studentInfo) {
  try {
    const studPersonalInfo = studentInfo.studentInfo;
    const department = studentInfo.department;
    const currSemester =
      studentInfo.semester.year + "" + studentInfo.semester.semester + "__";

    const [result] = await db.execute(
      `SELECT * FROM ct_result
      NATURAL JOIN courses
      WHERE student_roll = ?
      AND department = ?
      AND section = ?
      AND course_code LIKE ?`,
      [
        studPersonalInfo.student_roll,
        department.department_id,
        studentInfo.section,
        currSemester,
      ]
    );

    if (result.length === 0) {
      throw new Error(process.env.NO_CT_RESULT_FOUND);
    }

    result.forEach((course) => {
      const ctScores = [course.ct_1, course.ct_2, course.ct_3, course.ct_4];
      const bestThreeScores = ctScores.sort((a, b) => b - a).slice(0, 3);
      const bestThreeAvg =
        bestThreeScores.reduce((a, b) => a + b, 0) / bestThreeScores.length;
      course.bestThreeAvg = parseFloat(bestThreeAvg.toFixed(1));
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
