import { useContext, useEffect, useState } from "react";
import { EventCard } from "./eventCard";
import { EventsContext } from "../../../context/EventsContext";
import { Empty } from "antd";
import moment from "moment";

export const EventsListing = () => {
  const { events } = useContext(EventsContext);
  const [stickyDate, setStickyDate] = useState(moment().format("DD.MM.YYYY"));

  useEffect(() => {
    const targetElements = document.querySelectorAll("div.events--card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardData = JSON.parse(
            entry.target.getAttribute("data-card") as string,
          );
          setStickyDate(moment(cardData.date).format("DD.MM.YYYY"));
        }
      });
    });

    targetElements.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [events]);

  return (
    <div className="events--listing">
      {events.length > 0 ? (
        <>
          <div className="events--stickyDate">
            <div>{stickyDate}</div>
          </div>
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No events in your Area, pls adjust your expectations :)"
        />
      )}
    </div>
  );
};
