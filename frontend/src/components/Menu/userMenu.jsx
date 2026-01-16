import { useState } from "react";
import "./menu.css"

function UserMenu() {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className="menu-container"
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <button
        onClick={() => {
          setActive(!isActive);
        }}
      >
        <img src="/images/userMenu.svg" alt="user-menu"/>
      </button>

      {isActive && (
        <nav className="opitions-box">
          <a href="#">alguma coisa</a>
          <a href="#">alguma coisa</a>
        </nav>
      )}
    </div>
  );
}

export default UserMenu;
