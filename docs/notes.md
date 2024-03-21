# Notes

- To run this program, please run `npm run start` at the root directory. I have included node modules in this zip so you shouldn't need to run `npm i`.

- I believe in making software as forgiving as possible for the user, so I've put in some help. In real life, I would make sure to communicate with the stakeholders to confirm requirements before building them.
  - whitespaces are ignored
  - lowercases are accepted and converted to uppercase in the code
  - if only x digits of input are needed, characters entered after are ignored rather than causing an error
  - I've used recursive functions to allow the user to retry in case their input was invalid
