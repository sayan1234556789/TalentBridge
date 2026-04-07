import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setProfile(res.data);

        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          skills: res.data.skills?.join(",") || "",
          avatar: res.data.avatar || "",
        });
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({
        ...prev,
        avatar: res.data.url,
      }));
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/profile", {
        ...form,
        skills: form.skills
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e.length !== 0),
      });

      toast.success("Profile updated");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#112D4E]/60 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FB] min-h-screen text-[#0f172a]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xl mb-10">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-sm text-[#64748b] mt-1">
            Manage your personal information and skills
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-8">

          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">

            <div className="relative">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3F72AF] to-[#112D4E]
                flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {form.name?.charAt(0) || "U"}
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-[#112D4E] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#112D4E] transition">
                +
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleImageUpload(e.target.files[0])
                  }
                />
              </label>
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg font-semibold">{form.name}</p>
              <p className="text-sm text-[#64748b]">
                Update your profile picture
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="text-sm font-medium text-[#475569] mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0]
                bg-[#F8FAFC] focus:ring-2 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#475569] mb-1 block">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell something about yourself..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0]
                bg-[#F8FAFC] focus:ring-2 focus:ring-[#3F72AF]/20 h-28"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#475569] mb-1 block">
                Skills
              </label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node, MongoDB..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0]
                bg-[#F8FAFC] focus:ring-2 focus:ring-[#3F72AF]/20"
              />
              <p className="text-xs text-[#64748b] mt-1">
                Separate skills using commas
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-[#3F72AF] to-[#112D4E]
                hover:opacity-90 active:scale-[0.98] transition shadow-lg"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;