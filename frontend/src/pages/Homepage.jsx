import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/getAllProblem");
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/problemSolvedByUser");
        setSolvedProblems(data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filters.difficulty === "all" || problem.difficulty === filters.difficulty;

    const tagMatch = filters.tag === "all" || problem.tags === filters.tag;

    const statusMatch =
      filters.status === "all" ||
      solvedProblems.some((sp) => sp._id === problem._id);

    return difficultyMatch && tagMatch && statusMatch;
  });

  const solvedCount = solvedProblems.length;

  return (
    <div className="min-h-screen bg-base-300 relative">
      {/* Decorative background for the dashboard */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-panel border-b-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-content shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" 
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>
              <NavLink
                to="/"
                className="text-2xl font-extrabold tracking-tight text-base-content hover:text-primary transition-colors"
              >
                Coding ⭐
              </NavLink>
              <p className="text-xs text-base-content/60 -mt-0.5">
                Practice • Track • Improve
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-base-200 px-3 py-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary font-bold">
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{user?.firstName}</p>
                  <p className="text-xs text-base-content/60">
                    {user?.role === "admin" ? "Administrator" : "User"}
                  </p>
                </div>
              </div>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-xl border border-base-300 hover:border-primary/40"
              >
                <span className="font-medium">{user?.firstName || "Account"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
              >
                <li className="menu-title px-3 py-1">
                  <span className="text-xs uppercase tracking-wider text-base-content/50">
                    Account
                  </span>
                </li>

                {user?.role === "admin" && (
                  <li>
                    <NavLink
                      to="/admin"
                      className="rounded-xl font-medium"
                    >
                      Admin Panel
                    </NavLink>
                  </li>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl text-error font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Hero / Header */}
        <div className="mb-8 overflow-hidden rounded-3xl glass-card animate-fade-in-up">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 z-0"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Problem Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-base-content/70">
                Browse coding problems, filter by difficulty and topic, and keep
                track of what you’ve already solved.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 relative z-10">
              <div className="rounded-2xl glass-panel px-4 py-3 hover:-translate-y-1 transition-transform cursor-default">
                <p className="text-xs uppercase tracking-wide text-base-content/70">
                  Total Problems
                </p>
                <p className="mt-1 text-2xl font-extrabold text-glow">{problems.length}</p>
              </div>

              <div className="rounded-2xl glass-panel px-4 py-3 hover:-translate-y-1 transition-transform cursor-default">
                <p className="text-xs uppercase tracking-wide text-base-content/70">
                  Solved
                </p>
                <p className="mt-1 text-2xl font-extrabold text-success text-glow">
                  {solvedCount}
                </p>
              </div>

              <div className="rounded-2xl glass-panel px-4 py-3 col-span-2 sm:col-span-1 hover:-translate-y-1 transition-transform cursor-default">
                <p className="text-xs uppercase tracking-wide text-base-content/70">
                  Showing
                </p>
                <p className="mt-1 text-2xl font-extrabold text-primary text-glow">
                  {filteredProblems.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-3xl glass-card p-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-bold">Filters</h2>
              <p className="text-sm text-base-content/60">
                Narrow down the problem list by status, difficulty, and topic.
              </p>
            </div>

            <button
              className="btn btn-sm btn-outline rounded-xl"
              onClick={() =>
                setFilters({
                  difficulty: "all",
                  tag: "all",
                  status: "all",
                })
              }
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Status */}
            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
              <label className="mb-2 block text-sm font-semibold text-base-content/70">
                Status
              </label>
              <select
                className="select select-bordered w-full rounded-xl bg-base-100"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved Problems</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
              <label className="mb-2 block text-sm font-semibold text-base-content/70">
                Difficulty
              </label>
              <select
                className="select select-bordered w-full rounded-xl bg-base-100"
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters({ ...filters, difficulty: e.target.value })
                }
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Tag */}
            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
              <label className="mb-2 block text-sm font-semibold text-base-content/70">
                Topic
              </label>
              <select
                className="select select-bordered w-full rounded-xl bg-base-100"
                value={filters.tag}
                onChange={(e) =>
                  setFilters({ ...filters, tag: e.target.value })
                }
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problems */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Problems</h2>
            <p className="text-sm text-base-content/60">
              {filteredProblems.length} problem
              {filteredProblems.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2m6 2v-6m-3 6V7m-7 12h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">No matching problems found</h3>
            <p className="mt-2 text-sm text-base-content/60">
              Try changing the filters to see more problems.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredProblems.map((problem, index) => {
              const isSolved = solvedProblems.some(
                (sp) => sp._id === problem._id
              );

              return (
                <div
                  key={problem._id}
                  className="group rounded-3xl glass-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 hover:border-primary/50 animate-fade-in-up"
                  style={{ animationDelay: `${(index % 10) * 0.05}s` }}
                >
                  <div className="p-5 md:p-6 relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between relative z-10">
                      {/* Left */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                            {index + 1}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-xl font-extrabold tracking-tight">
                              <NavLink
                                to={`/problem/${problem._id}`}
                                className="transition-colors hover:text-primary"
                              >
                                {problem.title}
                              </NavLink>
                            </h3>
                            <p className="text-sm text-base-content/55">
                              Solve, submit, and track your progress
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`badge border-0 px-3 py-3 font-semibold ${getDifficultyBadgeColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>

                          <span className="badge badge-info badge-outline px-3 py-3 font-medium">
                            {problem.tags}
                          </span>

                          {isSolved && (
                            <span className="badge badge-success gap-2 px-3 py-3 font-semibold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Solved
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center justify-end">
                        <NavLink
                          to={`/problem/${problem._id}`}
                          className="btn btn-primary rounded-2xl px-5 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow"
                        >
                          Solve Now
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success text-success-content";
    case "medium":
      return "badge-warning text-warning-content";
    case "hard":
      return "badge-error text-error-content";
    default:
      return "badge-neutral text-neutral-content";
  }
};

export default Homepage;