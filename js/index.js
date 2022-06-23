console.log(
	`-------------------------------
|                             |
|   DDA PIE CHART      v1.0   |
|                             |
-------------------------------`
);

const buttonAdd = document.querySelector('.add-data');
const range = [0, 100];
let datas = {};
let totalPercentage = 0;

document.addEventListener;

const stylingPieChart = () => {
	let styleColors = 'conic-gradient(';

	if (Object.entries(datas).length === 0) {
		styleColors = `${styleColors}#ffffffff 0deg, #ffffffff 360deg)`;
	} else {
		let index = 0;
		let lastValue = 0;
		for (const [key, data] of Object.entries(datas)) {
			index = index + 1;
			const valueDegree = data.percentage * 3.6 + lastValue;
			styleColors = `${styleColors}${data.color} ${lastValue}deg, ${
				data.color
			} ${valueDegree}deg${
				Object.entries(datas).length === index
					? `, #ffffffff ${valueDegree}deg, #ffffffff 360deg)`
					: ', '
			}`;
			lastValue = valueDegree;
		}
	}
	document.getElementById('pie1').style.backgroundImage = styleColors;
};

const elementDelete = (elementName) => {
	document.querySelector(`#${elementName}-container`).remove();
	totalPercentage = totalPercentage - datas[elementName].percentage;
	delete datas[elementName];
	stylingPieChart();
};

const displayElement = (name) => {
	let value = datas[name].percentage;

	const elementNew = document.createElement('div');
	elementNew.id = `${name}-container`;

	const elementName = document.createElement('span');
	elementName.className = 'element-name';

	const elementValue = document.createElement('span');
	elementValue.className = 'element-value';

	const elementDeleteButton = document.createElement('button');
	elementDeleteButton.className = 'remove-data';
	elementDeleteButton.onclick = () => {
		elementDelete(name);
	};

	const elementColor = document.createElement('div');
	elementColor.className = 'element-color';
	elementColor.style.backgroundColor = datas[name].color;

	document.querySelector('#elements').appendChild(elementNew);
	document.querySelector(`#${name}-container`).appendChild(elementColor);
	document
		.querySelector(`#${name}-container`)
		.appendChild(elementName)
		.appendChild(document.createTextNode(name));
	document
		.querySelector(`#${name}-container`)
		.appendChild(elementValue)
		.appendChild(document.createTextNode(`${value}%`));
	document
		.querySelector(`#${name}-container`)
		.appendChild(elementDeleteButton)
		.appendChild(document.createTextNode('✘'));

	totalPercentage = totalPercentage + value;
	stylingPieChart();
};

const addNewElement = () => {
	if (totalPercentage >= range[1]) {
		console.warn('Values already 100');
		return;
	}

	let value = parseInt(document.querySelector('#element-value').value, 10);

	if (value + totalPercentage > 100) {
		console.warn("Total of Values can't exceed 100");
		return;
	} else if (typeof value !== 'number' || isNaN(value)) {
		console.warn('Value must only be a number between 0 and 100');
		return;
	} else if (value <= 0 || value > 100) {
		console.warn(
			'Value must be greater than 0 and less than or equal to 100'
		);
		return;
	}

	let name = document.querySelector('#element-name').value;

	if (!name) {
		console.warn('Name is missing');
		return;
	}

	let nameReformatted = '';

	const validatorName = (orgName) => {
		nameReformatted = '';
		orgName.split('').forEach((letter, index) => {
			const toAscii = letter.charCodeAt(0);
			if (
				toAscii < 45 ||
				toAscii === 47 ||
				(toAscii > 57 && toAscii < 65) ||
				(toAscii > 90 && toAscii < 95) ||
				toAscii === 96 ||
				toAscii > 122 ||
				(index === 0 &&
					(toAscii === 45 ||
						toAscii === 46 ||
						toAscii === 95 ||
						(toAscii >= 48 && toAscii <= 57))) ||
				(index === name.length - 1 &&
					(toAscii === 45 || toAscii === 46 || toAscii === 95))
			) {
				return (nameReformatted = nameReformatted + '');
			} else if (letter === ' ' || letter === '_' || letter === '.') {
				return (nameReformatted = nameReformatted + '-');
			} else {
				return (nameReformatted = nameReformatted + letter);
			}
		});
		if (orgName !== nameReformatted) {
			validatorName(nameReformatted);
		}
	};

	validatorName(name);
	name = nameReformatted;

	if (datas[name]) {
		console.warn('Name already exists');
		return;
	}

	let color = `${Math.floor(Math.random() * 16777216).toString(16)}ff`;

	while (color.length < 8) {
		color = `0${color}`;
	}

	color = `#${color}`;

	datas[name] = {
		percentage: value,
		color,
	};

	document.querySelectorAll('input').forEach((input) => {
		input.value = '';
	});

	displayElement(name);
};
