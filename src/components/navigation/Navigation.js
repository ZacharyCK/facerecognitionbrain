import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn === 'true') {
      return(
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="pointer" onClick={() => onRouteChange('signin')}>Sign Out</p>
        </nav>
      )
      
    } else {
      return(
          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="pointer mr4" onClick={() => onRouteChange('signin')}>Sign In</p>
            <p className="pointer" onClick={() => onRouteChange('register')}>Register</p>
          </nav>
      )
    }
};

export default Navigation

