import CustomModalSyllabus from "@/components/syllabusModal";
import { getStudentCourseSyllabus, getCourseSyllabus } from "@/lib/getCourseSyllabus";
import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";

export default async function CourseSyllabus({ params }) {
  const payload = await DecodeToken();
  const studentInfo = await getRollInfo(payload.roll);

  const courseSyllabus = await getCourseSyllabus(params.courseCode, studentInfo);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <CustomModalSyllabus
          title={`${courseSyllabus.course_code} - ${courseSyllabus.course_name}`}
          credit={courseSyllabus.course_credit}
          syllabus={courseSyllabus.syllabus}
        />
      </div>
    </div>
  );
}
