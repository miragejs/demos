import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  let [ users, setUsers ] = useState([]);
  let [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    let fetchUsers = async function() {
      setIsLoading(true);
      let response = await fetch('/api/users', { signal });

      if (!signal.aborted) {
        let json = await response.json();
        setUsers(json.users);
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => { controller.abort() };
  }, []);

  return (
    <div>
      {isLoading ? (
        <div data-testid="loading">
          Loading users...
        </div>
      ) : (
        users.length > 0 ? (
          <ul data-testid="users">
            {users.map(user =>
              <li key={user.id} data-testid={`user-${user.id}`}>
                {user.name}
              </li>
            )}
          </ul>
        ) : (
          <div data-testid="no-users">
            Couldn't find any users!
          </div>
        )
      )}
    </div>
  );
}
