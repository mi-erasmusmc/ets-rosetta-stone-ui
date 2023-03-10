import React from "react";

import "../App.css";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <hr />
      <div className="footer-padding">
        <div className="mini-text">
          <div style={{ display: "flex" }}>
            <div>
              <div className="about-sub-item" style={{ paddingTop: 0 }}>
                See something strange? Would like a mapping added or removed?
                <br />
                Get in touch at r.parry@erasmusmc.nl
              </div>
              <div className="about-sub-item" style={{ paddingTop: "0.3em" }}>
                Developed by the{" "}
                <a
                  href="https://biosemantics.erasmusmc.nl/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Erasmus MC BioSemantics Group
                </a>{" "}
                for the{" "}
                <a
                  href="https://etransafe.eu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  eTransafe
                </a>{" "}
                project
              </div>
            </div>
            <img
              style={{ maxHeight: "42px", padding: "0" }}
              className={"right"}
              src={require("../img/logo-erasmus-MC.png")}
              alt={"Erasmus MC logo"}
            />
            <img
              style={{ maxHeight: "42px", paddingLeft: "5em" }}
              src={require("../img/etransafe_logo-2.png")}
              alt={"eTransafe logo"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
