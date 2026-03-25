import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E]">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#DBE2EF]">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create your account
          </h2>

          <form className="flex flex-col gap-4">

            <input type="text" placeholder="Full Name"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" />

            <input type="email" placeholder="Email"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" />

            <input type="password" placeholder="Password"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" />

            <input type="password" placeholder="Confirm Password"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" />

            <button className="bg-[#112D4E] text-white py-3 rounded-lg font-semibold hover:bg-[#3F72AF] transition">
              Register
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3F72AF] cursor-pointer">
                Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register