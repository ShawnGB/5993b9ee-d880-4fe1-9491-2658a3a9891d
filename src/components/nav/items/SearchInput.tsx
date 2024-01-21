import { useContext } from "react";
import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { EventsContext } from "../../../context/EventsContext";

export const SearchInput = () => {
  const { setSearchQuery } = useContext(EventsContext);

  return (
    <Input
      placeholder="...Search"
      prefix={<SearchOutlined />}
      size="small"
      className="navbar--search"
      onChange={(e) => setSearchQuery(e.target.value)}
      allowClear={<CloseOutlined />}
    />
  );
};
