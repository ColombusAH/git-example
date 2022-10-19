const canvasSettings = { width: 200, height: 100 };
let canvasElement;
let cellsData = [];
const radius = 3;

class Cell {
	constructor(x, y, isAlive, radius) {
		this.x = x;
		this.y = y;
		this.isAlive = isAlive;
		this.radius = radius;
	}
}

/**
 * position: {x:number, y: number}
 */
function drawCell(position, radius, fill) {
	if (canvasElement.getContext) {
		if (canvas.getContext) {
			const ctx = canvas.getContext("2d");
			const { x, y } = position;

			ctx.beginPath();
			const startAngle = 0; // Starting point on circle
			const endAngle = 2 * Math.PI;

			ctx.arc(x, y, radius, startAngle, endAngle, 1);

			if (fill) {
				ctx.fillStyle = "blue";
			} else {
				ctx.fillStyle = "white";
			}

			ctx.fill();
		}
	}
}

/**
 * generation: array of cells
 *
 * []
 */
function drawGeneration(generation) {
	for (const row of generation) {
		for (const cell of row) {
			drawCell({ x: cell.x, y: cell.y }, cell.radius, cell.isAlive);
		}
	}
}

/**
 * input: [
 * 			[{x,y,r,isAlive},{x,y,r,isAlive}],
 * 		  	[{x,y,r,isAlive},{x,y,r,isAlive}],
 * 		  	[{x,y,r,isAlive},{x,y,r,isAlive}]
 * 		  ]
 * output = input
 */
function produceNextGeneration(generation) {
	for (const row of generation) {
		for (const cell of row) {
			console.log(row);
			console.log(cell);
			cell.isAlive = isCellAlive(generation, cell);
		}
	}
	return generation;
}
function isCellAlive(gen, cell) {
	return Math.random() * 100 > 90;
}

function initElements() {
	canvasElement = document.querySelector("#canvas");
	const { width, height } = canvasSettings;
	canvasElement.width = width;
	canvasElement.height = height;
}

function getInitialData(rowsCount, columnCount, radius) {
	const diameter = radius * 2;
	const gen = [];
	for (let i = 0; i < rowsCount; i++) {
		const nextRow = [];
		for (let j = 0; j < columnCount; j++) {
			const cell = new Cell(
				i * diameter + diameter,
				j * diameter + diameter,
				false,
				radius
			);
			nextRow.push(cell);
		}
		gen.push(nextRow);
	}

	return gen;
}

function randomizeWhoIsAlive(data, rows, columns) {
	for (let index = 0; index < (rows * columns) / 5; index++) {
		const r = Math.floor(Math.random() * rows);
		const c = Math.floor(Math.random() * columns);
		data[r][c].isAlive = true;
	}

	return data;
}

function start() {
	const diameter = radius * 2;
	const lineCellAmount = canvasSettings.width / diameter - 1;
	const columnCellAmount = canvasSettings.height / diameter - 1;
	initElements();
	cellsData = getInitialData(lineCellAmount, columnCellAmount, radius);
	cellsData = randomizeWhoIsAlive(cellsData, lineCellAmount, columnCellAmount);
	drawGeneration(cellsData);

	setInterval(() => {
		cellsData = produceNextGeneration(cellsData);
		drawGeneration(cellsData);
	}, 2500);

	setTimeout(() => {
		cellsData = produceNextGeneration(cellsData);
		drawGeneration(cellsData);
	}, 1000);
}
// }

document.addEventListener("DOMContentLoaded", start);
