import readlineModule from 'readline';

/**
 * Allowed values for commands
 */
const allowedCommands = new Set(['L', 'R', 'M']);

/**
 * Allowed values for orientation
 */
export const allowedOrientations = new Set(['N', 'S', 'E', 'W']);

export const removeSpaces = (str: string) => {
	return str.replace(/\s/g, '');
};

export const isValidInteger = (input: number): boolean => {
	return !isNaN(input) && input >= 0;
};

export const ask = (rl: readlineModule.Interface, prompt: string): Promise<string> => {
	return new Promise(resolve => {
		rl.question(prompt, (userInput: string) => {
			resolve(userInput);
		});
	});
};

export const isValidCommandSet = (commands: string[]): boolean => {
	for (const command of commands) {
		if (!allowedCommands.has(command)) return false;
	}
	return true;
};