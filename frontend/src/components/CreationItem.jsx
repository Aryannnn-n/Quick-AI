import { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-gray-900 dark:text-white">{item.prompt}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] dark:bg-[#1e3a5f] border border-[#BFDBFE] dark:border-[#3b5a7f] text-[#1E40AF] dark:text-[#93c5fd] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>

      {/* Read more - on onClick */}
      {expanded && (
        <div>
          {item.type === 'image' ? (
            <div className="flex justify-center items-center">
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md rounded"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700 dark:text-gray-300">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;

/* 

*/
