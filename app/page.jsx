"use client";

import TicketCard from "./(components)/TicketCard";
import { useEffect, useState } from "react";

const getTickets = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Tickets`,
      {
        cache: "no-store",
      }
    );

    console.log("res", res);
    return res.json();
  } catch (error) {
    console.error("Failed to get tickets", error);
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();
      setTickets(data.tickets);
    };
    fetchData();
  }, []);

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              {/* Automatic card layout based on screen size*/}
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {/* Filtering tickets based on current unique category*/}
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
