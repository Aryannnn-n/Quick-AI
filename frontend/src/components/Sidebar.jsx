import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded) {
    return null; // or skeleton loader
  }

  // Data for sidebar labels
  const sidebarItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
  ];

  
  return (
    <div
      className={`w-60 bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out z-10`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="Avatar"
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center text-gray-900 dark:text-white">{user?.fullName}</h1>

        {/* Sidebar Items Display */}

        <div className="px-6 mt-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {sidebarItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-2.5 py-3.5 flex items-center gap-3 rounded transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Profile  */}

      <div className="w-full border-t border-gray-200 dark:border-gray-800 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            src={user?.imageUrl}
            alt="Avatar"
            className="w-8 rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Protect plan="premium" fallback="free">
                Premium
              </Protect>{' '}
              Plan
            </p>
          </div>
        </div>
        <div>
          <LogOut
            onClick={signOut}
            className="w-4.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
