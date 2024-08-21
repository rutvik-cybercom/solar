import React from "react";
import "./header.css";
import LOGO from "../../../../src/assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom"

function Header({pathList = []}) {
  let userToken = localStorage.getItem("userToken")
  const history = useHistory()
  const location = useLocation();
  
  
  const handleClick = (navObj) => {
    history.push(navObj?.path ?? "");
    if(navObj.label === "Logout"){
      localStorage.clear("userToken");
      window.location.reload()
    }
   
  };
  let links = [
	  { path: "/solar_design", label: "My solar Design", key: "/solar_design" },
	  { path: "/blog", label: "Blog", key: "/blog" },
	  { path: "/faq", label: "Faq", key: "/faq" },
	  { path: "/contactus", label: "Contact Us", key: "/contactus" },
	  { path: "/aboutus", label: "About Us", key: "/aboutus" },
    { path: "/map", label: "Map", key: "/map" },
	  { path: "/login", label: localStorage.getItem("userToken")? "Logout" : "Login", key: "login" },
  ];

  if(!pathList.includes(location.pathname)) {
    return null;
  }

  return (
    <div id="main_header">
      <Navbar expand="md">
        <Container>
          <div className="w-100 d-flex align-items-center">
            <div className="logo" onClick={() => history.push("/")}>
			<span style={{ cursor: "pointer"}}>
                <img src={LOGO} alt="USRoof" />
        </span>
            </div>
            <div className="ms-auto">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  {links.map((navObj) => (
                      <Nav.Item key={navObj.key}>
                        <Nav.Link   onClick={() => handleClick(navObj)}>{navObj?.label}</Nav.Link>
                      </Nav.Item>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
