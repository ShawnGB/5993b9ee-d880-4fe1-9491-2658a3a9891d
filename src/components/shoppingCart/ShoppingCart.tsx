import { useContext, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ShoppingCartItem } from "./items/ShoppingCartItem";
import { Empty, Tooltip, Badge, Button, Drawer } from "antd";
import { EventsContext } from "../../context/EventsContext";

export const ShoppingCart = () => {
  const { shoppingCartItems } = useContext(EventsContext);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const triggerDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <>
      <Tooltip title="My shopping cart">
        <Badge count={shoppingCartItems?.length} size="small" color="pink">
          <Button
            shape="circle"
            size="small"
            icon={<ShoppingCartOutlined />}
            onClick={triggerDrawer}
          />
        </Badge>
      </Tooltip>

      <Drawer title="My Events" open={showDrawer} onClose={triggerDrawer}>
        {shoppingCartItems.length > 0 ? (
          shoppingCartItems.map((item, index) => (
            <ShoppingCartItem key={index} {...item} />
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You have not selected any events"
          />
        )}
      </Drawer>
    </>
  );
};
