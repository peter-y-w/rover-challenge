import readlineModule from 'readline';

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

/**
 * Creates main interface and handles inputs
 * @returns {Promise} Represents the session; resolves on close
 */
function roverEngine() {
	return new Promise<void>(function (resolve, reject) {
		/** Start up CLI interface */
		const readline = readlineModule.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		readline.setPrompt('Hello, operator. Robot ready for command> ');
		readline.prompt();

		/** Process line event from CLI */
		readline
			.on('line', function (input) {
				const line = input.toUpperCase();
				readline.prompt();
			})
			.on('close', function () {
				console.log('\n Rover shutting down. Goodbye, operator.');
				resolve();
			});
	});
}

/**
 * Turns the rover on
 */
async function runRover() {
	try {
		await roverEngine();
	} catch (e) {
		console.log('Error: ', e);
	}
}

runRover();
