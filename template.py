# Exercise 1
def reduceFraction(num, den):
    """
    num: integer.
    den: integer.
    returns: the fraction num/den reduced to its lowest terms.
    """
    import math

    # Uses the gcd function of the math module to find the greatest common denominator of num and den.
    gcd = math.gcd(num, den)

    # The lowest terms of the fraction num/den are found by dividing num and den by their greatest common denominator.
    return int(num / gcd), int(den / gcd)


# Exercise 2
def isMagicDate(day, month, year):
    """
    day: positive integer.
    month: positive integer.
    year: positive integer.
    returns: True if day/month/year is a magic date, False otherwise. (A magic date is a date where the day multiplied
        by the month is equal to the last two digits of the year).
    """

    return day * month == year % 100  # year % 100 returns the last two digits of year.


# Exercise 3
def sublist(l):
    """
    l: list.
    returns: list containing all sublists of l.
    """

    # The empty list is a sublist of any list, so the list of sublists is defined to contain the empty list.
    sublists = [[]]

    length = len(l)

    # Iterates through the list l and finds all sublists by taking every possible slice of l (except the empty list).
    for i in range(length):
        for j in range(i + 1, length + 1):
            new_sublist = l[i:j]
            sublists.append(new_sublist)
    return sublists


# Exercise 4
def pigLatin(word):
    """
    word: string containing an English word (any punctuation must be at the end of the word, and only the first letter
        may be upper case).
    returns: string representing the Pig Latin translation of word.
    """

    vowels = 'aeiouAEIOU'
    first_letter = word[0]
    is_upper = False
    punctuation = ''

    if first_letter.isupper():
        is_upper = True

    # Checks if the last letter of word is punctuation.
    if not word[-1].isalpha():
        # If word has punctuation at the end, removes it and stores it so it can be added back on later. (This method
        # is used instead of simply taking the last character of word because it is not stated whether word can have
        # multiple punctuation marks at the end or not).
        for i in range(len(word) - 1, 1, -1):
            if not word[i].isalpha() and word[i - 1].isalpha():
                punctuation = word[i:]
                word = word[:i]
                break

    # If word begins with a vowel, concatenates the string 'way' to the end of word.
    if first_letter in vowels:
        word += 'way'
    # If word begins with a consonant, iterates through word until a vowel is found, then removes all preceding
    # consonants and adds them to the end of word, then concatenates the string 'ay' to the end of word.
    else:
        for i in range(1, len(word)):
            if word[i] in vowels:
                word = word[i:] + word[:i] + 'ay'
                break

    # If the original word began with a capital letter, the first letter of the current translated word is capitalized,
    # and all other letters are made lower case (because the original capital letter is now somewhere in the middle of
    # word).
    if is_upper:
        word = word.capitalize()

    # Adds the original punctuation back on to the end of word.
    word += punctuation

    return word


# Exercise 5
def morseCode(message):
    """
    message: string.
    returns: string containing the Morse code translation of message.
    """

    # Defines the dictionary used to translate message to Morse code.
    translator = {
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
    }

    message = message.upper()

    # Creates a list containing the Morse code translation for each English letter and number in message.
    translated_message = [translator[char] for char in message if char in translator]

    # Joins the Morse code translation for each translated character of message into one string, to produce the complete
    # translated message.
    return ' '.join(translated_message)


# Exercise 6
def int2Text(num):
    """
    num: integer between 0 and 999 (inclusive).
    returns: string containing the English words for num.
    """

    # Defines the dictionary used to convert numbers under 20 to words.
    units = {
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
    }

    # Defines the dictionary used to convert multiples of 10 (excluding 10) to words.
    tens = {
        2: 'twenty',
        3: 'thirty',
        4: 'forty',
        5: 'fifty',
        6: 'sixty',
        7: 'seventy',
        8: 'eighty',
        9: 'ninety',
    }

    if num == 0:
        return 'zero'

    # Defines the string that the return string will be built upon.
    text = ''

    # Converts the 'hundreds' part of num into English words if it exists.
    if num > 99:
        first_digit = int(str(num)[0])
        text += units[first_digit] + ' hundred '

    last_two_digits = num % 100

    # If the last 2 digits of num are bigger than 19, adds the English words for them to the return string.
    if last_two_digits > 19:
        first_digit = int(str(last_two_digits)[0])
        second_digit = int(str(last_two_digits)[1])
        text += tens[first_digit] + ' ' + units[second_digit]
    # If the last 2 digits of num are smaller than 20 (or if there is only 1 digit), adds the English word for them to
    # the return string.
    else:
        text += units[last_two_digits]

    # Returns the English words for num with leading and trailing whitespace removed (because there will be
    # a space at the end of text if num is a multiple of 100).
    return text.strip()


