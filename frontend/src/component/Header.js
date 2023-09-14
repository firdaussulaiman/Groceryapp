import React from "react";
import { useState } from "react";
import Logo from "../LogoPic/Logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";

//routes
import ShoppingCart from "../page/ShoppingCart";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleshowMenu = () => {
	setShowMenu(preve => !preve)
  }

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50">
      {/*desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12">
            <img src={Logo} className="h-full" />
          </div>
        </Link>
          <div className="right-1 text-2xl text-slate-600 relative">
            <FaShoppingCart />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center" />{" "}
            0{" "}
          </div>
          <div className=" text-slate-600"onClick={handleshowMenu }>
            <div className="text-3xl cursor-pointer" >
              <HiOutlineUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-0 bg-white py-3 px-2 shadwo drop-shadow-md flex flex-col">
                <Link  to={"newproduct"}className="whitespace-nowrap cursor-pointer">New Product </Link>
                <Link  to={"login"}  className="whitespace-nowrap cursor-pointer">Login</Link>
              </div>
            )}
          </div>
        </div>
      {/*mobile*/}
    </header>
  );
};

export default Header;
