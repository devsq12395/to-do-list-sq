import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import logo from './logo.svg';
import './App.css';

import ToDoCtrl from './comp/to-do/to-do-ctrl.js';

function App() {
  return (
	<Provider store={store}>
    <div className="App">
	<header className="App-header">
		<h1>To-Do List</h1>
	</header>
	<ToDoCtrl />
	<footer className="App-footer">
		
	</footer>
    </div>
	</Provider>
  );
}

export default App;
