import Image from "next/image";
import { getTeachers, getStudents } from "@/lib/getInfo";

export default async function Home() {
  const [teachers, students] = await Promise.all([
    getTeachers(),
    getStudents(),
  ]);
  return (
    <>
      <h1 className="text-center">Welcome to RUET</h1>
      {teachers.map((teacher) => (
        <div key={teacher.teacher_id}>
          <h2>{teacher.teacher_name}</h2>
          <p>{teacher.teacher_email}</p>
        </div>
      ))}
    </>
  );
}
