import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  SunFilled,
  MoonFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {jwtDecode} from "jwt-decode";
import Navlogo from "@/assets/img/LOGOTYPE – BILETICK.svg";
import { Bookmark } from "lucide-react";
import { useStore } from "@/Zustand/Store";

const Header = () => {
  const navigate = useNavigate();
    const { auth, setAuth, logout } = useStore();

 useEffect(() => {
    const credential = localStorage.getItem("credential");
    if (credential && !auth) {
      setAuth({ credential });
    }
  }, [auth, setAuth]);

  //dark
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    document.body.classList.contains("dark")
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const Handlthem = () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setIsDarkMode(isDark);
  };
 

  // Decode 
  const decoded: any = auth?.credential ? jwtDecode(auth.credential) : null;
  const userImage = decoded?.picture;
  const userName = decoded?.name || decoded?.family_name || "User";
  return (
    //sticky top-0 z-50
    <header className=" ">
      <div className=" container mx-auto flex items-center justify-between py-3 px-3 lg:px-0">
        <div className="flex-shrink-0 ">
          <img
            onClick={() => navigate("/")}
            src={Navlogo}
            alt="Navbar logo"
            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px] xl:w-[140px]  cursor-pointer"
          />
        </div>
        <nav className=" flex items-center gap-6 max-[375px]:gap-[6px]  max-[600px]:fixed  max-[600px]:bottom-0  max-[600px]:left-0  max-[600px]:right-0  max-[600px]:z-50  max-[600px]:flex  max-[600px]:items-center  max-[600px]:justify-around  max-[600px]:bg-white dark:max-[600px]:bg-[#1d1d1d] max-[600px]:py-2 max-[600px]:border-t max-[600px]:border-[#1d1d1d1d]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-Ax ${isActive ? "text-[#C61F1F]" : "text-gray-700 dark:text-white"
              } hover:text-[#C61F1F]`
            }
          >
            <HomeOutlined style={{ fontSize: "22px" }} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-Ax ${isActive ? "text-[#C61F1F]" : "text-gray-700 dark:text-white"
              } hover:text-[#C61F1F]`
            }
          >
            <VideoCameraOutlined style={{ fontSize: "22px" }} />
            <span>Movies</span>
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-Ax ${isActive ? "text-[#C61F1F]" : "text-gray-700 dark:text-white"
              } hover:text-[#C61F1F]`
            }
          >
            <Bookmark style={{ fontSize: "20px" }} />
            <span>Saved</span>
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-Ax ${isActive ? "text-[#C61F1F]" : "text-gray-700 dark:text-white"
              } hover:text-[#C61F1F]`
            }
          >
            <SearchOutlined style={{ fontSize: "20px" }} />
            <span>Search</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-4   ">
          <div className="py-1 px-2  rounded-[50%]  bg-gray-100 dark:bg-[#1d1d1d]">
            {isDarkMode ? (
              <SunFilled
                onClick={Handlthem}
                style={{ fontSize: "18px" }}
                className="cursor-pointer transition-colors"
              />
            ) : (
              <MoonFilled
                onClick={Handlthem}
                style={{ fontSize: "18px" }}
                className="cursor-pointer transition-colors  "
              />
            )}
          </div>
          {auth?.credential ? (
            <div className="flex items-center gap-2">
              {userImage && (
                <img
                  src={userImage}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-[#C61F1F] font-semibold hidden sm:block">
                {userName}
              </span>
              <LogoutOutlined
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={logout}
              />
            </div>
          ) : (
            <NavLink
              to="/login"
              className="font-Ax flex items-center cursor-pointer text-[#C61F1F] text-[20px] max-[600px]:text-[16px]"
            >
              <UserOutlined style={{ fontSize: "20px" }} />
              <span>Sign in</span>
            </NavLink>
          )}
        </div>
      </div>

    </header>
  );
};

export default React.memo(Header);
