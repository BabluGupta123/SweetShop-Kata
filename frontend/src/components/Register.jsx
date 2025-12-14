import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("User registered");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Register</h2>
      <input name="userName" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
