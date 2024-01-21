import { Events } from "./components/events/Events";
import { Navbar } from "./components/nav/Navbar";
import { EventsContextProvider } from "./context/EventsContext";

function App() {
  return (
    <EventsContextProvider>
      <Navbar />
      <Events />
    </EventsContextProvider>
  );
}

export default App;
