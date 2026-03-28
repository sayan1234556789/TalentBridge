import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
  ];

  const navigate = useNavigate();

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F7F7]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(17,45,78,0.08)]"
          : "bg-[#F9F7F7] shadow-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-0">
        <div className="flex items-center justify-between h-16">

          <h1 className="text-xl font-bold tracking-tight text-[#112D4E] select-none">
            <span className="text-[#3F72AF]">Freelance</span>.io
          </h1>

          <div className="hidden md:flex items-center gap-1 font-medium">

            {navLinks.map((link) => (
              <Link
                to={link.path}
                key={link.name}
                className="relative cursor-pointer text-[#112D4E] text-sm px-4 py-2 rounded-md
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-200 ease-in-out
                  after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]
                  after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                  after:transition-transform after:duration-200
                  hover:after:scale-x-100"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-px h-5 bg-[#DBE2EF] mx-2" aria-hidden="true" />

            {user ? (
              <>
                <p onClick={() => navigate("/dashboard")} className="relative cursor-pointer text-[#112D4E] text-sm px-4 py-2 rounded-md
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-200 ease-in-out
                  after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]
                  after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                  after:transition-transform after:duration-200
                  hover:after:scale-x-100">
                  Dashboard
                </p>

                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-1.5
                    border border-red-200 text-red-500 bg-red-50/80 text-sm font-semibold
                    px-5 py-2 rounded-lg
                    hover:bg-red-500 hover:text-white hover:border-red-500
                    active:scale-[0.97]
                    transition-all duration-200 ease-in-out
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="relative cursor-pointer text-[#112D4E] text-sm px-4 py-2 rounded-md
                    hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                    transition-all duration-200 ease-in-out
                    after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]
                    after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                    after:transition-transform after:duration-200
                    hover:after:scale-x-100"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#3F72AF] text-[#F9F7F7] text-sm font-semibold
                    px-5 py-2 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-[0.97]
                    transition-all duration-200 ease-in-out
                    shadow-[0_1px_8px_rgba(63,114,175,0.35)]
                    hover:shadow-[0_2px_12px_rgba(17,45,78,0.3)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F72AF] focus-visible:ring-offset-2"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
              text-[#112D4E] hover:bg-[#DBE2EF]/60
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F72AF]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
            >
              <X size={22} />
            </span>
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
            >
              <Menu size={22} />
            </span>
          </button>

        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="border-t border-[#DBE2EF] bg-[#F9F7F7]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="cursor-pointer text-[#112D4E] font-medium text-sm
                  px-4 py-3 rounded-lg
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-[#DBE2EF] my-2" aria-hidden="true" />

            {user ? (
              <>
                <p onClick={() => navigate("/dashboard")} className="cursor-pointer text-[#112D4E] font-medium text-sm
                  px-4 py-3 rounded-lg
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-150">
                  Dashboard
                </p>

                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2
                    bg-red-500 text-white border border-red-500 text-sm font-semibold
                    px-6 py-3 rounded-lg
                    active:bg-red-600 active:scale-[0.98]
                    transition-all duration-200"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer text-[#112D4E] font-medium text-sm
                    px-4 py-3 rounded-lg
                    hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                    transition-all duration-150"
                >
                  Login
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/register");
                  }}
                  className="w-full bg-[#3F72AF] text-[#F9F7F7] text-sm font-semibold
                    px-6 py-3 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-[0.98]
                    transition-all duration-200
                    shadow-[0_1px_8px_rgba(63,114,175,0.3)]"
                >
                  Register
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;