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
		<svg class = "connection" style = {{height: myHeight * getYOffsetFromXOffset(xOffset)}}>
			<line x1={x1} y2={y2} x2={x2} y1={y1} strokeWidth="5"  stroke="currentColor"/>
		</svg>)
}
function createNode(counter)
{
	let hasLeft = Math.random() < 0.5;
	let hasRight = Math.random() < 0.5
	if (counter >= 14){
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
//let root = createNode(0);
let root = new Node(0);
let leftNode = new Node(1);
root.addNode(leftNode);
let rightNode = new Node(2);
root.addNode(rightNode);
leftNode.addNode(new Node(3));
rightNode.addNode(new Node(4));

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
	currX = currX + (multiplier * xOffset)
	const myNode = <HexNode text = {node.value} x = {currX} y = {currY}> </HexNode>
	page.push(myNode)
	let renderedNode = ReactDOM.render(myNode,document.getElementById('root'));
	let connXOffset = 52;
	let connYOffset = 30;
	for (let i = 0; i < node.children.length; i++){
		if (node.children.length != 1){
			const isLeft = (i%2===0)
			var multiplier = 0;
			if (isLeft){
				multiplier = -1;
			}
			if (!isLeft){
				multiplier = 1;
			}

			const nextNode = plot(node.children[i], currGen + 1, currX, currY+getYOffsetFromXOffset(xOffset), multiplier)
			page.push(connectNodes(currX+52, currX + 52 + xOffset * multiplier, currY + connYOffset, connYOffset+currY+getYOffsetFromXOffset(xOffset), widthList.length))
		}else{
			const isLeft = Math.random() < 0.5
			var multiplier = 0;
			if (isLeft){
				multiplier = -1;
			}
			if (!isLeft){
				multiplier = 1;
			}
			const nextNode = plot(node.children[i], currGen + 1, currX, currY+getYOffsetFromXOffset(xOffset), multiplier);

			page.push(connectNodes(currX+connXOffset, currX + connXOffset + multiplier * xOffset, currY + connYOffset, connYOffset+currY+getYOffsetFromXOffset(xOffset), widthList.length));
		}
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
function percentToPixel(percent) {
	    return ((percent / 100) * (max - min)) + min;
}
plot(root, 0,800,0, false);
ReactDOM.render(
	page,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
