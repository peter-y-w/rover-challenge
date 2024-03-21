import readlineModule from 'readline';
import { Plateau, Rover } from './types';

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
    y: 0
}

/**
 * Instantiate the rover
 */
const rover: Rover = {
  x: 0,
  y: 0,
  orientation: ''
}

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

const isPositiveInteger = (input: number): boolean => {
	return !isNaN(input) && input > 0;
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
const drawPlateau = async () => {
	const input = await ask(
		'Hello, operator. Please enter the upper-right coordinates of the plateau> '
	);
	const firstTwoCharacters = removeSpaces(input).slice(0, 2);
	const x = parseInt(firstTwoCharacters.charAt(0));
	const y = parseInt(firstTwoCharacters.charAt(1));

	if (!isPositiveInteger(x) || !isPositiveInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await drawPlateau();
	}

  plateau.x = x;
  plateau.y = y;

  return
};

const placeRover = async () => {
	const input = await ask(
		'Please enter the current x-coordinate, y-coordinate, and orientation of the Rover> '
	);
	const firstThreeCharacters = removeSpaces(input).slice(0, 3);
	const x = parseInt(firstThreeCharacters.charAt(0));
	const y = parseInt(firstThreeCharacters.charAt(1));
	const inputOrientation = firstThreeCharacters.charAt(2).toUpperCase();

	if (!isPositiveInteger(x) || !isPositiveInteger(y)) {
		console.log('Could not detect valid coordinates. Please try again.');
		await placeRover();
	}

	if (!allowedOrientations.has(inputOrientation)) {
		console.log('Could not detect valid orientation. Please try again.');
		await placeRover();
	}

  if (x > plateau.x || y > plateau.y) {
    console.log('Could not place rover within plateau dimensions. Please try again.');
    await placeRover();
  }

  rover.x = x;
  rover.y = y;
  rover.orientation = inputOrientation;

	return
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

  //TODO: handle move logic
  // for (const command of commands) {
	// 	switch (command) {
  //     case 'L':
        
  //       switch (rover.orientation) {
  //         case 'N':
  //           rover.orientation = 'W'
  //           break;
  //         case 'S':
  //           rover.orientation = 
  //         default:
  //           break;
  //       }

  //       break;
  //     case 'R':
  //       break;
  //     case 'M':
  //       break;
  //     default:
  //       break;
  //   } 
	// }

	return;
};

/**
 * Turns the rover on
 */
const runRover = async () => {
	await drawPlateau();
	await placeRover();
	await runCommands();
};

runRover();
