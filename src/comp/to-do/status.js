import React, { useState, useEffect } from 'react';

const TodoStatus = (props) => {
	const [state, setState] = useState({
		desc: '',
		isPopupOpen: props.isPopupOpen
	});

	const { desc, isPopupOpen } = state;
	
	useEffect(() => {
		setState((prevState) => ({ ...prevState, isPopupOpen: props.isPopupOpen }));
	}, [props.isPopupOpen]);
	
	const handleTxtBox = (event) => {
		const { name, value } = event.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const btnUpdate = () => {
		
	};
	
	const btnDelete = () => {
		
	};

	const btnClose = () => {
		props.showStatus (false);
	};
	
	return (
		<>
			{isPopupOpen && (
				<div className="Status">
					<div className="StatusWin">
						<input
							type="text"
							className="status-txtbox"
							value={desc}
							onChange={handleTxtBox}
							name="desc"
							placeholder="Enter text..."
						/>
						<button className="StatusBtn" onClick={btnUpdate}>Update</button>
						<button className="StatusBtn" onClick={btnDelete}>Delete</button>
						<button className="StatusBtn" onClick={btnClose}>Close</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TodoStatus;
