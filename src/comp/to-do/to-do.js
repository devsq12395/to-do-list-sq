

import React from 'react';

class ToDo extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			todo: props.todo,
			deadline: props.deadline
		};
	}
	
	handleClick = () => {
		alert('Button Clicked!');
	};

	render() {
		const { todo, deadline } = this.state;
		
		return (
			<button className="to-do" onClick={this.handleClick}>
				{todo} + ", " + {deadline}
			</button>
		);
	}
}

export default ToDo;