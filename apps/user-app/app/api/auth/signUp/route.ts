import { prisma } from "@repo/db/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "../../../../lib/zod/validation";
export async function POST(req: NextRequest) {
  try {
    const { name, email, number, password } = await req.json();
    const obj = { phone: number, password, name, email };
    const result = signUpSchema.safeParse(obj);
    if (!result.success) {
      console.log("zod error");
      return NextResponse.json({ msg: "error" }, { status: 400 });
    } else {
      const hp = await hash(password, 10);
      await prisma.user.create({
        data: {
          email: email,
          name: name,
          number: number,
          password: hp,
        },
      });
      return NextResponse.json({ msg: "success" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "server error" }, { status: 500 });
  }
}
