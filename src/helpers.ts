import readlineModule from 'readline';

/**
 * Allowed values for commands
 */
const allowedCommands = new Set(['L', 'R', 'M']);

/**
 * Allowed values for orientation
 */
export const allowedOrientations = new Set(['N', 'S', 'E', 'W']);

/**
 * Returns string without spaces.
 */
export const removeSpaces = (str: string) => {
	return str.replace(/\s/g, '');
};

/**
 * Checks number type and value 0 or above.
 */
export const isValidInteger = (input: number): boolean => {
	return !isNaN(input) && input >= 0;
};

/**
 * Presents prompt to user via readline instance.
 * Returns a promise that resolves to the user input.
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
 * Checks that every command in the input array is allowed.
 */
export const isValidCommandSet = (commands: string[]): boolean => {
	for (const command of commands) {
		if (!allowedCommands.has(command)) return false;
	}
	return true;
};
