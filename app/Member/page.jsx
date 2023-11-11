import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member"); // if user is not logged in, redirect to login page
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="p-4 mb-8 text-center">Member Server Session</h1>
      <div className="p-2 border rounded-lg bg-card border-gray-700 shadow-lg w-1/6">
        <p className="text-lg">
          <b>Name: </b>
          {session?.user?.name}
        </p>
        <p className="text-lg">
          <b>Email:</b> {session?.user?.email}
        </p>
        <p className="text-lg">
          <b>Role:</b> {session?.user?.role}
        </p>
      </div>
    </div>
  );
};

export default Member;
