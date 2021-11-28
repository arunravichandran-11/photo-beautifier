import logo from "./logo.svg";
import "./App.scss";
import PhotoBeautifier from "./modules/PhotoBeautifier";
function App() {
  return (
    <div className="App">
      {/* <header className="app-header">Photo beautifier</header> */}
      <PhotoBeautifier />
    </div>
  );
}

export default App;
