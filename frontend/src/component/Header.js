import React from "react";
import { useState } from "react";
import Logo from "../LogoPic/Logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../Redux/userSlice";
import { toast } from "react-hot-toast";
//routes


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleshowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };


  const cartItemNumber = useSelector((state)=>state.product.cartItem) 
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50">
      {/*desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12">
            <img src={Logo} className="h-full" alt= "logo"/>
          </div>
        </Link>
        <div className="absolute right-20  text-3xl text-slate-700 ">
            <HiShoppingCart />
            <Link to={"/shoppingcart"} className="absolute -top-2 -right-1 text-white bg-red-500 h-5 w-4 rounded-full m-0 p-0 text-sm text-center cursor-pointer">
            {cartItemNumber.length}
            </Link>
          </div>
          <div className=" text-slate-600"onClick={handleshowMenu }>
            <div className="text-3xl cursor-pointer" >
              <HiOutlineUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-0 bg-white py-3 px-2 shadwo drop-shadow-md flex flex-col">
                <Link  to={"newproduct"}className="whitespace-nowrap cursor-pointer">New Product </Link>
            {userData.image ? (
              <p className="cursor-pointer text-white px-2 bg-red-500"onClick={handleLogout}>
                Logout({userData.firstName}){""}
              </p>
            ) : (
                <Link  to={"/login"}  className="whitespace-nowrap cursor-pointer">Login</Link>
            )}
            
              </div>
            )}
          </div>
        </div>
      {/*mobile*/}
    </header>
  );
};

export default Header;
