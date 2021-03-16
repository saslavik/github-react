import logo from './logo.svg';
import './App.scss';
import './assets/scss/main.scss';

function App() {
  return (
    <div className="App">
      <header>
        <div className="navbar">
          <div className="container">
            <div className="logo">LOGO</div>
          </div>
        </div>
      </header>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
      </div>
    </div>
  );
}

export default App;
