import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/register" style={{ marginRight: 15, color: "#fff" }}>
        Register
      </Link>
      <Link to="/admin/register" style={{ marginRight: 15, color: "#fff" }}>
        Admin Register
      </Link>
      <Link to="/login" style={{ color: "#fff" }}>
        Login
      </Link>
    </nav>
  );
};

export default Header;
