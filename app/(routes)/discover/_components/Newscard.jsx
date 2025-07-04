import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';

function Newscard({ news, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const title = news?.title ?? '';
  const description = news?.description?.replace(/<\/?strong>/g, '') ?? '';
  const source = new URL(news?.url || '').hostname.replace('www.', '').split('.')[0];
  const isTrending = index % 2 === 0;
  const hasVideo = news?.video;

  return (
    <div
      className='border rounded-2xl mt-6 cursor-pointer bg-background hover:shadow-lg transition-shadow'
      onClick={() => window.open(news?.url, '_blank')}
    >
      {news?.thumbnail?.original && (
        <div className='relative w-full h-56 rounded-t-2xl overflow-hidden'>
          {!imageLoaded && (
            <div className='absolute inset-0 bg-muted-foreground/10 animate-pulse rounded-t-2xl' />
          )}
          <img
            src={news?.thumbnail?.original}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover rounded-t-2xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {hasVideo && (
            <PlayCircle className='absolute top-2 right-2 text-white bg-black/60 rounded-full p-1 w-7 h-7' />
          )}
        </div>
      )}

      <div className='p-4'>
        <div className='flex justify-between items-start'>
          <h2 className='font-bold text-lg text-foreground line-clamp-2'>
            {title}
          </h2>
          {isTrending && (
            <span className='ml-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded-full'>
              {index % 4 === 0 ? "Editor's Pick" : 'Trending'}
            </span>
          )}
        </div>
        <p className='text-sm mt-2 line-clamp-2 text-muted-foreground'>{description}</p>
        {source && (
          <p className='text-xs mt-2 text-muted-foreground'>
            Source: {source.charAt(0).toUpperCase() + source.slice(1)}
          </p>
        )}
      </div>
    </div>
  );
}

export default Newscard;
