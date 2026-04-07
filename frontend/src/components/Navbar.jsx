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
          ? "bg-white/80 backdrop-blur-xl  shadow-[0_6px_30px_rgba(15,23,42,0.08)]"
          : "bg-[#F9F7F7]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          <h1 className="text-[1.4rem] font-bold tracking-tight text-[#0f172a]">
            <span className="text-[#3F72AF]">Freelance</span>.io
          </h1>

          <div className="hidden md:flex items-center gap-3 font-medium">

            {navLinks.map((link) => (
              <Link
                to={link.path}
                key={link.name}
                className="relative text-[#334155] text-[15px] px-4 py-2 rounded-lg
                hover:text-[#3F72AF] hover:bg-[#EFF6FF]
                transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-px h-6 bg-[#E2E8F0] mx-2" />

            {user ? (
              <>
                <p
                  onClick={() => {
                    user.role === "client"
                      ? navigate("/clientdashboard")
                      : navigate("/dashboard");
                  }}
                  className="cursor-pointer text-[#334155] text-[15px] px-4 py-2 rounded-lg
                  hover:text-[#3F72AF] hover:bg-[#EFF6FF]
                  transition-all duration-200"
                >
                  Dashboard
                </p>

                <Link to="/profile">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3F72AF] to-[#112D4E]
                  flex items-center justify-center text-white font-semibold shadow-md
                  hover:scale-105 transition cursor-pointer">
                    {user.name?.charAt(0)}
                  </div>
                </Link>

                <button
                  onClick={() => logout()}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold
                  bg-[#F1F5F9] text-[#334155]
                  hover:bg-[#112D4E] hover:text-white
                  transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#334155] px-4 py-2 rounded-lg hover:bg-[#EFF6FF]"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E]
                  text-white px-5 py-2 rounded-lg text-sm font-semibold
                  hover:opacity-90 transition shadow-md"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
            text-[#0f172a] hover:bg-[#E2E8F0] transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-[#E2E8F0] px-6 py-5 flex flex-col gap-3">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-[#334155] px-4 py-3 rounded-lg hover:bg-[#F1F5F9] transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px bg-[#E2E8F0] my-2" />

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F1F5F9]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3F72AF] to-[#112D4E]
                flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0)}
                </div>
                Profile
              </Link>

              {user.role === "freelancer" ? (
                <p
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="px-4 py-3 rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
              >
                Dashboard
              </p>
              ): (
                <p
                onClick={() => {
                  navigate("/clientdashboard");
                  setOpen(false);
                }}
                className="px-4 py-3 rounded-lg hover:bg-[#F1F5F9] cursor-pointer"
              >
                Dashboard
              </p>
              )}
              
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-[#F1F5F9] px-4 py-3 rounded-lg
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
                className="px-4 py-3 rounded-lg hover:bg-[#F1F5F9]"
              >
                Login
              </Link>

              <button
                onClick={() => {
                  navigate("/register");
                  setOpen(false);
                }}
                className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E]
                text-white px-4 py-3 rounded-lg"
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