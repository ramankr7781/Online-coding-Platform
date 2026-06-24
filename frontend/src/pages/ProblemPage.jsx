import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from "../components/ChatAi";
import Editorial from "../components/Editorial";
import CodeReview from "../components/CodeReview";

const langMap = {
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript",
  python: "Python",
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("statement");
  const [showConsole, setShowConsole] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState("run");
  const editorRef = useRef(null);
  const consoleRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode =
          response.data.startCode.find(
            (sc) => sc.language === langMap[selectedLanguage]
          )?.initialCode || "";
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode =
        problem.startCode.find(
          (sc) => sc.language === langMap[selectedLanguage]
        )?.initialCode || "";
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    setShowConsole(true);
    setActiveConsoleTab("run");

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage,
      });
      setRunResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error running code:", error);
      setRunResult({
        success: false,
        error: "Internal server error",
        testCases: [],
      });
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    setShowConsole(true);
    setActiveConsoleTab("submit");

    try {
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code: code,
          language: selectedLanguage,
        }
      );
      setSubmitResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting code:", error);
      setSubmitResult(null);
      setLoading(false);
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      case "python":
        return "python";
      default:
        return "javascript";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "hard":
        return "bg-rose-500/10 text-rose-600 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-500/20";
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-300 dark:bg-base-300 p-2 md:p-4 font-sans flex flex-col relative overflow-hidden">
      {/* Decorative background blobs for workspace */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-float pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-float pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

      <div className="flex flex-1 overflow-hidden rounded-2xl glass-card border border-base-content/10 shadow-2xl relative z-10 animate-fade-in-up">
        
        {/* ================= LEFT PANEL ================= */}
        <div className="flex w-1/2 min-w-[350px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
          
          {/* Problem Header */}
          <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900">
            <div className="flex flex-col gap-4">
              <div className="min-w-0">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white truncate">
                  {problem?.title || "Loading..."}
                </h1>
                <p className="mt-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Solve the problem, optimize your logic, and track submissions.
                </p>
              </div>

              {problem && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">
                    {problem.tags}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Left Tabs */}
          <div className="px-4 pt-3 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900">
            <div className="flex flex-wrap gap-1">
              {[
                { id: "statement", label: "Statement" },
                { id: "submissions", label: "Submissions" },
                { id: "solutions", label: "Solutions" },
                { id: "review", label: "Code Review" },
                { id: "ai_help", label: "AI Help" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all duration-200 ${
                    activeLeftTab === tab.id
                      ? "bg-slate-100 text-slate-900 border-b-2 border-indigo-500 dark:bg-slate-800 dark:text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-300"
                  }`}
                  onClick={() => setActiveLeftTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Left Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-900 custom-scrollbar">
            {problem && (
              <>
                {activeLeftTab === "statement" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Description */}
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed text-[15px] text-slate-700 dark:text-slate-300">
                        {problem.description}
                      </div>
                    </div>

                    {/* Examples Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        Examples
                      </h3>
                      
                      <div className="space-y-5">
                        {problem.visibleTestCases.map((example, index) => (
                          <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] overflow-hidden">
                            <div className="bg-slate-100/50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Example {index + 1}
                              </span>
                            </div>
                            <div className="p-4 space-y-4 text-sm font-mono">
                              <div>
                                <span className="text-slate-400 dark:text-slate-500 font-semibold select-none">Input:</span>
                                <div className="mt-1 text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-indigo-500">{example.input}</div>
                              </div>
                              <div>
                                <span className="text-slate-400 dark:text-slate-500 font-semibold select-none">Output:</span>
                                <div className="mt-1 text-slate-800 dark:text-slate-200 pl-4 border-l-2 border-emerald-500">{example.output}</div>
                              </div>
                              {example.explanation && (
                                <div className="font-sans text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">Explanation:</span> {example.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submissions Tab */}
                {activeLeftTab === "submissions" && (
                  <div className="animate-in fade-in duration-300">
                    <SubmissionHistory problemId={problemId} />
                  </div>
                )}

                {/* Solutions Tab */}
                {activeLeftTab === "solutions" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {problem.referenceSolution?.length > 0 ? (
                      problem.referenceSolution.map((solution, index) => (
                        <div key={index} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">
                              Official Solution ({solution?.language})
                            </h3>
                          </div>
                          <div className="bg-[#0d1117] p-4">
                            <pre className="overflow-x-auto text-sm text-slate-300 font-mono">
                              <code>{solution?.completeCode}</code>
                            </pre>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Solutions unlock after you solve the problem.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Tab */}
                {activeLeftTab === "ai_help" && (
                  <div className="h-full animate-in fade-in duration-300">
                    <ChatAi problem={problem} />
                  </div>
                )}

                {/* Code Review Tab */}
                {activeLeftTab === "review" && (
                  <div className="h-full animate-in fade-in duration-300">
                    <CodeReview 
                      problem={problem} 
                      code={code} 
                      selectedLanguage={langMap[selectedLanguage] || selectedLanguage} 
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================= RIGHT PANEL (Editor & Console) ================= */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#0d1117] relative z-0">
          
          {/* Editor Topbar */}
          <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select
                className="bg-[#21262d] border border-[#30363d] hover:border-[#8b949e] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] text-[#c9d1d9] text-sm rounded-lg px-3 py-1.5 outline-none transition-all cursor-pointer font-medium"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
              </select>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#8b949e] bg-[#21262d] px-3 py-1.5 rounded-lg border border-[#30363d]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Editor Ready
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="min-h-0 flex-1 overflow-hidden relative">
            <Editor
              height="100%"
              language={getLanguageForMonaco(selectedLanguage)}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                fontSize: 15,
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                minimap: { enabled: false },
                padding: { top: 20 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                formatOnPaste: true,
                roundedSelection: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {/* Collapsible Console Drawer */}
          <div
            ref={consoleRef}
            className={`border-t border-[#30363d] bg-[#161b22] flex flex-col transition-all duration-300 ease-out z-20 ${
              showConsole ? "h-[40%] min-h-[250px]" : "h-0 border-transparent"
            }`}
          >
            <div className={`${showConsole ? "flex flex-col h-full opacity-100" : "hidden opacity-0"} transition-opacity duration-300`}>
              
              {/* Console Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] bg-[#0d1117]">
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                      activeConsoleTab === "run"
                        ? "bg-[#21262d] text-[#c9d1d9] border border-[#30363d]"
                        : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50"
                    }`}
                    onClick={() => setActiveConsoleTab("run")}
                  >
                    Run Output
                  </button>
                  <button
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                      activeConsoleTab === "submit"
                        ? "bg-[#21262d] text-[#c9d1d9] border border-[#30363d]"
                        : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50"
                    }`}
                    onClick={() => setActiveConsoleTab("submit")}
                  >
                    Submit Result
                  </button>
                </div>
                <button
                  className="text-[#8b949e] hover:text-white transition-colors"
                  onClick={() => setShowConsole(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Console Content */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-[#c9d1d9]">
                
                {/* RUN RESULTS */}
                {activeConsoleTab === "run" && (
                  <div className="animate-in fade-in duration-200">
                    {runResult ? (
                      <div className="space-y-4">
                        {runResult.success ? (
                          <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Accepted
                          </div>
                        ) : (
                          <div className="text-rose-400 font-bold text-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Wrong Answer / Error
                          </div>
                        )}

                        {runResult.testCases.map((tc, i) => (
                          <div key={i} className="rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden">
                            <div className={`px-4 py-2 border-b border-[#30363d] font-bold text-sm flex items-center gap-2 ${tc.status_id === 3 ? "text-emerald-400" : "text-rose-400"}`}>
                              Test Case {i + 1}
                              <span className="text-xs bg-[#21262d] px-2 py-0.5 rounded text-[#8b949e] border border-[#30363d] font-normal">
                                {tc.status_id === 3 ? "Passed" : "Failed"}
                              </span>
                            </div>
                            <div className="p-4 font-mono text-sm space-y-4">
                              <div>
                                <div className="text-[#8b949e] mb-1">Input</div>
                                <div className="bg-[#161b22] px-3 py-2 rounded text-[#c9d1d9] border border-[#30363d]">{tc.stdin}</div>
                              </div>
                              <div>
                                <div className="text-[#8b949e] mb-1">Expected Output</div>
                                <div className="bg-[#161b22] px-3 py-2 rounded text-[#c9d1d9] border border-[#30363d]">{tc.expected_output}</div>
                              </div>
                              <div>
                                <div className="text-[#8b949e] mb-1">Your Output</div>
                                <div className={`bg-[#161b22] px-3 py-2 rounded border border-[#30363d] ${tc.status_id !== 3 ? 'text-rose-400' : 'text-[#c9d1d9]'}`}>
                                  {tc.stdout || "No output"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#8b949e]">
                        Run your code to see outputs here.
                      </div>
                    )}
                  </div>
                )}

                {/* SUBMIT RESULTS */}
                {activeConsoleTab === "submit" && (
                  <div className="animate-in fade-in duration-200">
                    {submitResult ? (
                      <div className="space-y-6">
                        {submitResult.accepted ? (
                          <div>
                            <div className="text-3xl font-black text-emerald-400 mb-2">Accepted</div>
                            <div className="text-[#8b949e] font-mono text-sm mb-6">You have solved this problem.</div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-[#21262d] border border-[#30363d] rounded-xl p-4">
                                <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider mb-1">Test Cases</div>
                                <div className="text-2xl font-bold text-white">{submitResult.passedTestCases} <span className="text-lg text-[#8b949e]">/ {submitResult.totalTestCases}</span></div>
                              </div>
                              <div className="bg-[#21262d] border border-[#30363d] rounded-xl p-4">
                                <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider mb-1">Runtime</div>
                                <div className="text-2xl font-bold text-white">{submitResult.runtime} <span className="text-lg text-[#8b949e]">sec</span></div>
                              </div>
                              <div className="bg-[#21262d] border border-[#30363d] rounded-xl p-4">
                                <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider mb-1">Memory</div>
                                <div className="text-2xl font-bold text-white">{submitResult.memory} <span className="text-lg text-[#8b949e]">KB</span></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl font-black text-rose-500 mb-6">{submitResult.error || "Wrong Answer"}</div>
                            <div className="bg-[#21262d] border border-rose-500/30 rounded-xl p-4 inline-block shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                              <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider mb-1">Passed Test Cases</div>
                              <div className="text-2xl font-bold text-rose-400">{submitResult.passedTestCases} <span className="text-lg text-[#8b949e]">/ {submitResult.totalTestCases}</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#8b949e]">
                        Submit your code to see final evaluation.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor Footer Action Buttons */}
          <div className="border-t border-[#30363d] bg-[#0d1117] px-6 py-4 flex items-center justify-end gap-4 z-30 relative shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
            <button
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                loading 
                  ? "bg-[#21262d] text-[#8b949e] border-[#30363d] cursor-not-allowed opacity-70" 
                  : "bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
              }`}
              onClick={handleRun}
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                {loading && activeConsoleTab === 'run' ? (
                  <span className="w-4 h-4 rounded-full border-2 border-[#8b949e] border-t-transparent animate-spin"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
                Run
              </div>
            </button>

            <button
              className={`px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 relative overflow-hidden group ${
                loading
                  ? "bg-primary/50 text-white/70 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-primary to-secondary text-primary-content hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--p),0.5)]"
              }`}
              onClick={handleSubmitCode}
              disabled={loading}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

              <div className="flex items-center gap-2">
                {loading && activeConsoleTab === 'submit' ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                Submit
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Add a tiny style block to ensure custom scrollbars don't break layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
};

export default ProblemPage;