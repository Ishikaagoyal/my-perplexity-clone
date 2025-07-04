import Image from 'next/image';
import React from 'react';

function ImagelistTab({ chat }) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {chat.searchResult.map((item, index) => (
        item?.thumbnail && (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 transition"
          >
            <Image
              src={item?.thumbnail}
              alt={item.title}
              width={200}
              height={200}
              className="object-cover rounded-lg w-[200px] h-[140px]"
            />
          </div>
        )
      ))}
    </div>
  );
}

export default ImagelistTab;
