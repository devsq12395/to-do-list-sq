import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateStatus } from '../../redux/actions';

import ToDo from './to-do';
import TodoStatus from './status';

import './to-do.css';
import './status.css';

class ToDoCtrl extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tasksCount: 0,
			txt: '',
			date: '',
			tasks: [],
			
			statusOpen: false,
            selID: '',
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
				tasks: data.map(item => ({todo: item.todo, deadline: item.deadline, status: item.status, uID: item.uID}) ),
				tasksCount: data.length,
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
	
	getUniqueID = () => {
		const _char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let _uID = '';

        
        
		for (let i = 0; i < 6; i++) {
			const _rand = Math.floor(Math.random() * _char.length);
			_uID += _char.charAt(_rand);
		}

		return _uID;
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
					deadline: date,
					status: '',
					uID: this.getUniqueID ()
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to submit data to MongoDB');
			}
		} catch (error) {
			console.error(error);
		}
	};

    updateToMongoDB = async () => {
		const { txt, date, selID } = this.state;
        const { sharedStatus } = this.props;

		try {
            const updatedTasks = this.state.tasks.map((task) => {
                if (task.uID === selID) {
                    return {
                        ...task,
                        status: sharedStatus,
                    };
                }
                return task;
            });
			
			const response = await fetch(`http://localhost:5050/api/endpoint/update/${selID}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedTasks [0]),
			});

			if (!response.ok) {
				throw new Error('Failed to update data to MongoDB');
			}
		} catch (error) {
			console.error(error);
		}
	};
	
	showStatus = (_isOn, _id) => {
		this.setState ({statusOpen: _isOn, selID: _id});
	};

	render() {
		const { sharedStatus } = this.props;
		const { tasksCount, tasks, date, statusOpen } = this.state;

		const _tasks = Array.from({ length: tasksCount }, (_, index) => (
			<div key={index}>
				<ToDo 
                    key={index} 
                    todo={tasks [index].todo} 
                    uID={tasks [index].uID} 
                    deadline={tasks [index].deadline} 
                    showStatus={this.showStatus} 
            ></ToDo>
			</div>
		));
		
		return (
		<div>
			<TodoStatus isPopupOpen={statusOpen} showStatus={this.showStatus} updateToMongoDB={this.updateToMongoDB}/>
			
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
				<button className="ToDoAddBtn" onClick={this.createNewButton}>
					+
				</button>
				<br/>
			</div>
			<br />
			<br />
			{_tasks}
		</div>
		);
	}
}

const mapStateToProps = (state) => ({
	sharedStatus: state.sharedStatus,
});

const mapDispatchToProps = {
	updateStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoCtrl);