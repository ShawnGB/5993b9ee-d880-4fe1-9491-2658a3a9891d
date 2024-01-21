import { FilterOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export const FilterMenu = () => {
  return (
    <Tooltip title="Apply more filters">
      <Button shape="circle" size="small">
        <FilterOutlined />
      </Button>
    </Tooltip>
  );
};
