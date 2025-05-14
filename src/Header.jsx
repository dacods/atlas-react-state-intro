import logo from "./assets/logo.png";
import { useContext } from "react";
import { EnrolledContext } from "./App";

export default function Header() {
  const { enrolled } = useContext(EnrolledContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {enrolled.length}
      </div>
    </div>
  );
}
