import React from "react";
import Image from "next/image";

export default function Sourcelist({ webresult, loadingsearch }) {
  return (
    <div className="flex gap-3 flex-wrap mt-5">
      {webresult.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-[220px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition"
          onClick={() => window.open(item.url, "_blank")}
        >
          <div className="flex items-center gap-2 mb-2">
            {item?.img && (
              <Image
                src={item?.img}
                alt={item?.name || "source image"}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <h2 className="text-xs font-medium text-gray-800 dark:text-gray-200">
              {item?.long_name}
            </h2>
          </div>
          <h2 className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
            {item?.description}
          </h2>
        </div>
      ))}
      {loadingsearch&& <div className="flex flex-wrap gap-2">
        {[1,2,3,4].map((item,index)=>(
          <div className="w-[200px] h-[100px] rounded-xl bg-accent animate-pulse" key={index}></div>

        ))}
        </div>}
    </div>
  );
}
