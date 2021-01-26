// Exercise 1
function findGCD(p, q) {
  /*
  p: integer.
  q: integer.
  returns: the greatest common denominator of p and q.
  */

  let temp;
  // This algorithm calculates the greatest common denominator of p and q.
  while (q !== 0) {
    temp = q;
    q = p % q;
    p = temp;
  }

  return p;
}

function reduceFraction(num, den) {
  /*
  num: integer.
  den: integer.
  returns: the fraction num/den reduced to its lowest terms.
  */

  // Calls the findGCD function defined above to find the greatest common denominator of num and den.
  let gcd = findGCD(num, den);

  // The lowest terms of the fraction num/den are found by dividing num and den by their greatest common denominator.
  return [num / gcd, den / gcd];
}


// Exercise 2
function isMagicDate(day, month, year) {
  /*
  day: positive integer.
  month: positive integer.
  year: positive integer.
  returns: true if day/month/year is a magic date, false otherwise. (A magic date is a date where the day multiplied by
    the month is equal to the last two digits of the year).
  */

  return day * month === year % 100;  // year % 100 returns the last two digits of year.
}


// Exercise 3
function sublist(l) {
  /*
  l: array.
  returns: array containing all sublists of l.
  */

  // The empty list is a sublist of any list, so the array of sublists is defined to contain the empty list.
  let sublists = [[]];

  let length = l.length;
  let new_sublist;

  // Iterates through the array l and finds all sublists by taking every possible slice of l (except the empty list).
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length + 1; j++) {
      new_sublist = l.slice(i, j);
      sublists.push(new_sublist);
    }
  }
  return sublists;
}


// Exercise 4
function pigLatin(word) {
  /*
  word: string containing an English word (any punctuation must be at the end of word, and only the first character
    may be upper case).
  returns: string representing the Pig Latin translation of word.
  */

  let vowels = 'aeiouAEIOU';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let firstLetter = word[0];
  let isUpper = false;
  let punctuation = '';

  // Sets the isUpper flag to true if word begins with a capital letter.
  if (firstLetter === firstLetter.toUpperCase()) {
    isUpper = true;
  }

  // Checks if the last letter of word is punctuation.
  if (!alphabet.includes(word[word.length - 1])) {
    // If word has punctuation at the end, removes it and stores it so it can be added back on later. (This method is
    // used instead of simply taking the last character of word because it is not stated whether word can have
    // multiple punctuation marks at the end or not).
    for (let i = word.length - 1; i > 0; i--) {
      if (!alphabet.includes(word[i]) && alphabet.includes(word[i - 1])) {
        punctuation = word.slice(i);
        word = word.slice(0, i);
        break;
      }
    }
  }

  // If word begins with a vowel, concatenates the string 'way' to the end of word.
  if (vowels.includes(firstLetter)) {
    word += 'way';
  // If word begins with a consonant, iterates through word until a vowel is found, then removes all preceding
  // consonants and adds them to the end of word, then concatenates the string 'ay' to the end of word.
  } else {
    for (let i = 1; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        word = word.slice(i) + word.slice(0, i) + 'ay';
        break;
      }
    }
  }

  // If the original word began with a capital letter, the first letter of the current translated word is capitalized,
  // and all other letters are made lower case (because the original capital letter is now somewhere in the middle
  // of word).
  if (isUpper) {
    word = word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  // Adds the original punctuation back on to the end of word.
  word += punctuation;

  return word;
}


// Exercise 5
function morseCode(message) {
  /*
  message: string.
  returns: string containing the Morse code translation of message.
  */

  // Defines the translations used to convert message to Morse code.
  let translator = {
    'A': '.-',    'N': '-.',
    'B': '-...',  'O': '---',
    'C': '-.-.',  'P': '.--.',
    'D': '-..',   'Q': '--.-',
    'E': '.',     'R': '.-.',
    'F': '..-.',  'S': '...',
    'G': '--.',   'T': '-',
    'H': '....',  'U': '..-',
    'I': '..',    'V': '...-',
    'J': '.---',  'W': '.--',
    'K': '-.-',   'X': '-..-',
    'L': '.-..',  'Y': '-.--',
    'M': '--',    'Z': '--..',

    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----'
  };

  message = message.toUpperCase();

  // Splits message into an array of its characters, then filters out any element that is not in the translator object,
  // then maps the remaining characters to their Morse code translation and stores them in an array.
  let translatedMessage = message.split('')
      .filter(x => x in translator)
      .map(x => translator[x]);

  // Joins the Morse code translation for each translated character of message into one string, to produce the complete
  // translated message.
  return translatedMessage.join(' ');
}


