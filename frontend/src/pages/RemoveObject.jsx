import { Scissors, Sparkles } from 'lucide-react';
import { useState } from 'react';

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');

  // Form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
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

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 text-sm rounded-lg cursor-pointer">
          <Scissors className="w-5" />
          Remove Object
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h2 className="text-xl font-semibold">Processed Image</h2>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className="w-9 h-9" />
            <p>Upload an image and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