# Exercise 7
def missingComment(filename):
    """
    filename: string containing the name of a source file.
    returns: list of the functions in the file named filename that are not immediately preceded by a comment.
    """

    no_comment_funcs = []

    fin = open(filename)

    # Stores the contents of the previous line. Initialized with a value of '' to prevent an unassigned variable error
    # occurring if the first line of the file is a function definition.
    prev_line = ''

    # Iterates through each line in the file. When a line beginning with a function definition is found, the previous
    # line is checked, and if that line does not begin with a comment, then the name of the function on the current line
    # is added to the list of functions with missing comments.
    for line in fin:
        if line.startswith('def ') and not prev_line.startswith('#'):
            pos = line.find('(')  # The name of the function ends at the character before '('.
            no_comment_funcs.append(line[4:pos])  # The slice is started at index 4 because 'def ' is 4 characters long.
        prev_line = line
    return no_comment_funcs


# Exercise 8
def consistentLineLength(filename, length):
    """
    filename: string containing the name of a file.
    length: positive integer.
    returns: the contents of the file named filename as a list of strings that are no longer than length.
    """

    consistent_lines = []  # Defines the list that will hold the strings that do not exceed the maximum length.

    fin = open(filename)

    word_list = fin.read().split()  # Splits the contents of fin into a list of individual words.

    # While word_list is not empty, iterates through word_list, concatenating the words from word_list into strings that
    # do not exceed the given maximum length. After a word is added to a string, it is removed from word_list.
    while len(word_list) > 0:
        line = word_list[0]  # Defines the string that the rest of the current line will be built upon.
        del word_list[0]
        while len(line) < length and len(word_list) > 0:
            # Adds the next word from word_list to the current line if it will not make the line longer than length.
            if len(line + ' ' + word_list[0]) <= length:
                line = line + ' ' + word_list[0]
                del word_list[0]
            else:
                break
        consistent_lines.append(line)
    return consistent_lines


# Exercise 9
def knight(start, end, moves):
    """
    start: string of the form <letter><integer>, where <letter> is between a and h and <integer> is between 1 and 8.
    end: string of the form <letter><integer>, where <letter> is between a and h and <integer> is between 1 and 8.
    moves: non-negative integer.
    returns: True if a knight on an empty chessboard could move from start to end in at most the given number of moves,
        False otherwise.
    """

    if moves == 0:
        return False

    # Converts the given start and end positions into integer coordinates representing these positions (where each
    # integer is between 0 and 7).
    start_x = ord(start[0]) - ord('a')  # Converts the letter from start into an integer (where a=0,b=1,...,h=7).
    start_y = int(start[1]) - 1  # Subtracts 1 from the number in start to make the coordinate between 0 and 7.
    start_as_int = (start_x, start_y)

    end_x = ord(end[0]) - ord('a')
    end_y = int(end[1]) - 1
    end_as_int = (end_x, end_y)

    # Defines the list of the relative different positions a knight can move to on a chessboard.
    knight_moves = [
        (-2, -1),
        (-2, 1),
        (-1, 2),
        (1, 2),
        (2, 1),
        (2, -1),
        (1, -2),
        (-1, -2)
    ]

    # Calls the check_move function to determine if a knight could move from start to end within the given number of
    # moves
    return check_move(start_as_int, end_as_int, moves, knight_moves)


