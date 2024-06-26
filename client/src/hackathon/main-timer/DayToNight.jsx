import React, { useEffect, useState } from "react";
import "./countdown/daytonight.css";

const DayToNight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carNames = ["SRKREC", "EOC", "PAIE CELL", "SPORTS"];
  useEffect(() => {
    const updateName = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carNames.length);
    };

    const intervalId = setInterval(updateName, 1000);

    return () => clearInterval(intervalId);
  }, [carNames]);

  return (
    <div id="carblock">
      <div id="background">
        <div id="stars">
          <pre id="starshine1">
            {`
                                                                           +                                           
            +                                                                                                                     +
                                 +             +                                                             +             
                                                                                                                       
                                     +                                +                                                   
               +                                                                                                                   
                          +                                                         +                  +                   
                                   +                                     +                    +                     +      
                                                                                                                       
                                                                                                                       
                                                   +                                                                   
                                                                                                                       
            `}
          </pre>
          <pre id="starshine2">
            {`
                                                                                                                       
                                                                                                                       
                                                                                                                       
                 +                  +                                       +                           +                     +
                                     +                                            +                          +         
                                                                                                                       
                                                          +                                                           
                                                    +                                                                  
              +                                                                                                                
                            +                                                                                    +         
                                                                +                              +                       
                                                                                   +                                       
                                                                                                                       
            `}
          </pre>
          <pre id="starshine3">
            {`
                             +                                                                                             
                                              +                                                    +                   
                                                                                                                       
                    +                                        +                    +                                       +
              +                                                                                                                
                                                                                                          +            
                             +                                                             +                           
                                                                                                                     + 
                                                                                                                       
                                             +                                 +                                       
                                                                                                                       
                               +                                                                                           
               +                                                              +                                      +             
            `}
          </pre>
        </div>
        <div id="sun"></div>
        <div id="moon">
          <div id="mooncurve"></div>
        </div>
        <div id="cloud-back"></div>
        <div id="hill2">
          <div id="h2peak1"></div>
          <div id="h2peak2"></div>
          <div id="h2top"></div>
          <div id="h2baseleft"></div>
          <div id="h2baseright"></div>
        </div>
        <div id="hill1">
          <div id="h1top"></div>
          <div id="h1baseleft"></div>
          <div id="h1baseright"></div>
        </div>
        <div id="cloud-front"></div>
        <div id="tree"></div>
      </div>
      <div id="road">
        <div id="road-lane"></div>
      </div>
      <div id="wheelfront">
        <div id="front-spinner1"></div>
        <div id="front-spinner2"></div>
        <div id="front-spinner3"></div>
      </div>
      <div id="wheelrear">
        <div id="front-spinner1"></div>
        <div id="front-spinner2"></div>
        <div id="front-spinner3"></div>
      </div>
      <div id="carbody">
        <div id="ctop"></div>
        <div id="cbottom"></div>
        <div id="headlight">
          <div id="lightbeam"></div>
        </div>
        <div id="carname">
          <h1 className={`h1-animation`}>{carNames[currentIndex]}</h1>
        </div>
        <div id="taillight"></div>
        <div id="doorhandle"></div>
      </div>
      <div id="carshadow"></div>
    </div>
  );
};

export default DayToNight;
