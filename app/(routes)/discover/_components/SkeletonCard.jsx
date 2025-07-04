import React from 'react';

function SkeletonCard() {
  return (
    <div className='border rounded-2xl mt-6 animate-pulse bg-muted'>
      <div className='w-full h-40 bg-muted-foreground/20 rounded-t-2xl' />
      <div className='p-4 space-y-2'>
        <div className='h-4 w-2/3 bg-muted-foreground/20 rounded' />
        <div className='h-3 w-full bg-muted-foreground/10 rounded' />
        <div className='h-3 w-5/6 bg-muted-foreground/10 rounded' />
      </div>
    </div>
  );
}

export default SkeletonCard;
