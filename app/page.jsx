import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
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
