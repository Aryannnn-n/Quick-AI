import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Scissors, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth(); // To get token func

  // Form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (object.split(' ').length > 1) {
        toast('Please enter only one object name !');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post(
        '/api/ai/remove-image-object',
        formData,
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
    <div className="h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Remove Object</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          required
          type="file"
          accept="image/*"
          onChange={(e) => {
            setInput(e.target.files[0]);
          }}
          className="w-full px-3 p-2 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-500"
        />

        <p className="mt-4 text-sm font-medium">Describe Object To Remove</p>
        <textarea
          required
          rows={4}
          value={object}
          onChange={(e) => {
            setObject(e.target.value);
          }}
          placeholder="eg. car in background, tree from the image ..."
          className="w-full px-3 p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
        />

        <p className=" text-xs font-light text-gray-500 mt-0 mb-5">
          Be specific what you want to remove.
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h2 className="text-xl font-semibold">Processed Image</h2>
        </div>

        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 h-full w-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
