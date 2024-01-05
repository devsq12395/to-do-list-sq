import logo from './logo.svg';
import './App.css';

import ToDoCtrl from './comp/to-do/to-do-ctrl.js';

function App() {
  return (
    <div className="App">
	<header className="App-header">
		<h1>To-Do List</h1>
	</header>
	<ToDoCtrl />
	<footer className="App-footer">
		
	</footer>
    </div>
  );
}

export default App;
