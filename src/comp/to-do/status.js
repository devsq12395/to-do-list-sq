import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSelTask } from '../../redux/actions';

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
    
    const startUpdateSelTask = async () => {
        const updatedSelTask = {
            ...props.sharedSelTask,
            status: desc
        };
        await props.updateSelTask(updatedSelTask);
    };

	const btnUpdate = async () => {
		await startUpdateSelTask();
        props.updateToMongoDB();
	};
	
	const btnDelete = () => {
		
	};

	const btnClose = async () => {
        // TO DO: Need to add "Updating..." here
        
		await startUpdateSelTask();
		props.showStatus(false);
	};
	
	return (
		<>
			{isPopupOpen && (
				<div className="Status">
					<div className="StatusWin">
                        <p>Status:</p>
						<textarea
							type="text"
							className="status-txtbox"
							value={desc=='' ? props.sharedSelTask.status : desc}
							onChange={handleTxtBox}
							name="desc"
							placeholder="Enter text..."
						/>
                        <div className="StatusWin-btns">
                            <button className="StatusBtn" onClick={btnUpdate}>Update</button>
                            <button className="StatusBtn" onClick={btnDelete}>Delete</button>
                            <button className="StatusBtn" onClick={btnClose}>Close</button>
                        </div>
					</div>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
    sharedSelTask: state.sharedSelTask,
});

const mapDispatchToProps = {
	updateSelTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoStatus);
