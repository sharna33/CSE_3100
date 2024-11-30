const db = require("@/config/db").default;

export async function getClassRoutine(studentInfo) {
  try {
    const semester = `${studentInfo.semester.year}${studentInfo.semester.semester}`;
    const [classRoutine] = await db.execute(
      `SELECT * FROM class_routine
      NATURAL JOIN class_routine_details
      NATURAL JOIN courses
      NATURAL JOIN courses_teacher_relationship ctr
      INNER JOIN weekday ON class_routine_details.weekday = weekday.day_id
      INNER JOIN teachers ON ctr.teacher_id = teachers.teacher_id
      WHERE section = ?
      AND department = ?
      AND yr_sem = ?
      ORDER BY class_routine_details.weekday ASC,
      class_routine_details.starting_time ASC,
      class_routine_details.ending_time ASC`,
      [studentInfo.section, studentInfo.department.department_id, semester]
    );

    let [classTimes] = await db.execute(`SELECT * FROM class_times`);
    const [weekdays] = await db.execute(`SELECT * FROM weekday`);

    classTimes.forEach((time) => {
      time.time = timeFormatter(time.time);
    });
    if (classRoutine.length === 0) {
      throw new Error(process.env.NO_CLASS_FOUND);
    }

    classRoutine.forEach((routine) => {
      routine.teacher_password = undefined;
    });

    return { classTimes, classRoutine, weekdays };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

function timeFormatter(time) {
  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
