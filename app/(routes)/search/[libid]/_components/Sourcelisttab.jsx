import Image from 'next/image';
import React from 'react';

function Sourcelisttab({ chat }) {
  return (
    <div className="space-y-6 mt-6">
      {chat.searchResult.map((item, index) => (
        <div key={index} className="p-4 rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm transition">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{index + 1}</span>
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={24}
                height={24}
                className="rounded-full border w-6 h-6 object-cover"
              />
            )}
            <h2 className="text-sm text-gray-700 dark:text-gray-200 font-medium">
              {item.long_name}
            </h2>
          </div>
          <h2 className="mt-2 text-base font-semibold text-gray-800 dark:text-white leading-snug line-clamp-2">
            {item.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Sourcelisttab;
