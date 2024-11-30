import CustomModal from "@/components/modal";
import { getCTNoteInfo, getTeacherCTNote } from "@/lib/getNoticeInfo";
import { DecodeToken } from "@/lib/decode_token";

export default async function NoticeView({ params }) {
  const payload = await DecodeToken();

  let ctNote;

  if (payload.role === "student") {
    ctNote = await getCTNoteInfo(params.noticeID);
  } else {
    ctNote = await getTeacherCTNote(params.noticeID);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <CustomModal
          title={`${ctNote.course_code} - ${ctNote.course_name}`}
          time={ctNote.time}
          data={ctNote.note}
        />
      </div>
    </div>
  );
}
