const db = require("@/config/db").default;

const updateDays = 7;

export async function getCTInfo(studentInfo) {
  const year = studentInfo.semester.year + "" + studentInfo.semester.semester;
  try {
    const [ctInfo] = await db.execute(
      `SELECT * FROM ct
      NATURAL JOIN courses
      WHERE section = ?
      AND department = ?
      AND time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
      AND course_code LIKE ?`,
      [
        studentInfo.section,
        studentInfo.department.department_id,
        updateDays,
        year + "__",
      ]
    );

    console.log("CT info", ctInfo);
    if (ctInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR);
    }

    return ctInfo;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCTNoteInfo(ctID) {
  try {
    const [ctNoteInfo] = await db.execute(
      `SELECT * FROM ct
      NATURAL JOIN courses
      WHERE ct_id = ?`,
      [ctID]
    );

    if (ctNoteInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR);
    }

    return ctNoteInfo[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllNoticeInfo(studentInfo) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM all_notice
      WHERE time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
      AND series=?`,
      [updateDays, studentInfo.series]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_NOTICE_ERROR);
    }

    return noticeInfo;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllNoteInfo(noticeID) {
  try {
    const [allNoteInfo] = await db.execute(
      `SELECT * FROM all_notice
      NATURAL JOIN courses
      WHERE notice_id = ?`,
      [noticeID]
    );

    if (allNoteInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR);
    }

    return allNoteInfo[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTeacherCTInfo(teacherID) {
  try {
    const [ctInfo] = await db.execute(
      `SELECT * FROM ct
      NATURAL JOIN courses
      NATURAL JOIN courses_teacher_relationship ctr
      INNER JOIN teachers ON ctr.teacher_id = teachers.teacher_id
      WHERE ctr.teacher_id = ?
      AND time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)`,
      [teacherID, updateDays]
    );

    if (ctInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return ctInfo;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTeacherCTNote(noticeID) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM ct
      NATURAL JOIN courses
      WHERE ct_id = ?`,
      [noticeID]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return noticeInfo[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTeacherALLNoticeInfo() {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM teacher_notice
      WHERE time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY)`,
      [updateDays]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_NOTICE_ERROR_TEACHER);
    }

    return noticeInfo;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTeacherALLNoteInfo(noticeID) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM teacher_notice
      WHERE notice_id = ?`,
      [noticeID]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return noticeInfo[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
