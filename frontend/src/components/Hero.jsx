import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen ">
      {/* Title and basic info */}

      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] text-gray-900 dark:text-white">
          Create amazing content <br /> with
          <span className="text-primary"> AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600 dark:text-gray-400">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate('/ai')}
          className="bg-primary text-white hover:scale-102 active:scale-95 transition px-10 py-3 rounded-lg cursor-pointer"
        >
          Start creating now
        </button>
        <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch Demo
        </button>
      </div>

      {/* The user no. thing */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600 dark:text-gray-400">
        <img src={assets.user_group} alt="user_group" className="h-8" /> Trusted
        by 10k+ people
      </div>
    </div>
  );
};

export default Hero;
