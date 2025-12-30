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
    <div
      className="
        fixed z-50 w-full
        flex justify-between items-center
        py-3 px-4 sm:px-20 xl:px-32

        backdrop-blur-xl backdrop-saturate-150

        bg-white/40
        dark:bg-black/25
        supports-[backdrop-filter]:bg-white/40
        supports-[backdrop-filter]:dark:bg-black/25

        border-b
        border-white/40
        dark:border-white/10

        shadow-lg
        shadow-black/5
        dark:shadow-black/30
      "
    >
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleTheme();
          }}
          className="
            p-2 rounded-full
            backdrop-blur-sm
            hover:bg-white/30
            dark:hover:bg-white/15
            transition-colors
          "
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>

        {/* Auth Button */}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="
              bg-primary text-white text-sm
              flex items-center gap-1
              rounded-full px-10 py-2.5
              transition
              hover:scale-105 active:scale-95
              shadow-lg shadow-primary/30
            "
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
