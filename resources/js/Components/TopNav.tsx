import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";

export const TopNav = () => {
  return (
    <nav>
      <div className="bg-white px-20 py-3">
        <div className="flex justify-end gap-4 items-center">
          <a href="#">
            <FaWhatsapp className="text-xl text-blue-600" />
          </a>
          <a href="#">
            <PiTelegramLogo className="text-xl text-blue-600" />
          </a>
          <a href="#" className="bg-indigo-50 rounded-full p-2 relative">
            <IoNotificationsOutline className="text-2xl text-blue-600" />
            <span className="absolute top-1 start-1 z-[1] bg-blue-600 rounded-full py-0.5 px-1 text-white flex leading-none text-xs">
              2
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};
