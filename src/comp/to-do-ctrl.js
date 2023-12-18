import React from 'react';
import ToDo from './to-do';

class ToDoCtrl extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			buttonCount: 0,
			txt: '',
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
				tasks: data.map(item => item.txtData),
				buttonCount: data.length,
			});
		} catch (error) {
			console.error(error);
		}
	};
	
	handleTxtBox = (event) => {
		this.setState({ txt: event.target.value });
	};

	createNewButton = async () => {
		await this.submitToMongoDB();
		this.fetchDataFromMongoDB();
	};

	submitToMongoDB = async () => {
		const { txt } = this.state;

		try {
			const response = await fetch('http://localhost:5050/api/endpoint', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ txtData: txt }), // Adjust the key to match the server model
			});

			if (!response.ok) {
				throw new Error('Failed to submit data to MongoDB');
			}
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { buttonCount, tasks } = this.state;

		const buttons = Array.from({ length: buttonCount }, (_, index) => (
			<div key={index}>
				<ToDo key={index}>{tasks [index]}</ToDo>
				<br/>
			</div>
		));

		return (
		<div>
			<input
				type="text"
				className="to-do-txtbox"
				value={this.state.txt}
				onChange={this.handleTxtBox}
				placeholder={this.props.placeholder || 'Enter text...'}
			/>
			<button className="to-do-ctrl" onClick={this.createNewButton}>
				+
			</button>
			<br/>
			{buttons}
		</div>
		);
	}
}

export default ToDoCtrl;