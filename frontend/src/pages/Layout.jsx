import { SignIn, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  return user ? (
    <>
      <div className="flex flex-col items-start justify-start h-screen">
        {/* Navbar */}
        <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
          <img
            src={assets.logo}
            alt="Logo"
            onClick={() => {
              navigate('/');
            }}
            className="cursor-pointer w-32 sm:w-44"
          />
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="h-6 w-6 text-gray-600 sm:hidden"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="h-6 w-6 text-gray-600 sm:hidden"
            />
          )}
        </nav>

        {/* Sidebar and other content */}
        <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="flex-1 bg-[#f7fbfb]">
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
