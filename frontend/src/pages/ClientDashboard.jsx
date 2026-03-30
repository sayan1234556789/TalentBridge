import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await api.get("/projects/my-projects");
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, { status });

      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          applications: project.applications.map((app) =>
            app._id === id ? { ...app, status } : app,
          ),
        })),
      );
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E] animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>

            <p className="text-sm text-[#112D4E]/50 mt-1">
              Manage your projects and review applicants
            </p>

            {user?.role === "client" && (
              <Link to="/projects" className="md:hidden inline-block mt-4">
                <button
                  className="inline-flex items-center gap-2
                bg-[#3F72AF] text-white text-md font-normal
                px-5 py-2.5 rounded-lg
                hover:bg-[#112D4E]
                active:scale-95
                transition-all duration-200
                shadow-[0_2px_10px_rgba(63,114,175,0.3)]"
                >
                  <span className="text-xl mb-1 leading-none">+</span>
                  Create Project
                </button>
              </Link>
            )}
          </div>

          {user?.role === "client" && (
            <Link to="/projects" className="hidden md:block">
              <button
                className="inline-flex items-center gap-2
                bg-[#3F72AF] text-white text-md font-normal
                px-5 py-2.5 rounded-lg
                hover:bg-[#112D4E]
                active:scale-95
                transition-all duration-200
                shadow-[0_2px_10px_rgba(63,114,175,0.3)]"
              >
                <span className="text-xl leading-none mb-1.5">+</span>
                Create Project
              </button>
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-center text-[#112D4E]/60 animate-pulse">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#112D4E]/60 text-sm mb-2">
              You haven’t created any projects yet
            </p>
            <p className="text-xs text-[#112D4E]/40">
              Start by creating your first project 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-xl border border-[#DBE2EF]
                transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-1"
              >
                <h2 className="text-lg font-semibold mb-2">{project.title}</h2>

                <p className="text-sm text-[#112D4E]/70 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.skillsRequired?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#DBE2EF] px-3 py-1 rounded-full
                      transition hover:bg-[#3F72AF] hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#DBE2EF]">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wide text-[#112D4E]/40">
                      Budget
                    </span>
                    <p className="font-semibold text-[#3F72AF]">
                      ₹ {project.budget}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-wide text-[#112D4E]/40">
                      Applicants
                    </span>
                    <p className="text-sm font-semibold">
                      {project.applications?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#DBE2EF]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[#112D4E]/80">
                      Applicants
                    </h3>

                    <span className="text-xs font-medium text-[#3F72AF] bg-[#DBE2EF]/70 px-2.5 py-1 rounded-full">
                      {project.applications?.length || 0}
                    </span>
                  </div>

                  {project.applications?.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-xs text-[#112D4E]/50">
                        No applicants yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {project.applications.map((app) => (
                        <div
                          key={app._id}
                          className="flex items-center justify-between
                        bg-[#F9F7F7] border border-[#DBE2EF]
                        px-4 py-3 rounded-xl
                        transition-all duration-200
                        hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#DBE2EF] flex items-center justify-center text-sm font-semibold text-[#3F72AF]">
                              {app.freelancerId?.name?.charAt(0)}
                            </div>

                            <div>
                              <p className="text-sm font-semibold leading-tight">
                                {app.freelancerId?.name}
                              </p>
                              <p className="text-xs text-[#112D4E]/50">
                                {app.freelancerId?.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {app.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(app._id, "accepted")
                                  }
                                  className="text-xs font-medium px-3 py-1.5 rounded-md
                                bg-green-500/90 text-white
                                hover:bg-green-600
                                active:scale-95
                                transition-all duration-200"
                                >
                                  Accept
                                </button>

                                <button
                                  onClick={() =>
                                    updateStatus(app._id, "rejected")
                                  }
                                  className="text-xs font-medium px-3 py-1.5 rounded-md
                                bg-red-500/90 text-white
                                hover:bg-red-600
                                active:scale-95
                                transition-all duration-200"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {app.status === "accepted" && (
                              <span
                                className="text-xs font-semibold px-3 py-1.5 rounded-full
                                bg-green-100 text-green-600"
                              >
                                ✓ Accepted
                              </span>
                            )}

                            {app.status === "rejected" && (
                              <span
                                className="text-xs font-semibold px-3 py-1.5 rounded-full
                                 bg-red-100 text-red-500"
                              >
                                ✕ Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
