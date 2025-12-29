import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-black/20 backdrop-saturate-150 flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      />

      {/* Theme toggle and User login button */}
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

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => {
              openSignIn();
            }}
            className="bg-primary text-white text-sm flex gap-1 items-center rounded-full px-10 py-2.5 cursor-pointer transition hover:scale-102 active:scale-95 shadow-lg shadow-primary/30"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
