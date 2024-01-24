import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { message } from "antd";

type EventsContextValues = {
  events: EventType[];
  shoppingCartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string, title: string) => void;
  setSearchQuery: (query: string) => void;
};

// Should be in .env
const API_URL = "https://teclead-ventures.github.io/data/london-events.json";

const defaultValues: EventsContextValues = {
  events: [],
  shoppingCartItems: [],
  addItem: () => {},
  removeItem: () => {},
  setSearchQuery: () => {},
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
      setEvents(data);
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
        }}
      >
        {children}
      </EventsContext.Provider>
    </>
  );
};

export { EventsContext, EventsContextProvider };
