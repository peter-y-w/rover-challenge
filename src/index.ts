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
const allowedOrientations = new Set(['N', 'S', 'E', 'W']);

/**
 * Allowed values for commands
 */
const allowedCommands = new Set(['L', 'R', 'M']);

const ask = (prompt: string): Promise<string> => {
	return new Promise(resolve => {
		rl.question(prompt, (userInput: string) => {
			resolve(userInput);
		});
	});
};

const removeSpaces = (str: string) => {
	return str.replace(/\s/g, '');
};

const isValidInteger = (character: string): boolean => {
	const parsedInt = parseInt(character);
	return !isNaN(parsedInt);
};

const isValidCommandSet = (commands: string[]): boolean => {
	for (const command of commands) {
		if (!allowedCommands.has(command)) return false;
	}
	return true;
};

/**
 * Prompts the user to enter the upper-right coordinates of the plateau.
 * Will ask for retry if the first two non-space characters are not usable.
 */
const drawPlateauBoundary = async () => {
	const input = await ask(
		'Hello, operator. Please enter the upper-right coordinates of the plateau> '
	);
	const firstTwoCharacters = removeSpaces(input).slice(0, 2);
	const x = firstTwoCharacters.charAt(0);
	const y = firstTwoCharacters.charAt(1);

	if (!isValidInteger(x) || !isValidInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await drawPlateauBoundary();
	}

	return;
};

const setCurrentPosition = async () => {
	const input = await ask(
		'Please enter the current x-coordinate, y-coordinate, and orientation of the Rover> '
	);
	const firstThreeCharacters = removeSpaces(input).slice(0, 3);
	const x = firstThreeCharacters.charAt(0);
	const y = firstThreeCharacters.charAt(1);
	const orientation = firstThreeCharacters.charAt(2).toUpperCase();

	if (!isValidInteger(x) || !isValidInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await setCurrentPosition();
	}

	//TODO: handle if current position out of bounds

	if (!allowedOrientations.has(orientation)) {
		console.log(orientation);
		console.log('Could not detect valid orientation. Please try again.');
		await setCurrentPosition();
	}

	return;
};

const runCommands = async () => {
	const input = await ask(
		'Please enter commands to move the Rover. For further details, please refer to the operator manual> '
	);
	const withoutSpaces = removeSpaces(input);
	const commands = withoutSpaces.split('');

	if (!isValidCommandSet(commands)) {
		console.log('Invalid command set supplied. Please try again.');
		await runCommands();
	}

	return;
};

/**
 * Turns the rover on
 */
const runRover = async () => {
	await drawPlateauBoundary();
	await setCurrentPosition();
	await runCommands();
};

runRover();
