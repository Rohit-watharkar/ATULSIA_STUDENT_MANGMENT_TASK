import { useEffect, useState } from "react";
import { getStudentProfiles } from "../api/excelTestApi";

export default function ProfileCard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        const data = await getStudentProfiles();
        setProfiles(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load profiles");

        
        setProfiles([
          {
            photo: "/fallback-user.png",
            firstName: "Rohit",
            lastName: "Watharkar",
            email: "Rohit@example.com",
            phone: "+91 9975545889",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  if (loading) return <p className="text-center py-6">Loading profiles...</p>;
  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-6 text-center sm:text-left">
        Student Profiles
      </h3>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center transition hover:shadow-lg"
          >
            <img
              src={profile.photo}
              alt={profile.firstName}
              className="w-24 h-24 rounded-full object-cover mb-3 border"
            />
            <h3 className="text-lg font-bold">{profile.firstName} {profile.lastName}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{profile.email}</p>
            <p className="text-gray-600 text-sm sm:text-base">{profile.phone}</p>
            <p className="mt-2 text-gray-500 text-xs sm:text-sm">
              {profile.city}, {profile.state}, {profile.country}
            </p>
            <button className="mt-3 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-700 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
