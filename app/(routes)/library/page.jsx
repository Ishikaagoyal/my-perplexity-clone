'use client';
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/services/supabase';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import {
  Library as LibraryIcon,
  SquareArrowOutUpRight,
  ChevronDown,
  Check,
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function Library() {
  const { user } = useUser();
  const [Libraryhistory, setLibraryhistory] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 new
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    GetlibraryHistory();
  }, [user, sortOrder]);

  const GetlibraryHistory = async () => {
    let { data: Library, error } = await supabase
      .from('Library')
      .select('*, chats(aiResp)')
      .eq('useremail', user?.primaryEmailAddress?.emailAddress)
      .order('id', { ascending: sortOrder === 'asc' });

    setLibraryhistory(Library || []);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleNavigation = (libid) => {
    setIsLoading(true); // show loader
    router.push('/search/' + libid);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen text-primary animate-spin'>
        <Loader2 className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className='mt-20 px-6 md:px-20 lg:px-36 xl:px-56'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <LibraryIcon className='w-6 h-6 text-primary' />
          <h2 className='font-semibold text-3xl text-foreground'>Your Library</h2>
        </div>

        <div className='relative' ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className='text-sm bg-muted px-3 py-1.5 rounded-md flex items-center gap-1 text-foreground hover:bg-muted/70 transition-all duration-200 hover:text-primary active:scale-95'
          >
            <span className='transition-all duration-200'>
              Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </span>
            <ChevronDown className='w-4 h-4' />
          </button>

          {dropdownOpen && (
            <div className='absolute right-0 mt-1 bg-popover shadow-md border rounded-md z-10 w-40'>
              <button
                className={`w-full px-4 py-2 text-sm text-left hover:bg-accent ${sortOrder === 'desc' ? 'text-primary' : ''}`}
                onClick={() => {
                  setSortOrder('desc');
                  setDropdownOpen(false);
                }}
              >
                Newest First {sortOrder === 'desc' && <Check className='inline w-4 h-4 ml-2' />}
              </button>
              <button
                className={`w-full px-4 py-2 text-sm text-left hover:bg-accent ${sortOrder === 'asc' ? 'text-primary' : ''}`}
                onClick={() => {
                  setSortOrder('asc');
                  setDropdownOpen(false);
                }}
              >
                Oldest First {sortOrder === 'asc' && <Check className='inline w-4 h-4 ml-2' />}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        {Libraryhistory?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.libid)} // 👈 now controlled
            className='cursor-pointer px-2 py-3 rounded-md flex items-start hover:bg-accent/40 hover:border-l-4 hover:border-primary transition-all group'
          >
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-foreground'>
                {item.searchinput}
              </h3>

              {item.chats?.[0]?.aiResp && (
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {item.chats?.[0]?.aiResp.replace(/^#+\s*/, '')}
                </p>
              )}

              <p className='text-xs text-muted-foreground mt-1'>
                {moment.utc(item.created_at).fromNow()}
              </p>
            </div>

            <SquareArrowOutUpRight
              className='w-4 h-4 ml-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0 mt-1'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
