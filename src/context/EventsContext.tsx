import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { message } from "antd";
import moment from "moment";

type EventsContextValues = {
  events: EventType[];
  shoppingCartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string, title: string) => void;
  setSearchQuery: (query: string) => void;
  cities: CityType[];
  dateSpan: string;
};

// Should be in .env
const API_URL = "https://teclead-ventures.github.io/data/london-events.json";

const defaultValues: EventsContextValues = {
  events: [],
  shoppingCartItems: [],
  addItem: () => {},
  removeItem: () => {},
  setSearchQuery: () => {},
  cities: [],
  dateSpan: "",
};

const EventsContext = createContext(defaultValues);

const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [events, setEvents] = useState<EventType[]>([]);
  const [shoppingCartItems, setShoppingCartItems] = useState<CartItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getEvents = async () => {
    try {
      const { data } = await axios.get(API_URL);

      const sortedEvents = data.sort(
        (a: EventType, b: EventType) =>
          moment(a.date).valueOf() - moment(b.date).valueOf(),
      );

      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (events && shoppingCartItems) {
      const filtered =
        shoppingCartItems.length > 0
          ? events.filter(
              (event) =>
                !shoppingCartItems.some((item) => item._id === event._id),
            )
          : events;

      setFilteredEvents(filtered);
    }
  }, [events, shoppingCartItems]);

  const addItem = (item: CartItem) => {
    setShoppingCartItems((prev) => [...prev, item]);
    messageApi.open({
      type: "success",
      content: `${item.title} added to shopping cart`,
    });
  };

  const removeItem = (_id: string, title: string) => {
    setShoppingCartItems((prev) => prev.filter((item) => item._id !== _id));
    messageApi.open({
      type: "warning",
      content: `${title} removed from shopping cart`,
    });
  };

  const filterByTitle = (query?: string) => {
    if (query) {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEvents(filtered);
      setSearchQuery(query);
    } else {
      setFilteredEvents(events);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    filterByTitle(searchQuery);
  }, [searchQuery]);

  // extract further variables from data that might be useful for future filtres
  const [cities, setCities] = useState<CityType>([]);

  useEffect(() => {
    const uniqueCombinations = new Set<string>();

    const uniqueCitiesArray = Array.from(
      new Set(
        events
          .map((event) => {
            const combinationKey = `${event.city}-${event.country}`;

            if (!uniqueCombinations.has(combinationKey)) {
              uniqueCombinations.add(combinationKey);
              return { city: event.city, country: event.country };
            }

            return null;
          })
          .filter(Boolean),
      ),
    );

    setCities(uniqueCitiesArray);
  }, [events]);

  const [dateSpan, setDateSpan] = useState<string>("");

  useEffect(() => {
    if (events.length > 0) {
      const startDate = moment(events[0].date).format("DD.MM.YYYY");
      const endDate = moment(events[events.length - 1].date).format(
        "DD.MM.YYYY",
      );
      setDateSpan(`${startDate} - ${endDate}`);
    }
  }, [events]);

  return (
    <>
      {contextHolder}
      <EventsContext.Provider
        value={{
          events: filteredEvents,
          shoppingCartItems,
          addItem,
          removeItem,
          setSearchQuery,
          cities,
          dateSpan,
        }}
      >
        {children}
      </EventsContext.Provider>
    </>
  );
};

export { EventsContext, EventsContextProvider };
