

import React from 'react';

class ToDo extends React.Component {
	handleClick = () => {
		alert('Button Clicked!');
	};

	render() {
		return (
			<button className="to-do" onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export default ToDo;