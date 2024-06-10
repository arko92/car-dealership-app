import React, {useEffect,useState} from "react";
import "../../assets/style.css";

const Header = () => {
  const [homePageItems, setHomePageItems] = useState(<div></div>);

  useEffect(() => {
    checkSession();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    let logout_url = "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const user = await res.json();

    if (user) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  const checkSession = () => {
    let curr_user = sessionStorage.getItem("username");

    if (curr_user !== null && curr_user !== "") {
      setHomePageItems(
        <React.Fragment>
          <li className="nav-item">
            <span className="nav-link">{curr_user}</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/djangoapp/logout" onClick={logout}>
              Logout
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      setHomePageItems(
        <React.Fragment>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbar-user" style={{ backgroundColor: "darkturquoise"}}>
        <div className="container-fluid">
          <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{ fontSize: "larger" }} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/contact">Contact Us</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {homePageItems}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;