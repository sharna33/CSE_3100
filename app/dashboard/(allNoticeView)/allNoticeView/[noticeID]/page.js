import CustomModal from "@/components/modal";
import { getAllNoteInfo, getTeacherALLNoteInfo } from "@/lib/getNoticeInfo";
import { DecodeToken } from "@/lib/decode_token";

export default async function allMainNoticeView({ params }) {
  const payload = await DecodeToken();
  let noticeNote;

  if (payload.role === "student") {
    noticeNote = await getAllNoteInfo(params.noticeID);
  } else {
    noticeNote = await getTeacherALLNoteInfo(params.noticeID);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <CustomModal
          title={`${noticeNote.notice_title} | ${noticeNote.notice_creator}`}
          time={noticeNote.time}
          data={noticeNote.notice}
        />
      </div>
    </div>
  );
}
