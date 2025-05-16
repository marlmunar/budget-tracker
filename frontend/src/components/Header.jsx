import { RxDotsHorizontal } from "react-icons/rx";
import { BsPersonSquare } from "react-icons/bs";

const Header = () => {
  return (
    <header className="header">
      <div>
        <h1 className="header-h1">Budgetarians' Log</h1>
      </div>

      <div>
        <button className="hamburger">
          <RxDotsHorizontal className="text-2xl" />
        </button>
        <div className="profile">
          <button>
            <BsPersonSquare className="text-3xl" />
          </button>
          <p>
            Hello, <span className="font-bold">Current User!</span>
          </p>
        </div>

        <nav className="nav-bar">
          <ul>
            <li>
              <a className="nav-active" href="/">
                Home
              </a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
