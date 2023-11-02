import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get ticket");
  }

  return res.json();
};
let updateTicketData = {};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true; // /TicketPage/new -> creating ticket | /TicketPage/5fd54r68ve5 -> editing ticket

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
