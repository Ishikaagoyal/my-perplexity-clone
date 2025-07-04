import React from 'react';
import Sourcelist from './Sourcelist';
import Displaysummary from './Displaysummary';
import { Loader2 } from 'lucide-react';

export default function Answerdisplay({ chat, loadingsearch }) {
  const isLoading = !chat?.aiResp;

  return (
    <div className="space-y-6 mt-6 bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm">
      <Sourcelist webresult={chat?.searchResult} loadingsearch= {loadingsearch} />

      {isLoading ? (
        <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mt-10">
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
          <span>Generating AI summary...</span>
        </div>
      ) : (
        <Displaysummary aiResp={chat?.aiResp} />
      )}
    </div>
  );
}
