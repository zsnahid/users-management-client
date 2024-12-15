import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddNewUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(name, email);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
        form.reset();
      });
  };

  return (
    <>
      <h1>Users: {users.length}</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} | {user.name} | {user.email}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddNewUser}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
        />
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="text"
          name="email"
        />
        <br />
        <button
          type="submit"
          value="Add new user"
        >
          Add new user
        </button>
      </form>
    </>
  );
}

export default App;
