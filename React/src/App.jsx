import CompareGdps from "./CompareGdps";
import Gdp from "./Gdp";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { useState } from "react"; // imported useState hook
const App = () => {
  const [showGdp, setShowGdp] = useState(false); // created a state variable called showGdp
  const [showCompareGdps, setShowCompareGdps] = useState(false); // created a state variable called showGdp

  const handleGdpToggle = () => {
    setShowGdp(!showGdp); // updated the state variable to the opposite value
  };
  const handleCompareGdpToggle = () => {
    setShowCompareGdps(!showCompareGdps); // updated the state variable to the opposite value
  };
  return (
    <>
      <Navbar />
      {!showGdp && !showCompareGdps && (
        <Hero
          showGdpDataHandler={handleGdpToggle}
          showCompareGdpsHandler={handleCompareGdpToggle}
        />
      )}
      {showGdp && !showCompareGdps && (
        <Gdp backToHomeHandler={handleGdpToggle} />
      )}
      {!showGdp && showCompareGdps && (
        <CompareGdps backToHomeHandler={handleCompareGdpToggle} />
      )}
    </>
  );
};

export default App;
