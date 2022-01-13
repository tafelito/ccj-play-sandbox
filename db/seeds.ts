// import db from "./index"

import { SecurePassword } from "blitz";
import db from "db";

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PWD = "123";

const seed = async () => {
  if (
    !(await db.user.findUnique({
      where: {
        email: ADMIN_EMAIL
      }
    }))
  ) {
    const hashedPassword = await SecurePassword.hash(ADMIN_PWD);
    await db.user.create({
      data: { email: ADMIN_EMAIL, hashedPassword, role: "ADMIN" },
      select: { id: true, name: true, email: true, role: true }
    });
  }
};

export default seed;
