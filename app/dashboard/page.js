import greetings from "@/lib/greetings";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DecodeToken } from "@/lib/decode_token";
import Link from "next/link";

export default async function DashBoard() {
  const payload = await DecodeToken();
  const greeting = await greetings();
  return (
    <>
      <div className="text-center m-6">
        <h1 className="text-3xl">{greeting}</h1>
        {payload.role == "teacher" && (
          <Button
            color="success"
            className="mt-6"
            variant="flat"
            startContent={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
          >
            <Link href={`/dashboard/addNotice`}>Add Notice</Link>
          </Button>
        )}
      </div>
    </>
  );
}
