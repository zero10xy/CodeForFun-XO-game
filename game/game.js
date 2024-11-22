var print = s => console.log(s)



class Game
{
constructor(uid="ADD UID GENERATOR", dim=[3,3])
    {
        this.unique_id = uid
        this.dim = dim
        this.board = Array.from({ length: dim[0] }, () => Array(dim[1]).fill(0));
        this.players = []
        this.Xturn = true
        this.moveIndex = 0
        // this.moves = []
        this.winner = "-" // values = ["X", "O", "draw", "-"] where "-" mean game pending
    }
    
    // --- Players
    
    setPlayer(name, role)
    {
        if(role == 0) { this.players[0] = name } // 0: X
        if(role == 1) { this.players[1] = name } // 1: O

        return this;
    }
    
    addPlayer(name)
    { 
        if(this.players.length < 2)
            this.setPlayer(name, this.players.length);
        else
            print("cannot add more than 2 players");

        return this;
    }
    
    // --- Move
    
    setMove(role, at) { this.board[at[0]][at[1]] = role == "X" ? 1 : 2 }
    
    get(at) { return this.board[at[0]][at[1]] }
    
    isTurn(role) { return (this.Xturn && role=="X") || (!this.Xturn && role=="O") }
    
    isInsideBoard(at) { return at.map(e => e < this.dim[0] && e >= 0).every(Boolean) }
    
    isValidMove(at) { return this.isInsideBoard(at) && this.get(at) == 0 }
    
    move(r, at)
    {
        if(this.isTurn(r) && this.isValidMove(at))
        {
            this.setMove(r, at);
            this.Xturn = !this.Xturn;
            this.moveIndex++
            // this.moves.push([r, at])
            return true
        }
        else return false
    }
    
    // --- Arrays
    
    transpose(arr) { return arr[0].map((e, i) => arr.map(row => row[i])); }
    
    diagonals(arr) { return [ arr.map((row, i) => row[i]), arr.map((row, i) => row[arr.length - i - 1]) ] }
    
    // --- Validation
    
    checkLine(arr)
    {
        if(arr.every(e => e == 1)) return "X"   // [1,1,1]
        if(arr.every(e => e == 2)) return "O"   // [2,2,2]
        return "-"                              // else "-"
    }
    
    checkRows(arr) { return arr.map(l => this.checkLine(l)) } // for each rows check line
    
    isOver(r, at)
    {
        let rows = this.checkRows(this.board)
        let cols = this.checkRows(this.transpose(this.board))
        let diag = this.checkRows(this.diagonals(this.board))
        
        let winner = [...rows, ...cols, ...diag].filter(s => s !="-")
        let index = [rows, cols, diag].map(e => e.findIndex(s => s!="-") )
        
        let result = "-"
        if(winner.length > 0) result = winner[0]
        else { if(this.moveIndex >= this.dim[0] * this.dim[1]) result = "draw" }
        
        this.winner = result
        
        return {
            "game": this.unique_id,
            "move": {"index": this.moveIndex, "role":r, "pos":at},
            "winner": result, // ["X", "O", "draw", "-"]
            "win_index": {
                "row":index[0],
                "col":index[1],
                "diag":index[2]
            }
        }
    }
    
    
    // --- Main
    
    gameInfo()
    {
        return {
            "uid": this.unique_id,
            "dim": this.dim,
            "players": { "X": this.players[0], "O": this.players[1] },
            "winner": this.winner,
            "board": this.board,
            }
    }
    
    makeMove(r, at)
    {
        if(this.winner == "-" && this.move(r, at))
        {
            return this.isOver(r, at)
        }
        else return false
    }
}




// 
/* debug

g = new Game()

g.addPlayer("player1")
g.addPlayer("player2")

print( g.makeMove("X", [0,1]) )
print( g.makeMove("O", [0,2]) )

print( g.makeMove("X", [1,1]) )
print( g.makeMove("O", [1,2]) )

print( g.makeMove("X", [2,1]) )
print( g.makeMove("O", [2,2]) )

print( g.makeMove("X", [1,1]) )
print( g.makeMove("O", [1,2]) )

print( {"board": g.board} )
print( {"gameInfo": g.gameInfo()} )

// */



// optimization - // only check rows and cols connected to position X & O placed // find which diag index fall in (isOver()->diag) - function whichDiag(at) { let first = false, second = false; if(at[0] == at[1]) {first = true}; if((at[0] + at[1]) == this.board.length) {second = true}     if(first && second) return null; if(first) {return 0} if(second) {return 1} return -1; }

