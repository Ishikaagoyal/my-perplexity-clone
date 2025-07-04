'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Displaysummary({ aiResp }) {
  console.log("Displaysummary received aiResp:", aiResp);

  return (
    <div className="prose max-w-none dark:prose-invert mt-6">
      {!aiResp && <div>
        <div className='w-full h-5 bg-accent animate-pulse rounded-md'>
          </div>
          <div className='w-1/2 mt-2 h-5 bg-accent animate-pulse rounded-md'>
          </div><div className='w-[70%] mt-2 h-5 bg-accent animate-pulse rounded-md'>
          </div>

        </div>}
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-snug" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-3 leading-snug" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2 leading-tight" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 leading-relaxed" {...props} />
          ),
          li: ({ node, ordered, ...props }) => (
            <li className="mb-1 text-sm text-gray-800 dark:text-gray-300" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 border-l-4 border-indigo-300 dark:border-indigo-600" {...props} />
          ),
          table: ({ node, ...props }) => (
            <table className="table-auto w-full text-sm text-gray-700 dark:text-gray-200 border-collapse border border-gray-300 dark:border-gray-600" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return inline && !match ? (
              <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm text-pink-700 dark:text-pink-400" {...props}>
                {children}
              </code>
            ) : (
              <SyntaxHighlighter
                style={okaidia}
                language={match?.[1]}
                PreTag="div"
                className="rounded-md overflow-auto my-4"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {aiResp}
      </ReactMarkdown>
    </div>
  )
}
