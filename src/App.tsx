import "./App.scss";
import PhotoBeautifier from "./modules/PhotoBeautifier";

/**
 * App component to load all the major components(modules)
 * @returns JSX
 */
const App = () => {
  return (
    <div className="App">
      {/* <header className="app-header">Photo beautifier</header> */}
      <PhotoBeautifier />
    </div>
  );
};

export default App;
