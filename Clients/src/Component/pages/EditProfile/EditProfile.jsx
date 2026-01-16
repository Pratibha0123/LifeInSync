import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [preview, setPreview] = useState("");

  // ✅ Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile");
        if (res.data) {
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            profileImage: res.data.profileImage || null,
          });
          if (res.data.profileImage) {
            setPreview(`http://localhost:5000/${res.data.profileImage}`);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []); // run once

  // ✅ Handle text field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Submit updated data (including image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (formData.profileImage instanceof File) {
        data.append("profileImage", formData.profileImage);
      }

      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        alert("✅ Profile updated successfully!");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col items-center mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter name"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Enter phone number"
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <textarea
          name="address"
          value={formData.address}
          placeholder="Enter address"
          onChange={handleChange}
          className="p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
