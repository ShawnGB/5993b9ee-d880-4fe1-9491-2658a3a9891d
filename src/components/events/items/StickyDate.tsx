import { useContext, useEffect, useRef, useState } from "react";
import { EventsContext } from "../../../context/EventsContext";
import moment from "moment";

const StickyDate = () => {
  const { events } = useContext(EventsContext);
  const [topEventIndex, setTopEventIndex] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTopEventIndex(
          parseInt(entry.target.getAttribute("data-index") || "0", 10),
        );
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust as needed
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (events && events.length > 0) {
      eventRefs.current = Array.from(
        { length: events.length },
        (_, i) => eventRefs.current[i] || null,
      );
    }
  }, [events]);

  useEffect(() => {
    eventRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.current?.observe(ref);
        ref.setAttribute("data-index", index.toString());
      }
    });

    return () => {
      eventRefs.current.forEach((ref) => {
        if (ref) {
          observer.current?.unobserve(ref);
        }
      });
    };
  }, [events, observer]);

  const displayedDate =
    events.length > 0
      ? moment(events[topEventIndex].date).format("DD.MM.YYYY")
      : "";

  return (
    <div className="events--stickyDate">
      {displayedDate && <div>{displayedDate}</div>}
    </div>
  );
};

export default StickyDate;
