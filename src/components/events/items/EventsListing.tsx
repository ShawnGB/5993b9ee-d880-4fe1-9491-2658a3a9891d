import React, { useEffect, useContext, useRef } from "react";
import { EventCard } from "./eventCard";
import { EventsContext } from "../../../context/EventsContext";
import { Empty } from "antd";
import moment from "moment";

export const EventsListing = () => {
  const { events } = useContext(EventsContext);
  const previousDateRef = useRef(null);

  useEffect(() => {
    // Update the previous date when the events change
    if (events && events.length > 0) {
      previousDateRef.current = events[0].date;
    }
  }, [events]);

  return (
    <div className="events--listing">
      {events ? (
        events.map((event, index) => {
          const formattedDate = moment(event.date).format("DD.MM.YYYY");

          // Update previousDateRef if the comparison fails
          if (event.date !== previousDateRef.current) {
            previousDateRef.current = event.date;
          }

          return (
            <React.Fragment key={index}>
              {event.date !== previousDateRef.current && (
                <div className="events--stickyDate">
                  <div>{formattedDate}</div>
                </div>
              )}
              <EventCard {...event} />
            </React.Fragment>
          );
        })
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No events in your Area, pls adjust your expectations :)"
        />
      )}
    </div>
  );
};
