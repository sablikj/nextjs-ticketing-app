import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;
    console.log(userData);
    // Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All field are required." },
        { status: 400 }
      );
    }

    // Check for duplicate emails
    userData.email = userData.email.toLowerCase();
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  }
}
