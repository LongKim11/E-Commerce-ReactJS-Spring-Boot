import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { NewArrivals } from "./components/Sections/NewArrivals";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <NewArrivals />
    </div>
  );
}

export default App;
