# Mars Rover

> Note: Please use Typescript with NodeJS or React to complete the challenge. Please supply your solution files into the `src/` folder in the root directory of this project. If you need to write notes, you can use the supplied `notes.md` file inside the `docs/` directory.

A robotic rover has been landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rover so that its onboard camera can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal compass points which are **(NORTH, EAST, SOUTH, WEST)**. 

The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot.

'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from **(x, y)** is **(x, y+1)**.

## In summary:

`L` -> Turn left 90 degrees.

`R` -> Turn right 90 degrees.

`M` -> Move forward one square, at the current heading. e.g. If the current heading is **SOUTH**, the **M** command will move one square **SOUTH**.

## Input

The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0. This gives you the boundaries of the grid.

The second line of the input is the current position of the Rover, i.e. It is currently in position (x)1,(y)2 and facing NORTH.

Finally, the last line of the input are the directions to give to the rover to tell it where to go, with an expectation that the final destination of the Rover should be reported back as (x)1, (y)3 and facing NORTH.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

## Output

The output should be the rover's final co-ordinates and heading.

## Test Input

```
5 5
1 2 N
LMLMLMLMM
```

## Expected Output

```
1 3 N
```

## Demo Image of Expected Output
![Example Solution](https://github.com/weareflip/weareflip-programming-tests/blob/master/assets/example.png?raw=true)
