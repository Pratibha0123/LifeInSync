import React from 'react';
import './Single.css';
import Sidebar from '../../Sidebar/Sidebar';
import SinglePost from '../../SinglePost/SinglePost';

export default function Single() {
  return (
    <div className="single">
      <div className="singleMain">
        <SinglePost />
      </div>
      <aside className="singleSidebar">
        <Sidebar />
      </aside>
    </div>
  );
}
