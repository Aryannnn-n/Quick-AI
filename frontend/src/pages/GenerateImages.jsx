import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Image, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const GenerateImages = () => {
  const imageStyles = [
    'Realistic Style',
    'Ghibli Style',
    'Anime Style',
    '3D Style',
    'Cartoon Style',
    'Portrait Style',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth(); // To get token func

  // Form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the ${selectedStyle}`;

      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      // Check data
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false); // Close loading
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700 dark:text-gray-300">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white dark:bg-[#111111] rounded-lg border border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-900 dark:text-white">Describe Your Image</p>
        <textarea
          required
          rows={4}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Describe what you want in image ..."
          className="w-full px-3 p-2 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#0a0a0a] dark:text-white"
        />

        <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">Styles</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/10">
          {imageStyles.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer
                ${
                  selectedStyle === item
                    ? `bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700`
                    : `text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700`
                }
                `}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />

            <div className="w-9 h-5 bg-slate-300 dark:bg-gray-700 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm text-gray-900 dark:text-white">Make This Image Public</p>
        </div>

        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white dark:bg-[#111111] rounded-lg flex flex-col border border-gray-200 dark:border-gray-800 min-h-96">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Image</h2>
        </div>

        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 dark:text-gray-500">
              <Image className="w-9 h-9" />
              <p>Enter a topic and click "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img src={content} alt="image" className="w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
