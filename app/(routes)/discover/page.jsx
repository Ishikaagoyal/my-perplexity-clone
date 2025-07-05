
'use client';
import axios from 'axios';
import { Cpu, DollarSign, Globe, Palette, Star, Volleyball } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import Newscard from './_components/Newscard';
import SkeletonCard from './_components/SkeletonCard';

const options = [
  { title: 'Top', icon: Star },
  { title: 'Tech & Science', icon: Cpu },
  { title: 'Finance', icon: DollarSign },
  { title: 'Art & Culture', icon: Palette },
  { title: 'Sports', icon: Volleyball }
];

const cache = {}; // In-memory cache

function Discover() {
  const [SelectedOption, setSelectedoption] = useState('Top');
  const [latestnews, setlatestnews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (SelectedOption && cache[SelectedOption]) {
      setlatestnews(cache[SelectedOption]);
    } else if (SelectedOption) {
      Getsearchresult();
    }
  }, [SelectedOption]);

  const Getsearchresult = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/brave-search-api', {
        searchInput: SelectedOption + ' Latest News & Updates',
        searchType: 'Search'
      });
      //console.log(result.data);

      const websearchresult = result?.data?.web?.results;
      cache[SelectedOption] = websearchresult; // Cache it
      setlatestnews(websearchresult);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-20 px-6 md:px-20 lg:px-36 xl:px-56'>
      <h2 className='font-bold text-3xl flex gap-2 items-center text-foreground'>
        <Globe className='w-8 h-8 text-primary' />
        <span>Discover</span>
      </h2>

      <div className='flex mt-5 gap-3 flex-wrap'>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelectedoption(option.title)}
            className={`flex gap-1 px-4 py-1.5 items-center rounded-full text-sm font-medium border cursor-pointer transition-all
              ${SelectedOption === option.title
                ? 'bg-accent text-primary border-primary'
                : 'bg-muted text-muted-foreground border-transparent hover:border-accent'}
            `}
          >
            <option.icon className='h-4 w-4' />
            <span>{option.title}</span>
          </div>
        ))}
      </div>

      <div className='w-full mt-6'>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : latestnews?.map((news, index) => {
              const isFullWidth = index % 4 === 0;
              if (isFullWidth) {
                return (
                  <div key={index} className='w-full mb-4'>
                    <Newscard news={news} index={index} />
                  </div>
                );
              }
              const group = latestnews.slice(index, index + 3);
              if (index % 4 === 1) {
                return (
                  <div key={index} className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    {group.map((item, i) => (
                      <Newscard news={item} key={`${index}-${i}`} index={index + i} />
                    ))}
                  </div>
                );
              }
              return null;
            })}
      </div>
    </div>
  );
}

export default Discover;
