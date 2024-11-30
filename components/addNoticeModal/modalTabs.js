import { Tabs, Tab } from "@nextui-org/react";
import NoticeForm from "./NoticeForm";

export default function ModalTabs({
  noticeConfigs,
  setMessage,
  courses,
  departments,
  notice_creator,
  notice_creator_name,
}) {
  return (
    <Tabs aria-label="Options" variant="bordered" color="primary" radius="sm">
      {Object.entries(noticeConfigs).map(([key, config]) => (
        <Tab key={key} title={key.replace(/([A-Z])/g, " $1").trim()}>
          <NoticeForm
            onSubmit={config.handleSubmit}
            fields={config.fields}
            setMessage={setMessage}
            courses={courses}
            departments={departments}
            notice_creator={notice_creator}
            notice_creator_name={notice_creator_name}
          />
        </Tab>
      ))}
    </Tabs>
  );
}
