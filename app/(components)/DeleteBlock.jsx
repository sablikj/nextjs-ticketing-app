"use client"; // trying to use interactive component -> need client-side js

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`http://127.0.0.1:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