def check_move(start, end, num_of_moves, relative_moves):
    """
    start: pair of integers (each between 0 and 7), representing a position on a chessboard.
    end: pair of integers (each between 0 and 7), representing a position on a chessboard.
    num_of_moves: positive integer.
    relative_moves: list of pairs of integers representing the relative different positions a chess piece can move to on
        a chessboard.
    returns: True if a chess piece on an empty chessboard could move from start to end, using moves from relative_moves,
        in at most num_of_moves moves, False otherwise.
    """

    # Creates a list of the possible positions on a chessboard that a piece could move to from start in 1 move, using
    # the moves from relative_moves.
    positions = [(start[0] + move[0], start[1] + move[1]) for move in relative_moves]

    num_of_moves -= 1

    # Returns True if end is in the list of possible positions that a piece could move to from start in 1 move, using
    # moves from relative_moves.
    if end in positions:
        return True
    elif num_of_moves == 0:
        return False
    # If end is not in the list of possible positions that a piece could move to from start in 1 move, using moves from
    # relative_moves, and if there is at least 1 move remaining, then the check_move function is called recursively,
    # with each position that the piece could reach in 1 move from start, using a move from relative_moves, (inside the
    # bounds of a chessboard) as a new start position.
    else:
        valid_positions = [pos for pos in positions if 0 <= pos[0] <= 7 and 0 <= pos[1] <= 7]
        return any(check_move(pos, end, num_of_moves, relative_moves) for pos in valid_positions)


# Exercise 10
def warOfSpecies(environment):
    """
    environment: list of equal-length strings representing a rectangle grid, with the characters in each string
        representing the cells of the grid. Each character in each string must be 'X', 'O' or '.', representing
        either a species ('X' or 'O') or an empty cell ('.'). This grid represents the current state of the environment.
    returns: list of strings representing the next state of the environment, based on each cell's interaction with its
        eight neighbours, according to the following rules:
        - An empty cell becomes non-empty if it is surrounded by at least two individuals of the same species - it
          becomes an individual of the most frequent species in its neighbourhood. If it is a draw between species, the
          cell remains empty.
        - A non-empty cell becomes empty if it is surrounded by more than six non-empty cells.
        - A non-empty cell becomes empty if it has less than three members of its species in its neighbourhood.
        - A non-empty cell becomes empty if it is surrounded by more members of the opposite species than members of its
          own species.
        - In any other circumstance, a cell does not change its value.
    """

    num_of_rows = len(environment)
    num_of_columns = len(environment[0])

    # Creates a new grid with the same dimensions as environment, except each row is a list instead of a string.
    new_grid = [['' for column in range(num_of_columns)] for row in range(num_of_rows)]

    # Iterates through each cell of the grid, finds its neighbours, and applies the appropriate rule that determines
    # what the cell should contain in the next state of the environment.
    for row in range(num_of_rows):
        for column in range(num_of_columns):
            neighbours = find_neighbours(row, column, environment)

            num_of_X = neighbours.count('X')
            num_of_O = neighbours.count('O')

            # Applies the rules to determine what the next state of the environment should contain in position
            # (row, column).
            new_grid[row][column] = apply_rules(environment[row][column], num_of_X, num_of_O)

    # Converts the list of individual cells in each row into strings.
    new_grid = [''.join(row) for row in new_grid]

    return new_grid


def find_neighbours(row, column, grid):
    """
    row: non-negative integer.
    column: non-negative integer.
    grid: list of equal-length lists.
    returns: list of all neighbours of the element at position (row, column) in grid.

    """

    num_of_rows = len(grid)
    num_of_columns = len(grid[0])
    neighbours = []
    # Iterates through all neighbours of the current element and adds them to the neighbours list.
    for i in range(-1, 2):
        for j in range(-1, 2):
            # Checks that the element exists in grid, and makes sure that an element is not added as its own neighbour.
            if (0 <= row + i < num_of_rows and 0 <= column + j < num_of_columns) and not (i == 0 and j == 0):
                neighbours.append(grid[row + i][column + j])
    return neighbours


def apply_rules(cell, num_of_x, num_of_o):
    """
    cell: string.
    num_of_x: integer.
    num_of_o: integer.
    returns: the updated value of cell, based on the rules specified in the description of the warOfSpecies function.
    """

    # Applies the first rule to the cell if applicable.
    if cell == '.' and (num_of_x >= 2 or num_of_o >= 2):
        if num_of_x > num_of_o:
            cell = 'X'
        elif num_of_o > num_of_x:
            cell = 'O'
    # Applies the second rule to the cell if applicable.
    elif cell != '.' and num_of_x + num_of_o > 6:
        cell = '.'
    # Applies the third rule to the cell if applicable.
    elif ((cell == 'X' and num_of_x < 3) or
          (cell == 'O' and num_of_o < 3)):
        cell = '.'
    # Applies the fourth rule to the cell if applicable.
    elif ((cell == 'X' and num_of_x < num_of_o) or
          (cell == 'O' and num_of_o < num_of_x)):
        cell = '.'

    return cell
