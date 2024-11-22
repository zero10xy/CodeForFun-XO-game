> game/game.js documentation

# Summary

### Basic Usage
```js
g = new Game()

g.addPlayer('player1') // addPlayer 1st call = 'X'
g.addPlayer('player2') // addPlayer 2nd call = 'O'

g.makeMove('X', [0,1]) // place X at y0, x1
g.makeMove('O', [0,2]) // place O at y0, x2

```
check - [coordinate system](#coordinate-system--) <br><br>

### Output
```js
g.makeMove('X', [0,1])
```
```js
{
  'game': 'UNIQUE_ID',
  'move': {
    'index': 1,
    'role': 'X',
    'pos': [0,1]
  },
  'winner': '-', // game pending
  'win_index': {
    'row': -1, // no win at rows
    'col': -1, // no win at columns
    'diag': -1 // no win at diagonals 
  }
}
```

### Winner
```js
{
  'winner': 'X', // values: (X, O, draw, -)
  'win_index': {
    'row': -1,
    'col': 1, // win at second column, index: 1
    'diag': -1
  }
}
```

### Invalid Input
```js
g.makeMove('O', [999,999]) // returned : false
```

### Game Info
```js
let g = new Game()

g.addPlayer('player1')
g.addPlayer('player2')
g.makeMove('X', [0,1])
g.makeMove('O', [0,2])
```
```js
g.gameInfo()
```
```js
{
  'uid': 'UNIQUE_ID',
  'dim': [3, 3],
  'players': {
    'X': 'player1',
    'O': 'player2'
  },
  'winner': '-',
  'board': [
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0]
  ]
}
```


# Detailed

## Varibales :-
```js
board : [[000][000][000]]
players : []  // ['X-name', 'O-name']
Xturn : true  // is X's turn or not
moveIndex : 0 // increment (++) after each move
winner : '-'  // X, O, draw, and '-' mean game pending
```

## Coordinate System :-
```js
at = [0,1] // (y: 0, x: 1) // position
```
```js
d0 x0 x1 x2 d1
y0 [2, 1, 0],
y1 [1, 1, 0],
y2 [2, 2, 1]
d1          d0
```
```txt
indexes :        values :
 y: rows          0: blank
 x: cols          1: X
 d: diagonal      2: O
```


## Functions :-
```js
setPlayer(name, role) // role { 0: X, 1: O }
addPlayer(name)       // start from X then O

setMove(role, at)     // role { 0:blank, 1:X, 2:0 }
get(at)               // get square content    (0, 1, 2)
isTurn(role)          // isTurn('X')           (true, false)
isInsideBoard(at)     // isInsideBoard([1,1])  (true, false)
isValidMove(at)       // isValidMove([0,0])    (true, false)
move(role, at)        // move('X', [0,0])      (places X to pos 0,0)

transpose(arr)        // turn X to Y and Y to X of an array
diagonals(arr)        // get \ and / from square(□), (0: \), (1: /)
```

```py
checkLine(arr) - checks line 
eg1. [1,1,1] : 'X' 
eg2. [1,0,2] : '-' 
eg3. [0,0,0] : '-' 
```

```js
checkRows(arr) - checkLine for each rows
[0,1,2] <- Checks
[1,1,1] <- Each
[2,2,0] <- Rows
returned : ['-', 'X', '-']
```

```js
isOver(r, at)         // returns who win & where
makeMove('X', [0,0])  // makes move and return isOver() ->
{
  'game': 'UNIQUE_ID',
  'move': {
    'index': 1,
    'role': 'X',
    'pos': [0,1]
  },
  'winner': '-', // game pending
  'win_index': {
    'row': -1, // no win at rows
    'col': -1, // no win at columns
    'diag': -1 // no win at diagonals 
  }
}
```
