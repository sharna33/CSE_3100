"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import ModalTabs from "@/components/addNoticeModal/modalTabs";

const noticeConfigs = {
  ctNotice: {
    fields: [
      { name: "course_id", label: "Course ID", type: "select", required: true },
      { name: "section", label: "Section", type: "text", required: true },
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
      },
      { name: "time", label: "Time", type: "date", required: true },
      { name: "note", label: "Note", type: "textarea", required: true },
    ],
    handleSubmit: async (event, setMessage) => {
      event.preventDefault();
      const noticeData = {
        course_id: event.target.course_id.value,
        section: event.target.section.value,
        department: event.target.department.value,
        time: event.target.time.value,
        note: event.target.note.value,
      };
      try {
        const response = await fetch("/api/addNotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "ctNotice", data: noticeData }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage({
            type: "error",
            text: "Error: " + errorData.message,
          });
          return;
        }

        const result = await response.json();
        setMessage({ type: "success", text: result.message });
      } catch (error) {
        setMessage({ type: "error", text: "Error: " + error.message });
      }
    },
  },
  studentNotice: {
    fields: [
      {
        name: "notice_creator",
        label: "Notice Creator",
        type: "text",
        required: false,
      },
      {
        name: "notice_title",
        label: "Notice Title",
        type: "text",
        required: true,
      },
      { name: "notice", label: "Notice", type: "textarea", required: true },
      { name: "time", label: "Time", type: "date", required: true },
      {
        name: "series",
        label: "Series",
        type: "number",
        placeholder: "20 or 21 or 22 ...",
        required: true,
      },
      {
        name: "section",
        label: "Section",
        type: "text",
        placeholder: "A or B or C ...",
        required: true,
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
      },
    ],
    handleSubmit: async (event, setMessage) => {
      event.preventDefault();
      const noticeData = {
        notice_creator: event.target.notice_creator.value,
        notice_title: event.target.notice_title.value,
        notice: event.target.notice.value,
        time: event.target.time.value,
        series: event.target.series.value,
        section: event.target.section.value,
        department: event.target.department.value,
      };
      try {
        const response = await fetch("/api/addNotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "studentNotice", data: noticeData }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setMessage({
            type: "error",
            text: "Error: " + errorData.message,
          });
          return;
        }

        const result = await response.json();
        setMessage({ type: "success", text: result.message });
      } catch (error) {
        setMessage({ type: "error", text: "Error: " + error.message });
      }
    },
  },
  teachersNotice: {
    fields: [
      {
        name: "notice_creator",
        label: "Notice Creator",
        type: "text",
        required: false,
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
      },
      { name: "time", label: "Time", type: "date", required: true },
      {
        name: "notice_title",
        label: "Notice Title",
        type: "text",
        required: true,
      },
      { name: "notice", label: "Notice", type: "textarea", required: true },
    ],
    handleSubmit: async (event, setMessage) => {
      event.preventDefault();
      const noticeData = {
        notice_creator: event.target.notice_creator.value,
        department: event.target.department.value,
        time: event.target.time.value,
        notice_title: event.target.notice_title.value,
        notice: event.target.notice.value,
      };
      try {
        const response = await fetch("/api/addNotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "teacherNotice", data: noticeData }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMessage({
            type: "error",
            text: "Error: " + errorData.message,
          });
          return;
        }

        const result = await response.json();
        setMessage({ type: "success", text: result.message });
      } catch (error) {
        setMessage({ type: "error", text: "Error: " + error.message });
      }
    },
  },
};

export default function AddNoticeModal({
  title,
  courses,
  departments,
  notice_creator,
  notice_creator_name,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center">
          <p className="text-sky-500">{title}</p>
        </ModalHeader>
        <ModalBody>
          {message && (
            <Chip
              className="mb-4 p-2 text-center"
              color={message.type === "success" ? "success" : "danger"}
            >
              {message.text}
            </Chip>
          )}
          <ModalTabs
            noticeConfigs={noticeConfigs}
            setMessage={setMessage}
            courses={courses}
            departments={departments}
            notice_creator={notice_creator}
            notice_creator_name={notice_creator_name}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
