import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 dark:text-gray-400 border border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] mt-20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 dark:border-gray-700/30 pb-6">
        <div className="md:max-w-96">
          <img src={assets.logo} alt="logo" className="h-9" />
          <p className="mt-6 text-sm">
            Experience the power of AI with QuickAi. <br />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800 dark:text-white">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">About us</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Contact us</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 dark:border-gray-700/50 dark:bg-[#111111] dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 ring-primary outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © Astra Corp (QuickAi). All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
