import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import MarkdownRenderer from "./MarkdownRenderer";

const CodeReview = ({ problem, code, selectedLanguage }) => {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleReviewCode = async () => {
    setLoading(true);
    setError(null);
    setReview("");

    try {
      const response = await axiosClient.post("/ai/review", {
        problemTitle: problem.title,
        problemDescription: problem.description,
        code,
        language: selectedLanguage,
      });

      setReview(response.data.review);
    } catch (err) {
      console.error("Code review error:", err);
      if (err.response && typeof err.response.data === 'string') {
        setError(err.response.data);
      } else {
        setError("Failed to generate code review. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 p-4 rounded-xl">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200">
            AI Code Reviewer
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Get insights on time complexity, space complexity, and optimizations.
          </p>
        </div>
        <button
          onClick={handleReviewCode}
          disabled={loading}
          className="whitespace-nowrap px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {loading ? "Analyzing..." : "Analyze My Code"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
          {error}
        </div>
      )}

      {review && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
          <MarkdownRenderer content={review} />
        </div>
      )}

      {!review && !loading && !error && (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>Click "Analyze My Code" to generate a review.</p>
        </div>
      )}
    </div>
  );
};

export default CodeReview;
