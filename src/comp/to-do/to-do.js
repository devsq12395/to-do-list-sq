import React, { useState } from 'react';

const ToDo = (props) => {
	const [state, setState] = useState({
		todo: props.todo,
        uID: props.uID,
		deadline: props.deadline
	});
    const { todo, uID, deadline } = state;

	const btnStatus = () => {
		props.showStatus (true, uID);
	};

	const btnDelete = () => {
		alert('Button Clicked!');
	};

	return (
		<div className="Task">
			<div className="TaskContent" onClick={(e) => e.stopPropagation()}>
				{todo}, {deadline}
			</div>
			<button className="TaskBtn TaskBtnStatus" onClick={btnStatus}>Status</button>
			<button className="TaskBtn TaskBtnDelete" onClick={btnDelete}>Delete</button>
		</div>
	);
};

export default ToDo;
