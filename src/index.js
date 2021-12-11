import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HexNode from './HexNode.js'

let viewFrame = 75;
let VFUnits = "%";
let xOffset = 200;
class Node{
	constructor(val){
		this.value = val;
		this.children = [];
	}
	addNode(newNode){
		this.children.push(newNode);
	}
}

function getYOffsetFromXOffset(xOffset){
	return xOffset * Math.tan(Math.PI / 3);
}

var nodeList = [];

var page = [];

function connectNodes(x1,x2, y1, y2, myHeight){
	//let x1 = node1.left + node1.right;
	//x1/=2;
	//let x2 = node2.left + node2.right;
	//x2/=2;
	//let y1 = node1.top + node1.bottom;
	//y1/=2;
	//let y2 = node2.top + node2.bottom;
	//y2/=2;
	return(
		<svg class = "connection" style = {{width: myHeight * xOffset * myHeight/2 + widthList.length * xOffset * widthList.length/2,
			height: myHeight * getYOffsetFromXOffset(xOffset)}}>
			<line x1={x1} y2={y2} x2={x2} y1={y1} strokeWidth="5"  stroke="currentColor"/>
		</svg>)
}
function createNode(counter)
{
	let hasLeft = Math.random() < 0.5;
	let hasRight = Math.random() < 0.5
	if (counter >= 6){
		hasLeft = false
		hasRight = false
	}
	let thisNode = new Node(parseInt((Math.random() * 80),10))
	if (hasLeft){
		thisNode.addNode(createNode(counter + 1));
	}
	if (hasRight){
		thisNode.addNode(createNode(counter + 1));
	}
	return thisNode
}
let widthList = [];
let root = createNode(0);
//let root = new Node(0);
//let leftNode = new Node(1);
//root.addNode(leftNode);
//let rightNode = new Node(2);
//root.addNode(rightNode);
//leftNode.addNode(new Node(3));
//rightNode.addNode(new Node(4));
//leftNode.addNode(new Node(5));

function traverse(node, iterations){
	const nodeChildren = node.children;
	if (!widthList[iterations]){
		widthList.push(0);
	}
	widthList[iterations] += 1;
	for (let i = 0; i < nodeChildren.length; i++){
		traverse(nodeChildren[i], iterations + 1);
	}
}
traverse(root, 0);
function plot(node, currGen, currX, currY, multiplier){
	let localXOffset = xOffset * (widthList.length - currGen)
	currX = currX + (multiplier * localXOffset)
	const myNode = <HexNode text = {node.value} x = {currX} y = {currY}> </HexNode>
	page.push(myNode)
	let renderedNode = ReactDOM.render(myNode,document.getElementById('root'));
	let connXOffset = 52;
	let connYOffset = 30;
	for (let i = 0; i < node.children.length; i++){
		var nmultiplier = 0;
		if (node.children.length !== 1){
			const isLeft = (i%2===0);
			if (isLeft){
				nmultiplier = -1;
			}
			if (!isLeft){
				nmultiplier = 1;
			}

		}else{
			const isLeft = Math.random() < 0.5 + multiplier * .2
			if (isLeft){
				nmultiplier = -1;
			}
			if (!isLeft){
				nmultiplier = 1;
			}
		}
		plot(node.children[i], currGen + 1, currX, currY+getYOffsetFromXOffset(xOffset), nmultiplier);

		let nextXOffset = xOffset * (widthList.length - (currGen + 1));
		let point1X = currX + connXOffset //the current node, the position of the left side plus a variable x offset that determines the distance remaining to the center
		let point2X = connXOffset + currX + nextXOffset * nmultiplier //same as above but we then calculate the offset that the next line will have
		let point1Y = currY + connYOffset // the position of the top of the current node plus a variable offset determining distance to the center.
		let point2Y = currY + connYOffset + getYOffsetFromXOffset(xOffset); //add the displacement for the next layer

		page.push(connectNodes(point1X, point2X, point1Y, point2Y, widthList.length))
		
	}
	return renderedNode;
}
let maxWidth = 0;

for (let i = 0; i < widthList.length; i++){
	if (widthList[i] > maxWidth){
		maxWidth = widthList[i];
	}
}
var min = 2, max = 40;

plot(root, 0, widthList.length * xOffset * widthList.length/2, 30, 0);
ReactDOM.render(
	page,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
