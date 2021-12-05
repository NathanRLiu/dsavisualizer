import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class HexNode extends React.Component {
	render(){
		return (
			<div className="hex outerHex">
				<div className="hex innerHex">
					<p className="nodeText">{this.props.text}</p>
				</div>
			</div>
		)
	}
}
var nodeList = []

var page = []
nodeList.push(<HexNode text="1"/>)
function connectNodes(){
	return(<svg class="connection" width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>)
}
page.push(connectNodes());

page.push(nodeList);
ReactDOM.render(
	page,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
