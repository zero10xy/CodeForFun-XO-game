
// 
const Game = require('./game')


class XO
{
    constructor()
    {
        this.games = {}
    }
    
    getGame(uid) { return this.games[uid] }
    setGame(game) { this.games[game.unique_id] = game; return game; }
    
    createGame() { return this.setGame(new Game()) }
    
    
    // --- html post
    
    request_game(info)
    {
        let game = info.game_uid == "" ? this.createGame() : this.getGame(info.game_uid)
        
        let playerInfo = info.player_id == "" ? game.addPlayer(info.player_name) : game.getPlayerById(info.player_id)
        
        if(!game) return {"message": "!game"}
        if(!playerInfo) return {"message": "!player"}
        
        return {
            "unique_id": game.unique_id,
            "player_id": playerInfo[2],
            "role": playerInfo[1]
        }
    }
    
    request_play(details)
    {
        let game = this.getGame(details.unique_id)
        let player = game.getPlayerById(details.player_id)
        
        game.setPlayerReady(player[2])
        
        if(game.playersReady.size != 2) return {"message": "!player"}
        
        let opponent = game.getOpponent(details.player_id)
        
        game.reset()
        
        return {
            "opponent": opponent[0],
            "board": game.board,
            "yourTurn": game.isTurn(player[1]),
            "winner": game.winner
        }
    }
    
    request_sync(details)
    {
        let game = this.getGame(details.unique_id)
        let player = game.getPlayerById(details.player_id)
        
        let opponent = game.getOpponent(details.player_id)
        
        return {
            "opponent": opponent[0],
            "board": game.board,
            "yourTurn": game.isTurn(player[1]),
            "winner": game.winner
        }
    }
    
    request_move(details)
    {
        let game = this.getGame(details.unique_id); if(!game) return {"message": "!game"}
        let player = game.getPlayerById(details.player_id)
        
        if(details.move !="") game.makeMove(player[1], details.move)
        
        let opponent = game.getOpponent(details.player_id)
        
        return {
            "opponent": opponent[0],
            "board": game.board,
            "yourTurn": game.isTurn(player[1]),
            "winner": game.winner
        }
    }
}



module.exports = XO

