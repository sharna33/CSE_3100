import AddNoticeModal from "@/components/addNoticeModal/addNoticeModal";
import { DecodeToken } from "@/lib/decode_token";
import { getTeacherCourses, getDepartments } from "@/lib/getInfo";

export default async function addNoticeMainView() {
  const payload = await DecodeToken();
  const courses = await getTeacherCourses(payload.id);
  const departments = await getDepartments();

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <AddNoticeModal
          title={"Add New Notice"}
          courses={courses}
          departments={departments}
          notice_creator={payload.id}
          notice_creator_name={payload.name}
        />
      </div>
    </div>
  );
}
