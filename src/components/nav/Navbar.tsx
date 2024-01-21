import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { SearchInput } from "./items/SearchInput";
import { FilterMenu } from "../filtermenu/FilterMenu";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar--left">
        <SearchInput />
        <FilterMenu />
      </div>

      <div className="navbar--right">
        <ShoppingCart />
      </div>
    </div>
  );
};
