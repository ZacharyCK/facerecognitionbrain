import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        tiltReverse={true}
        className="br2 shadow-2 Tilt"
        style={{ height: "150px", width: "150px" }}
      >
        <div
          className="Tilt pa3"
          style={{
            height: "150px",
            width: "150px",
            backgroundColor: "darkgreen",
          }}
        >
          <img src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