// Exercise 6
function int2Text(num) {
  /*
  num: integer between 0 and 999 (inclusive).
  returns: string containing the English words for num.
  */

  // Defines the object used to convert numbers under 20 to words.
  let units = {
      0: '',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
  };

  // Defines the object used to convert multiples of 10 (excluding 10) to words.
  let tens = {
      2: 'twenty',
      3: 'thirty',
      4: 'forty',
      5: 'fifty',
      6: 'sixty',
      7: 'seventy',
      8: 'eighty',
      9: 'ninety',
  };

  if (num === 0) {
    return 'zero';
  }

  // Initializes the string that the return string will be built upon.
  let text = '';

  // Converts the 'hundreds' part of num into English words if it exists.
  if (num > 99) {
    let firstDigit = +num.toString()[0];
    text += units[firstDigit] + ' hundred ';
  }

  let lastTwoDigits = num % 100;

  // If the last 2 digits of num are bigger than 19, adds the English words for them to the return string.
  if (lastTwoDigits > 19) {
    let firstDigit = +lastTwoDigits.toString()[0];
    let secondDigit = +lastTwoDigits.toString()[1];
    text += tens[firstDigit] + ' ' + units[secondDigit];
  // If the last 2 digits of num are smaller than 20 (or if there is only 1 digit), adds the English word for them to
  // the return string.
  } else {
    text += units[lastTwoDigits];
  }

  // Returns the English words for num with leading and trailing whitespace removed (because there will be
  // a space at the end of text if num is a multiple of 100).
  return text.trim();
}


// Exercise 7
function missingComment(filename) {
  /*
  filename: string containing the name of a source file.
  returns: array of the functions in the file named filename that are not immediately preceded by a comment.
  */

  const fs = require('fs');

  let noCommentFuncs = [];

  // Reads the file and splits the contents into an array of individual lines.
  let fin = fs.readFileSync(filename, 'utf-8');
  let lines = fin.split('\n');

  // Stores the contents of the previous line. Initialized with a value of '' because there is no previous line when
  // checking the first line of the file.
  let prev_line = '';

  // Iterates through each line in the file. When a line beginning with a function definition is found, the previous
  // line is checked, and if that line does not begin with a comment, then the name of the function on the current line is
  // added to the array of functions with missing comments.
  let pos;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('function ') && !prev_line.startsWith('//')) {
      pos = lines[i].indexOf('(');  // The name of the function ends at the character before '('.
      noCommentFuncs.push(lines[i].slice(9, pos)); // The slice is started at index 9 because 'function ' is 9 characters long.
    }
    prev_line = lines[i];
  }
  return noCommentFuncs;
}


// Exercise 8
function consistentLineLength(filename, length) {
  /*
  filename: string containing the name of a file.
  length: positive integer.
  returns: the contents of the file named filename as an array of strings that are no longer than length.
  */

  const fs = require('fs');

  let consistentLines = [];  // Defines the array that will store the strings that do not exceed the maximum length.

  // Reads the file and splits the contents into an array of individual lines.
  let fin = fs.readFileSync(filename, 'utf-8');
  let lines = fin.split('\n');

  lines.pop();  // The last element is removed from the array of lines because it is whitespace.

  // lines is joined to form a string of space-separated words. The string is then split at each space to form an array
  // in which each element is a word from the input file.
  let wordList = lines
      .join(' ')
      .split(' ');

  // While wordList is not empty, iterates through wordList, concatenating the words from wordList into strings that do
  // not exceed the given maximum length. After a word is added to a string, it is removed from wordList.
  let line;
  while (wordList.length > 0) {
    line = wordList[0];  // Defines the string that the rest of the current line will be built upon.
    wordList.shift();  // Removes the element at index 0 from wordList.
    while (line.length < length && wordList.length > 0) {
      // Adds the next word from wordList to the current line if it will not make the line longer than length.
      if ((line + ' ' + wordList[0]).length <= length) {
        line = line + ' ' + wordList[0];
        wordList.shift();
      } else {
        break;
      }
    }
    consistentLines.push(line);
  }
  return consistentLines;
}


