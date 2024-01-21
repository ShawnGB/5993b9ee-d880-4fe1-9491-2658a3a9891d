type Artist = {
  id: string;
  name: string;
  _id: {
    $oid: string;
  };
};

type Venue = {
  id: string;
  name: string;
  contentUrl?: string;
  live: boolean;
  direction: string;
};

type EventType = {
  _id: string;
  title: string;
  flyerFront?: string;
  attending: number;
  date: string;
  startTime: string;
  endTime: string;
  contentUrl: string;
  venue: Venue;
  artists: Artist[];
  city: string;
  country: string;
  private: boolean;
  __v: number;
};

type CartItem = {
  _id: string;
  title: string;
  flyerFront?: string;
  date: string;
};
