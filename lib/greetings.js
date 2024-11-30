const db = require("@/config/db").default;
import { DecodeToken } from "@/lib/decode_token";

export default async function greetings() {
  const payload = await DecodeToken();
  if (!payload) {
    return "Unauthorized";
  }
  const for_teacher = payload.role === "teacher" ? 1 : 0;

  try {
    const [greetings] = await db.execute(
      "SELECT * FROM greetings WHERE for_teachers = ?",
      [for_teacher]
    );

    if (greetings.length === 0) {
      throw new Error("No greetings found");
    }

    // send a random one from the greetings
    const randomIndex = Math.floor(Math.random() * greetings.length);
    // console.log("Random index: ", randomIndex, greetings[randomIndex].text);
    return greetings[randomIndex].text;
  } catch (error) {
    throw new Error(error.message);
  }
}
