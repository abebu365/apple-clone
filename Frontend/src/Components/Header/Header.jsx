import React from "react";
import "../../assets/style.css";
import logo from "../../assets/images/icons/logo-sm.png";
import search from "../../assets/images/icons/search-icon-sm.png";
import cart from "../../assets/images/icons/cart-sm.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="nav-wrapper fixed-top">
      <div className="container">
        <nav className="navbar navbar-toggleable-sm navbar-expand-md">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
           ☰
          </button>
          <Link className="navbar-brand mx-auto" to="/Body">
            <img src={logo} />
          </Link>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav nav-justified w-100 nav-fill">
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  Mac
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="/Iphone">
                  iphone
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  ipad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  watch
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  tv
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  Music
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="/Support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  <img src={search} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="#">
                  <img src={cart} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Header;
