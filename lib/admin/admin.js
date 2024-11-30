const db = require("@/config/db").default;
import { convertToDateTime } from "@/middlewares/dateTimeFormatter";
import { decrypt, encrypt } from "@/middlewares/crypto";

export async function VerifyLogin(email, password) {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM admin WHERE admin_email = ?",
      [email]
    );
    if (rows.length > 0) {
      if (decrypt(rows[0].admin_password) === password) {
        return rows;
      } else {
        return "Invalid password";
      }
    } else {
      return "Admin not found";
    }
  } catch (error) {
    console.error("An error occurred while fetching admin: ", error);
    return error;
  }
}
