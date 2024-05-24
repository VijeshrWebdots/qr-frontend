// DashboardPage.js
import React from 'react';

function DashboardPage({ user, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
