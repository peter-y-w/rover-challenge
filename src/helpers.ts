import readlineModule from 'readline';
import { Plateau, Rover } from './types';

/**
 * Allowed values for commands
 */
const allowedCommands = new Set(['L', 'R', 'M']);

/**
 * Allowed values for orientation
 */
export const allowedOrientations = new Set(['N', 'S', 'E', 'W']);

/**
 * Returns string without spaces
 */
export const removeSpaces = (str: string) => {
	return str.replace(/\s/g, '');
};

/**
 * Checks number type and value 0 or above
 */
export const isValidInteger = (input: number): boolean => {
	return !isNaN(input) && input >= 0;
};

/**
 * Presents prompt to user via readline instance
 * Returns a promise that resolves to the user input
 */
export const ask = (
	rl: readlineModule.Interface,
	prompt: string
): Promise<string> => {
	return new Promise(resolve => {
		rl.question(prompt, (userInput: string) => {
			resolve(userInput);
		});
	});
};

/**
 * Checks that every command in the input array is allowed
 */
export const isValidCommandSet = (commands: string[]): boolean => {
	for (const command of commands) {
		if (!allowedCommands.has(command)) return false;
	}
	return true;
};

/**
 * Takes initial direction and returns new facing after turning left.
 */
export const turnLeft = (direction: string): string => {
	switch (direction) {
		case 'N':
			return 'W';
		case 'W':
			return 'S';
		case 'S':
			return 'E';
		case 'E':
			return 'N';
		default:
			return direction;
	}
};

/**
 * Takes initial direction and returns new facing after turning right.
 */
export const turnRight = (direction: string): string => {
	switch (direction) {
		case 'N':
			return 'E';
		case 'W':
			return 'N';
		case 'S':
			return 'W';
		case 'E':
			return 'S';
		default:
			return direction;
	}
};

/**
 * Moves the rover along the relevant axis if there is space. Returns the new rover location data.
 */
export const move = (plateau: Plateau, rover: Rover): Rover => {
	let newX = rover.x;
	let newY = rover.y;
	switch (rover.orientation) {
		case 'N':
			if (rover.y < plateau.y) newY = rover.y + 1;
			break;
		case 'W':
			if (rover.x > 0) newX = rover.x - 1;
			break;
		case 'S':
			if (rover.y > 0) newY = rover.y - 1;
			break;
		case 'E':
			if (rover.x < plateau.x) newX = rover.x + 1;
			break;
		default:
			break;
	}

	return {
		x: newX,
		y: newY,
		orientation: rover.orientation,
	};
};
