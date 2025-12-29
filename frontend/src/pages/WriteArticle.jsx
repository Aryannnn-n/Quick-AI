import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Edit, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

// Base Url Setup
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth(); // To get token func

  // Form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        '/api/ai/generate-article',
        {
          prompt,
          length: selectedLength.length,
        },
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
      const message = error.response?.data?.message || error.message;
      toast.error(message);
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
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Article Configuration</h1>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-900 dark:text-white">Article Topic</p>
        <input
          required
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="The future of artificial intelligence is ..."
          className="w-full px-3 p-2 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#0a0a0a] dark:text-white"
        />

        <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/10">
          {articleLength.map((item, idx) => (
            <span
              key={idx}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer
                ${
                  selectedLength.text === item.text
                    ? `bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700`
                    : `text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700`
                }
                `}
            >
              {item.text}
            </span>
          ))}
        </div>

        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 text-sm rounded-lg cursor-pointer"
        >
          {' '}
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white dark:bg-[#111111] rounded-lg flex flex-col border border-gray-200 dark:border-gray-800 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Article</h2>
        </div>

        {/* Content based rendering */}
        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 dark:text-gray-500">
              <Edit className="w-9 h-9" />
              <p>Enter a topic and click "Generate Article" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600 dark:text-gray-300">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
