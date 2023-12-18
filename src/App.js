import logo from './logo.svg';
import './App.css';

import ToDo from './comp/to-do.js';
import ToDoCtrl from './comp/to-do-ctrl.js';
import './comp/to-do.css';

function App() {
  return (
    <div className="App">
	<header className="App-header">
		<h1>To-Do List</h1>
	</header>
	<ToDoCtrl />
	  
    </div>
  );
}

export default App;
