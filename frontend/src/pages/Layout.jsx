import { SignIn, useUser } from '@clerk/clerk-react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return user ? (
    <>
      <div className="flex flex-col items-start justify-start h-screen">
        {/* Navbar */}
        <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-black/20 backdrop-saturate-150 shadow-lg shadow-black/5">
          <img
            src={assets.logo}
            alt="Logo"
            onClick={() => {
              navigate('/');
            }}
            className="cursor-pointer w-32 sm:w-44"
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
            {sidebar ? (
              <X
                onClick={() => setSidebar(false)}
                className="h-6 w-6 text-gray-700 dark:text-gray-300 sm:hidden"
              />
            ) : (
              <Menu
                onClick={() => setSidebar(true)}
                className="h-6 w-6 text-gray-700 dark:text-gray-300 sm:hidden"
              />
            )}
          </div>
        </nav>

        {/* Sidebar and other content */}
        <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="flex-1 bg-[#f7fbfb] dark:bg-[#0f0f0f]">
            {/* All Ai Genearations Fields Body */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
