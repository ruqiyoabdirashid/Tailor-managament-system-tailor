import { Link } from "react-router-dom";

export default function PageBack({ to, label = "Go Back" }) {
  return (
    <Link to={to} className="page-back">
      ← {label}
    </Link>
  );
}