// Exercise 9
function knight(start, end, moves) {
  /*
  start: string of the form <letter><integer>, where <letter> is between a and h and <integer> is between 1 and 8.
  end: string of the form <letter><integer>, where <letter> is between a and h and <integer> is between 1 and 8.
  moves: non-negative integer.
  returns: true if a knight on an empty chessboard could move from start to end in at most the given number of moves,
    false otherwise.
  */

  if (moves === 0) {
    return false;
  }

  // Converts the given start and end positions into integer coordinates representing these positions (where each
  // integer is between 0 and 7).
  let asciiA = 'a'.charCodeAt(0); // Returns the ASCII code for 'a'.
  let startX = start.charCodeAt(0) - asciiA; // Converts the letter in start into an integer (where a=0,b=1,...,h=7).
  let startY = +start[1] - 1;  // Subtracts 1 from the number in start to make the coordinate between 0 and 7.
  let startAsInt = [startX, startY];

  let endX = end.charCodeAt(0) - asciiA;
  let endY = +end[1] - 1;
  let endAsInt = [endX, endY];

  // Defines the list of the relative different positions a knight can move to on a chessboard.
  let knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
  ];

  // Calls the checkMove function to determine if a knight could move from start to end within the given number of moves.
  return checkMove(startAsInt, endAsInt, moves, knightMoves);
}

function checkMove(start, end, numOfMoves, relativeMoves) {
  /*
  start: pair of integers (each between 0 and 7), representing a position on a chessboard.
  end: pair of integers (each between 0 and 7), representing a position on a chessboard.
  numOfMoves: positive integer.
  relativeMoves: array of pairs of integers representing the relative different positions a chess piece can move to
    on a chessboard.
  returns: true if a chess piece on an empty chessboard could move from start to end, using moves from relativeMoves, in
    at most numOfMoves moves, false otherwise.
  */

  // Creates an array of the possible positions on a chessboard that a piece could move to from start in 1 move, using
  // the moves from relativeMoves.
  let positions = relativeMoves.map((move) => [
    start[0] + move[0],
    start[1] + move[1],
  ]);

  numOfMoves -= 1;

  // Returns true if end is in the array of possible positions that a chess piece could move to from start in 1 move,
  // using moves from relativeMoves.
  if (positions.some(pos =>
      pos[0] === end[0] &&
      pos[1] === end[1]
  )) {
    return true;
  } else if (numOfMoves === 0) {
    return false;
  // If end is not in the array of possible positions that a piece could move to from start in 1 move, using the moves
  // from relativeMoves, and if there is at least 1 move remaining, then the checkMove function is called recursively, with
  // each position that the piece could reach in 1 move from start, using a move from relativeMoves, (inside the bounds of a
  // chessboard) as a new start position.
  } else {
    let validPositions = positions.filter(pos =>
        0 <= pos[0] && pos[0] <= 7 &&
        0 <= pos[1] && pos[1] <= 7
    );
    return validPositions.some(pos => checkMove(pos, end, numOfMoves, relativeMoves));
  }
}


