import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import "./menu.css";

function UserMenu() {
  const [isActive, setActive] = useState(false);
  const dropdownRef = useRef(null);
  const {setUser, isAdmin} = useContext(AuthContext)

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActive(false);
      }
    }

    if (isActive) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isActive]);

  function handleLogout(){
    localStorage.removeItem("@Auth:token")
    localStorage.removeItem("@Auth:user")

    setUser(null)
    setActive(false)
  }

  return (
    <div className="menu-container">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setActive(!isActive);
        }}
      >
        <img src="/images/userMenu.svg" alt="user-menu" />
      </button>

      {isActive && (
        <nav className="options-box" ref={dropdownRef}>
          <Link to={"/user"}>Página do usuário</Link>
          <button onClick={handleLogout}>Logout</button>
          {isAdmin && (
            <Link to={"/admin"}>Lista de usários</Link>
          )}
        </nav>
      )}
    </div>
  );
}

export default UserMenu;
