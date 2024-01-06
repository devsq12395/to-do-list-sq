import React, { useState } from 'react';

const TodoStatus = (props) => {
	const [state, setState] = useState({
		desc: '',
		isPopupOpen: false
	});

	const { isPopupOpen } = state;
	
	handleTxtBox = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	const btnUpdate = () => {
		setState((prevState) => ({ ...prevState, isPopupOpen: true }));
	};
	
	const btnDelete = () => {
		setState((prevState) => ({ ...prevState, isPopupOpen: true }));
	};

	const btnClose = () => {
		setState((prevState) => ({ ...prevState, isPopupOpen: false }));
	};

	return (
		<>
			{isPopupOpen && (
				<div className="Status">
					<div className="StatusWin" onClick={openPopup}>
						<input
							type="text"
							className="status-txtbox"
							value={this.state.desc}
							onChange={this.handleTxtBox}
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
