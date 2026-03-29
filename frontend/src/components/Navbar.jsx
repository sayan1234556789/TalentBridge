import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

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
    { name: "Explore", path: "/getallprojects" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F7F7]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(17,45,78,0.08)]"
          : "bg-[#F9F7F7]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-[1.3rem] font-bold tracking-tight text-[#112D4E]">
            <span className="text-[#3F72AF]">Freelance</span>.io
          </h1>

          <div className="hidden md:flex items-center gap-4 font-medium">
            {navLinks.map((link) => (
              <Link
                to={link.path}
                key={link.name}
                className="relative text-[#112D4E] text-[15px] px-5 py-2.5 rounded-lg
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/40
                  transition-all duration-200
                  after:absolute after:bottom-1 after:left-5 after:right-5 after:h-[2px]
                  after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-px h-6 bg-[#DBE2EF]" />

            {user ? (
              <>
                <p
                  onClick={() => navigate("/dashboard")}
                  className="relative cursor-pointer text-[#112D4E] text-[15px] px-5 py-2.5 rounded-lg
                    hover:text-[#3F72AF] hover:bg-[#DBE2EF]/40
                    transition-all duration-200
                    after:absolute after:bottom-1 after:left-5 after:right-5 after:h-[2px]
                    after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100"
                >
                  Dashboard
                </p>

                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-2
                    bg-[#DBE2EF]/60 text-[#112D4E] text-[14px] font-semibold
                    px-5 py-2.5 rounded-lg
                    hover:bg-[#112D4E] hover:text-white
                    active:scale-[0.96]
                    transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
                  className="text-[#112D4E] text-[15px] px-5 py-2.5 rounded-lg
                    hover:text-[#3F72AF] hover:bg-[#DBE2EF]/40
                    transition-all duration-200"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#3F72AF] text-white text-[14px] font-semibold
                    px-6 py-2.5 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-[0.96]
                    transition-all duration-200
                    shadow-[0_2px_10px_rgba(63,114,175,0.25)]"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
              text-[#112D4E] hover:bg-[#DBE2EF]/60 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#F9F7F7] border-t border-[#DBE2EF] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-[#112D4E] text-[15px] px-4 py-3 rounded-lg
                hover:bg-[#DBE2EF]/50 transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px bg-[#DBE2EF] my-2" />

          {user ? (
            <>
              <p
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="text-[#112D4E] text-[15px] px-4 py-3 rounded-lg
                  hover:bg-[#DBE2EF]/50 transition cursor-pointer"
              >
                Dashboard
              </p>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-[#DBE2EF]/60 text-[#112D4E] px-4 py-3 rounded-lg
                  hover:bg-[#112D4E] hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-[#112D4E] px-4 py-3 rounded-lg hover:bg-[#DBE2EF]/50 transition"
              >
                Login
              </Link>

              <button
                onClick={() => {
                  navigate("/register");
                  setOpen(false);
                }}
                className="bg-[#3F72AF] text-white px-4 py-3 rounded-lg
                  hover:bg-[#112D4E] transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