// Exercise 10
function warOfSpecies(environment) {
  /*
  environment: array of equal-length strings representing a rectangle grid, with the characters in each string
    representing the cells of the grid. Each character in each string must be 'X', 'O' or '.', representing
    either a species ('X' or 'O') or an empty cell ('.'). This grid represents the current state of the environment.
  returns: array of strings representing the next state of the environment, based on each cell's interaction with its
    eight neighbours, according to the following rules:
    - An empty cell becomes non-empty if it is surrounded by at least two individuals of the same species - it becomes
      an individual of the most frequent species in its neighbourhood. If it is a draw between species, the cell
      remains empty.
    - A non-empty cell becomes empty if it is surrounded by more than six non-empty cells.
    - A non-empty cell becomes empty if it has less than three members of its species in its neighbourhood.
    - A non-empty cell becomes empty if it is surrounded by more members of the opposite species than members of
      its own species.
    - In any other circumstance, a cell does not change its value.
  */

  // Creates a new grid with the same dimensions as environment, except each row is an array instead of a string (the
  // fact that the elements of newGrid correspond to the elements of environment is not relevant).
  let newGrid = environment.map(row => row.split(''));

  let numOfRows = environment.length;
  let numOfColumns = environment[0].length;

  // Iterates through each cell of the grid, finds its neighbours, and applies the appropriate rule that determines
  // what the cell should contain in the next state of the environment.
  for (let row = 0; row < numOfRows; row++) {
    for (let column = 0; column < numOfColumns; column++) {
      let neighbours = findNeighbours(row, column, environment);

      // Counts the number of X cells and O cells in the current cell's neighbourhood.
      let [numOfX, numOfO] = countSpecies(neighbours);

      // Applies the rules to determine what the next state of the environment should contain in position (row, column).
      newGrid[row][column] = applyRules(environment[row][column], numOfX, numOfO);
    }
  }

  newGrid = newGrid.map(row => row.join(''));  // Converts the array of strings in each row of newGrid into a string.

  return newGrid;
}

function findNeighbours(row, column, grid) {
  /*
  row: non-negative integer.
  column: non-negative integer.
  grid: array of equal-length arrays.
  returns: array containing all neighbours of the element at position (row, column) in grid.
  */

  let numOfRows = grid.length;
  let numOfColumns = grid[0].length;
  let neighbours = [];
  // Iterates through all neighbours of the current element and adds them to the neighbours array.
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Checks that the element exists in grid, and makes sure that an element is not added as its own neighbour.
      if (0 <= row + i && row + i < numOfRows &&
          0 <= column + j && column + j < numOfColumns &&
          !(i === 0 && j ===0)
      ) {
        neighbours.push(grid[row + i][column + j]);
      }
    }
  }
  return neighbours;
}

function applyRules(cell, numOfX, numOfO) {
  /*
  cell: string.
  numOfX: integer.
  numOfO: integer.
  returns: the updated value of cell, based on the rules specified in the description of the warOfSpecies function.
  */

  // Applies the first rule to the current cell if applicable.
  if (cell === '.' && (numOfX >= 2 || numOfO >= 2)) {
    if (numOfX > numOfO) {
      cell = 'X';
    } else if (numOfO > numOfX) {
      cell = 'O';
    }
  }
  // Applies the second rule to the current cell if applicable.
  else if (cell !== '.' && numOfX + numOfO > 6) {
    cell = '.';
  }
  // Applies the third rule to the current cell if applicable.
  else if ((cell === 'X' && numOfX < 3) ||
      (cell === 'O' && numOfO < 3)) {
      cell = '.';
  }
  // Applies the fourth rule to the current cell if applicable.
  else if ((cell === 'X' && numOfX < numOfO) ||
      (cell === 'O' && numOfO < numOfX)) {
      cell = '.';
  }

  return cell;
}

function countSpecies(neighbours) {
  /*
  neighbours: array.
  returns: array containing the number of times X and O appear in neighbours.
  */

  let numOfX = 0;
  let numOfO = 0;
  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i] === 'X') {
      numOfX++;
    } else if (neighbours[i] === 'O') {
      numOfO++;
    }
  }
  return [numOfX, numOfO];
}

module.exports = {
    reduceFraction: reduceFraction,
    isMagicDate: isMagicDate,
    sublist: sublist,
    pigLatin: pigLatin,
    morseCode: morseCode,
    int2Text: int2Text,
    missingComment: missingComment,
    consistentLineLength: consistentLineLength,
    knight: knight,
    warOfSpecies: warOfSpecies
}
