import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class Node{
	constructor(val){
		this.value = val;
	}
	addNode(newNode){
		if (!this.children){
			this.children = [];
		}
		this.children.push(newNode);
	}
	getChildren(){
		return(this.children);
	}
}
class HexNode extends React.Component {
	constructor(){
		super();
		this.BoundingClientRect = this.sexBoundingClientRect.bind(this);
	}
	sexBoundingClientRect(){
		console.log(ReactDOM.findDOMNode(this))
		return ReactDOM.findDOMNode(this).getBoundingClientRect();
	}
	render(){
		return (
			<div className="hex outerHex" style = {
				{marginTop:this.props.y,
				 marginLeft:this.props.x}
			}>
				<div className="hex innerHex">
					<p className="nodeText">{this.props.text}</p>
				</div>
			</div>
		)
	}
}
var nodeList = []

var page = []
var myNode = <HexNode text="1"/>
var myNode2 = <HexNode text="2" x={300} y={519.61}/>//multiply delta x by tan(60) to get y
var myComponent1 = ReactDOM.render(myNode,document.getElementById('root'))
page.push(myNode);
nodeList.push(myComponent1.BoundingClientRect())
var myComponent = ReactDOM.render(myNode2,document.getElementById('root'))
page.push(myNode2);
nodeList.push(myComponent.BoundingClientRect())
function connectNodes(node1,node2){
	let x1 = node1.left + node1.right;
	x1/=2;
	let x2 = node2.left + node2.right;
	x2/=2
	let y1 = node1.top + node1.bottom;
	y1/=2;
	let y2 = node2.top + node2.bottom;
	y2/=2;
	return(
	<svg class="connection" width="400" height="700">
		<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor"/>
	</svg>)
}

let tree = new Node(1)
let newNode = new Node(5);
tree.addNode(newNode);
console.log(tree.getChildren());
page.push(connectNodes(nodeList[0],nodeList[1]));
ReactDOM.render(
	page,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
