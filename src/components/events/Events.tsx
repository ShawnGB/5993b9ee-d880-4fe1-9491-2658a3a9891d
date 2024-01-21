import { Tag } from "antd";
import { EventsListing } from "./items/EventsListing";

export const Events = () => {
  return (
    <div className="events">
      <div className="events--tags">
        <Tag color="magenta">magenta</Tag> <Tag color="magenta">magenta</Tag>
      </div>
      <h2>Public Events</h2>
      <EventsListing />
    </div>
  );
};
