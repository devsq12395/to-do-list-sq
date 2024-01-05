

import React from 'react';

class TodoStatus extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			todo: props.todo,
			deadline: props.deadline
		};
	}
	
	btnStatus = () => {
		alert('Button Clicked!');
	};
	
	btnDelete = () => {
		alert('Button Clicked!');
	};

	render() {
		const { todo, deadline } = this.state;
		
		return (
			<div className="Status">
				
			</div>
		);
	}
}

export default TodoStatus;