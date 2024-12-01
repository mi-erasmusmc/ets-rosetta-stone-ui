import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import toxhubLogo from "../img/toxhub_logo.png";

import "../styles/navbar.css";

const toxhub = window._env_.TOXHUB_HOME;

export const NavBar = () => {
  return (
    <Navbar
      style={{ boxShadow: "4px 9px 12px -4px rgba(0,0,0,0.24)" }}
      sticky="top"
      expand="md"
    >
      {" "}
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Link to="/" style={{ padding: "10px" }}>
              eTransafe Rosetta Stone
            </Link>
            <Link className={"right"} to="/translate">
              Translate
            </Link>
            <Link className={"right"} to="/about">
              About
            </Link>
            {toxhub && (
              <a
                className="right"
                style={{ padding: "0px" }}
                href={toxhub}
                rel="noreferrer"
              >
                <img
                  style={{ maxHeight: "30px" }}
                  src={toxhubLogo}
                  alt={"ToxHub logo"}
                />
              </a>
            )}
            {toxhub && (
              <a
                className="left"
                style={{ padding: "10px" }}
                href={toxhub}
                rel="noreferrer"
              >
                ToxHub
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
