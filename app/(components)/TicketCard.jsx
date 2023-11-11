import React from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";
import { useSession } from "next-auth/react";

const TicketCard = ({ ticket }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return;
    },
  });
  const isAdmin = session?.user?.role === "admin";

  const formatTimestamp = (timestamp) => {
    const option = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("cz-CS", option);

    return formattedDate;
  };

  return (
    <div
      className={`${
        isAdmin
          ? "flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2"
          : "flex flex-col bg-card  rounded-md shadow-lg p-3 m-2"
      }`}
    >
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        {isAdmin ? (
          <div className="ml-auto">
            {/* ml-auto | pushes DeleteBlock to the right */}
            <DeleteBlock id={ticket._id} />
          </div>
        ) : (
          ""
        )}
      </div>

      <Link
        className={`${isAdmin ? "cursor-pointer" : "pointer-events-none"}`}
        href={`/TicketPage/${ticket._id}`}
        style={{ display: "contents" }}
      >
        {/* style={{ display: "contents" }} | makes CSS ignore the Link */}
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="white-space-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>{" "}
        {/* flex-grow | makes all cards same size */}
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatTimestamp(ticket.createdAt)}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
