import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  let [ users, setUsers ] = useState([]);

  useEffect(() => {
    let fetchUsers = async function() {
      let response = await fetch('/api/users');
      let json = await response.json();
      setUsers(json.users);
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map(user =>
        <li key={user.id}>
          {user.name}
        </li>
      )}
    </ul>
  );
}
