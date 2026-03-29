import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    minBudget: "",
    maxBudget: "",
    page: 1,
    limit: 5,
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects", {
          params: filters,
        });
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchProjects();
  }, [filters]);

  const apply = async (id) => {
    try {
      await api.post("/applications", {
        projectId: id,
        proposal: "I am interested in this project",
      });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E] animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>

        {user?.role === "client" && (
          <Link to="/projects">
            <button
              className="bg-[#3F72AF] text-white px-4 py-2 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-95
                    transition-all duration-200 mb-2.5"
            >
              <span className="text-lg p-1 leading-none">+</span>
              Create Project
            </button>
          </Link>
        )}

        <div className="bg-white p-4 rounded-xl border border-[#DBE2EF] grid md:grid-cols-4 gap-4 shadow-sm">
          <input
            placeholder="Search projects..."
            className="px-4 py-2 rounded-lg border border-[#DBE2EF]
            outline-none focus:border-[#3F72AF]
            focus:ring-2 focus:ring-[#3F72AF]/20
            transition-all duration-300"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <input
            placeholder="Skills (e.g. React)"
            className="px-4 py-2 rounded-lg border border-[#DBE2EF]
            outline-none focus:border-[#3F72AF]
            focus:ring-2 focus:ring-[#3F72AF]/20
            transition-all duration-300"
            value={filters.skills}
            onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
          />

          <input
            placeholder="Min Budget"
            className="px-4 py-2 rounded-lg border border-[#DBE2EF]
            outline-none focus:border-[#3F72AF]
            focus:ring-2 focus:ring-[#3F72AF]/20
            transition-all duration-300"
            value={filters.minBudget}
            onChange={(e) =>
              setFilters({ ...filters, minBudget: e.target.value })
            }
          />

          <input
            placeholder="Max Budget"
            className="px-4 py-2 rounded-lg border border-[#DBE2EF]
            outline-none focus:border-[#3F72AF]
            focus:ring-2 focus:ring-[#3F72AF]/20
            transition-all duration-300"
            value={filters.maxBudget}
            onChange={(e) =>
              setFilters({ ...filters, maxBudget: e.target.value })
            }
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6 pb-10">
        {projects.length === 0 ? (
          <p className="text-center col-span-full text-[#112D4E]/60">
            No projects found
          </p>
        ) : (
          projects.map((p) => (
            <div
              key={p._id}
              className="bg-white p-6 rounded-xl border border-[#DBE2EF]
              transition-all duration-300 ease-out
              hover:shadow-lg hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>

              <p className="text-sm text-[#112D4E]/70 mb-4 line-clamp-3">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.skillsRequired?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#DBE2EF] px-3 py-1 rounded-full
                    transition hover:bg-[#3F72AF] hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#3F72AF]">₹ {p.budget}</p>

                {user?.role === "freelancer" && (
                  <button
                    onClick={() => apply(p._id)}
                    className="bg-[#3F72AF] text-white px-4 py-2 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-95
                    transition-all duration-200"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
