var print = s => console.log(s)
var createUID = () => Array.from({ length: 16 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');



class Game
{
    constructor(dim=[3,3])
    {
        this.unique_id = createUID()
        this.dim = dim
        this.board = this.loadBoard()
        this.players = [] // 0:[name, role, uid]
        this.playersReady = new Set();
        this.Xturn = true
        this.moveIndex = 0
        this.winner = "-" // values = ["X", "O", "draw", "-"] where "-" mean game pending
        
        this.gameOver = false;
    }
    
    reset()
    {
        if(this.gameOver)
        {
            this.board = this.loadBoard()
            this.Xturn = true
            this.moveIndex = 0
            this.winner = "-"
            
            this.gameOver = false
        }
    }
    
    // --- Players
    
    playerLen() { return this.players.length }
    
    getPlayerById(id)
    {
        for(let p of this.players) { if(p[2] == id) return p; }
    }
    
    setPlayerReady(id) { this.playersReady.add(id) }
    
    getOpponent(selfId)
    {
        if(this.players[0][2] == selfId) return this.players[1]
        if(this.players[1][2] == selfId) return this.players[0]
    }
    
    switchPlayerRoles()
    {
        this.player[0][1] = this.player[1][1];
        this.player[1][1] = this.player[1][1] == "X" ? "O" : "X"
    }
    
    setPlayer(name, role="X")
    {
        if(role == "X" || role == "O")
        {
            let player = [name, role, createUID()]
            this.players.push(player); return player;
        }
    }
    
    addPlayer(name)
    {
        if(this.playerLen() == 0) { return this.setPlayer(name,        Math.random() > .5 ? "X" : "O" ) }
        if(this.playerLen() == 1) { return this.setPlayer(name, this.players[0][1] == "X" ? "O" : "X" ) }     // add squentially - if(this.players.length < 2) { return this.setPlayer(name, this.players.length); } print("cannot add more than 2 players"); return false
        return false
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
            return true
        }
        else return false
    }
    
    // --- Arrays
    
    transpose(arr) { return arr[0].map((e, i) => arr.map(row => row[i])); }
    
    diagonals(arr) { return [ arr.map((row, i) => row[i]), arr.map((row, i) => row[arr.length - i - 1]) ] }
    
    loadBoard() { return Array.from({ length: this.dim[0] }, () => Array(this.dim[1]).fill(0)); }
    
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
        
        if(result != "-")
        {
            this.gameOver = true
            this.playersReady.clear()
        }
        
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
            "players": this.players,
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
module.exports = Game


// 
/* debug


let g = new Game()

g.addPlayer("player1")
g.addPlayer("player2")

g.makeMove("X", [0,1])
g.makeMove("O", [0,2])

print( g.gameInfo() )

/*
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

