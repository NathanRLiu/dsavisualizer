import React from 'react';
import ReactDOM from 'react-dom';

class HexNode extends React.Component {
	constructor(){
		super();
		this.BoundingClientRect = this.getBoundingClientRect.bind(this);
	}
	getBoundingClientRect(){
		console.log(ReactDOM.findDOMNode(this));
		return ReactDOM.findDOMNode(this).getBoundingClientRect();
	}
	render(){
		return (
				<div className="hex outerHex"style={
					{marginTop:this.props.y,
					 marginLeft:this.props.x}}>
					<div className="hex innerHex">
						<p className="nodeText">{this.props.text}</p>
					</div>
				</div>
		)
	}
}

export default HexNode;
