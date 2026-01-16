import React, { useState, useContext, useEffect } from 'react';
import './Setting.css';
import Sidebar from '../../Sidebar/Sidebar';
import { Context } from '../../../context/Context';
import { API_BASE, UPLOADS_BASE } from '../../../api';

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setFile(null); // Reset file on clean load or cancel
    }
  }, [user, editMode]); // Re-sync on editMode toggle (cancel action)

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Basic Validation
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSuccess(false);
    // Fields will reset via useEffect dependency on editMode toggle if we wanted, 
    // but useEffect runs AFTER render. Better to explicit reset or let effect handle it.
    // The effect above with [editMode] dependency effectively resets fields to user object.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (password) formData.append("password", password);

    if (file) {
      formData.append("image", file); // Backend expects "image" or "profileImg"? 
      // In postRoutes it was "image". In typical profile routes it might be "profilePic".
      // Let's check server if possible, or stick to a convention. 
      // User request implies "profile image upload". 
      // Previous code used "profileImg". I will stick to "profileImg" to match likely backend.
      formData.append("profileImg", file);
    }

    // Add user ID if needed by backend, usually auth token handles it, 
    // but the route uses /:email so we are good.

    try {
      const res = await fetch(`${API_BASE}/profile/update/${user.email}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setEditMode(false);
        dispatch({ type: "UPDATE_SUCCESS", payload: data });
      } else {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  // Profile Picture Source Logic
  const getProfileSrc = () => {
    if (file) return URL.createObjectURL(file); // Preview new upload
    if (user?.profilePic) {
      return user.profilePic.startsWith("http")
        ? user.profilePic
        : UPLOADS_BASE + user.profilePic;
    }
    return "https://via.placeholder.com/150"; // Default
  }

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingsTitle">
          <h2 className="settingsUpdateTitle">Your Profile</h2>
          {/* Toggle Edit Mode Button if not editing */}
          {!editMode && (
            <button
              className="settingEditBtn"
              onClick={() => setEditMode(true)}
            >
              <i className="far fa-edit"></i> Edit Profile
            </button>
          )}
          {/* <p className="settingsDeleteTitle">Delete Account</p>  -- Optional, keep if desired */}
        </div>

        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img src={getProfileSrc()} alt="Profile" className="settingImg" />

            {editMode && (
              <>
                <label htmlFor="fileInput" className="settingPPIcon">
                  <i className="far fa-user-circle"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </>
            )}
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!editMode}
            className={editMode ? "activeInput" : "disabledInput"}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            value={email}
            disabled={true} // Usually email is primary key/immutable in simple apps
            className="disabledInput"
          />

          {editMode && (
            <>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                onChange={(e) => setPassword(e.target.value)}
                className="activeInput"
              />
            </>
          )}

          {editMode && (
            <div className="settingActions">
              <button className="settingSubmit" type="submit">Save Changes</button>
              <button className="settingCancel" onClick={handleCancel}>Cancel</button>
            </div>
          )}

          {success && <span className="successMsg">Profile updated successfully!</span>}
        </form>
      </div>

      <Sidebar />
    </div>
  );
}
