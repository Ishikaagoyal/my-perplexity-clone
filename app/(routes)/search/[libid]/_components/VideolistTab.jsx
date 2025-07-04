import React from "react";

export default function VideolistTab({ chat }) {
  const videos = chat?.searchResult?.filter(item => item.type === "video");
  console.log("📺 Videos being rendered:", videos);

  if (!videos?.length) return <p className="text-sm text-gray-500 dark:text-gray-400">No videos found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {videos.map((video, index) => (
        <a
          key={index}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-44 object-cover"
          />
          <div className="p-3">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {video.description}
            </p>
            {video.creator && (
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                By {video.creator} • {video.duration}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
