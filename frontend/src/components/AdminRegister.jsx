import { useState } from "react";

const AdminRegister = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Admin registered");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Register</h2>
      <input name="userName" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Register Admin</button>
    </form>
  );
};

export default AdminRegister;
