import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => {
          navigate('/');
        }}
      />

      {/* User login button */}

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={() => {
            openSignIn();
          }}
          className="bg-primary text-white text-sm flex gap-1  items-center rounded-full px-10 py-2.5 cursor-pointer transition hover:scale-102 active:scale-95"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
