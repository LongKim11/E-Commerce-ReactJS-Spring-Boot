import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { NewArrivals } from "./components/Sections/NewArrivals";
import { Category } from "./components/Sections/Category";
import content from "./data/content.json";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <NewArrivals />
      {content.categories.map((category, index) => (
        <Category key={index} title={category.title} data={category.data} />
      ))}
      <Footer content={content.footer} />
    </div>
  );
}

export default App;
