import readlineModule from 'readline';

/**
 * Initialise CLI interface
 */
const rl = readlineModule.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/**
 * Rover object
 */
let roverObject = {
	x: undefined,
	y: undefined,
	orientation: undefined,
};

/**
 * Allowed values for orientation
 */
const orientations = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

const ask = (prompt: string): Promise<string> => {
	return new Promise(resolve => {
		rl.question(prompt, (userInput: string) => {
			resolve(userInput);
		});
	});
};

const setUpperRight = (input: string) => {
	console.log('input:', input, typeof input);
};

/**
 * Turns the rover on
 */
const runRover = async () => {
	try {
		const upperRight = await ask(
			'Hello, operator. Please enter the upper-right coordinates of the plateau> '
		);
		setUpperRight(upperRight);
	} catch (e) {
		console.log('Error: ', e);
	}
};

runRover();
