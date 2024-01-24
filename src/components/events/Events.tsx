import { Tag } from "antd";
import { EventsListing } from "./items/EventsListing";
import { useContext } from "react";
import { EventsContext } from "../../context/EventsContext";

export const Events = () => {
  const { cities, dateSpan } = useContext(EventsContext);
  return (
    <div className="events">
      <div className="events--tags">
        {cities.map((city, index) => (
          <Tag key={index} color="blue">{`${city.city} ,${city.country}`}</Tag>
        ))}
        <Tag color="magenta">{dateSpan}</Tag>
      </div>
      <h2>Public Events</h2>
      <EventsListing />
    </div>
  );
};
