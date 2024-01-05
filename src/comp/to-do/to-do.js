import React, { useState } from 'react';

const ToDo = (props) => {
	const [state, setState] = useState({
		todo: props.todo,
		deadline: props.deadline
	});

	const btnStatus = () => {
		alert('Button Clicked!');
	};

	const btnDelete = () => {
		alert('Button Clicked!');
	};

	const { todo, deadline } = state;

	return (
		<div className="Task">
			<div className="TaskContent" onClick={(e) => e.stopPropagation()}>
				{todo}, {deadline}
			</div>
			<button className="TaskBtn TaskBtnStatus">Status</button>
			<button className="TaskBtn TaskBtnDelete">Delete</button>
		</div>
	);
};

export default ToDo;
