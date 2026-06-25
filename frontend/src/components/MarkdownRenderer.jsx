import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-5 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-slate-800 dark:text-slate-100" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 mb-4 text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 rounded-r-lg" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code className="bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-md text-sm font-mono border border-slate-200 dark:border-slate-700" {...props}>
                {children}
              </code>
            );
          }
          return (
            <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 bg-[#0d1117]">
              <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-slate-300" {...props}>
                  {children}
                </code>
              </div>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
