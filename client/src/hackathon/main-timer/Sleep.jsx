import "./countdown/blast.css";
const Sleep = () => {


  return (
    <div className="koala--art">
      <div className="koala--background">
        <img src="../clock.png" alt="body"/>
      </div>

      <div className="koala--head">
       
        <img src="../head-shake.png" alt="head" />
      </div>
      <div className="koala--arm">
        <img src="../head.png" alt="arm"/>
      </div>

      <div className="clock--minute"></div>
      <div className="clock--hour"></div>
      <div className="clock--center"></div>
    </div>
  );
};

export default Sleep;
