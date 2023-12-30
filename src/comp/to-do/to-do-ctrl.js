import React from 'react';
import ToDo from './to-do';

import './to-do.css';

class ToDoCtrl extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			buttonCount: 0,
			txt: '',
			date: '',
			tasks: [],
		};
	}
	
	componentDidMount (){
		this.fetchDataFromMongoDB();
	}
	
	fetchDataFromMongoDB = async () => {
		try {
			const response = await fetch('http://localhost:5050/api/endpoint');
			if (!response.ok) {
				throw new Error('Failed to fetch data from MongoDB');
			}

			const data = await response.json();
			this.setState({
				tasks: data.map(item => ({todo: item.todo, deadline: item.deadline}) ),
				buttonCount: data.length,
			});
		} catch (error) {
			console.error(error);
		}
	};
	
	handleTxtBox = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	createNewButton = async () => {
		await this.submitToMongoDB();
		this.fetchDataFromMongoDB();
	};

	submitToMongoDB = async () => {
		const { txt, date } = this.state;

		try {
			const response = await fetch('http://localhost:5050/api/endpoint', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					todo: txt,
					deadline: date
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit data to MongoDB');
			}
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { buttonCount, tasks, date } = this.state;

		const buttons = Array.from({ length: buttonCount }, (_, index) => (
			<div key={index}>
				<ToDo key={index} todo={tasks [index].todo} deadline={tasks [index].deadline}></ToDo>
				<br/>
			</div>
		));

		return (
		<div>
			<div className="input-container">
				<label htmlFor="task">Task:</label>
				<input
					type="text"
					className="to-do-txtbox"
					value={this.state.txt}
					onChange={this.handleTxtBox}
					name="txt"
					placeholder="Enter text..."
				/>
				<label htmlFor="deadline">Deadline:</label>
				<input
					type="date"
					className="to-do-txtbox"
					value={this.state.date}
					onChange={this.handleTxtBox}
					name="date"
					placeholder="Select deadline..."
				/>
				<button className="to-do-ctrl" onClick={this.createNewButton}>
					+
				</button>
				<br/>
			</div>
			{buttons}
		</div>
		);
	}
}

export default ToDoCtrl;