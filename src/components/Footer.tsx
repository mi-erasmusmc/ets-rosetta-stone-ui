import "../App.css";
import "../styles/footer.css";
import emcLogo from "../img/logo-erasmus-MC.png";
import etsLogo from "../img/etransafe_logo-2.png";

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
                Get in touch https://github.com/mi-erasmusmc/ets-rosetta-stone
              </div>
              <div className="about-sub-item" style={{ paddingTop: "0.3em" }}>
                Developed by the{" "}
                <a
                  href="https://www.erasmusmc.nl/en/research/groups/biosemantics-group"
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
              src={emcLogo}
              alt={"Erasmus MC logo"}
            />
            <img
              style={{ maxHeight: "42px", paddingLeft: "5em" }}
              src={etsLogo}
              alt={"eTransafe logo"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
