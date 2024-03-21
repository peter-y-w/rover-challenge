import readlineModule from 'readline';
import { Plateau, Rover } from './types';
import {
	allowedOrientations,
	removeSpaces,
	isValidInteger,
	ask,
	isValidCommandSet,
	turnLeft,
	turnRight,
	move,
} from './helpers';

/**
 * Initialise CLI interface
 */
const rl = readlineModule.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/**
 * Instantiate the plateau
 */
const plateau: Plateau = {
	x: 0,
	y: 0,
};

/**
 * Instantiate the rover
 */
let rover: Rover = {
	x: 0,
	y: 0,
	orientation: '',
};

/**
 * Prompts the user to enter the upper-right coordinates of the plateau
 * Will ask for retry if the first two non-space characters are not usable
 */
const drawPlateau = async () => {
	const input = await ask(
		rl,
		'Hello, operator. Please enter the upper-right coordinates of the plateau> '
	);
	const firstTwoCharacters = removeSpaces(input).slice(0, 2);
	const x = parseInt(firstTwoCharacters.charAt(0));
	const y = parseInt(firstTwoCharacters.charAt(1));

	if (!isValidInteger(x) || !isValidInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await drawPlateau();
	} else {
		plateau.x = x;
		plateau.y = y;
	}
	return;
};

/**
 * Prompts the user to enter the current position of the rover
 * Will ask for retry if input is invalid
 */
const placeRover = async () => {
	const input = await ask(
		rl,
		'Please enter the current x-coordinate, y-coordinate, and orientation of the rover> '
	);
	const firstThreeCharacters = removeSpaces(input).slice(0, 3);
	const x = parseInt(firstThreeCharacters.charAt(0));
	const y = parseInt(firstThreeCharacters.charAt(1));
	const inputOrientation = firstThreeCharacters.charAt(2).toUpperCase();

	if (!isValidInteger(x) || !isValidInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await placeRover();
	} else if (!allowedOrientations.has(inputOrientation)) {
		console.log('Could not detect valid orientation. Please try again.');
		await placeRover();
	} else if (x > plateau.x || y > plateau.y) {
		console.log(
			'Could not place rover within plateau dimensions. Please try again.'
		);
		await placeRover();
	} else {
		rover.x = x;
		rover.y = y;
		rover.orientation = inputOrientation;
	}

	return;
};

/**
 * Prompts the user for a list of commands
 * Will ask for retry if commands are not valid
 */
const runCommands = async () => {
	const input = await ask(
		rl,
		'Please enter commands to move the Rover. For further details, please refer to the operator manual> '
	);
	const withoutSpaces = removeSpaces(input.toUpperCase());
	const commands = withoutSpaces.split('');

	if (!isValidCommandSet(commands)) {
		console.log('Invalid command set supplied. Please try again.');
		await runCommands();
	} else {
		for (const command of commands) {
			switch (command) {
				case 'L':
					rover.orientation = turnLeft(rover.orientation);
					break;
				case 'R':
					rover.orientation = turnRight(rover.orientation);
					break;
				case 'M':
					rover = move(plateau, rover);
					break;
				default:
					break;
			}
		}
	}
	return;
};

/**
 * Turns the rover on
 */
const runRover = async () => {
	try {
		await drawPlateau();
		await placeRover();
		await runCommands();
		console.log('Thank you, operator. Reporting new rover position:');
		console.log(`${rover.x} ${rover.y} ${rover.orientation}`);
		process.exit(0);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

runRover();
