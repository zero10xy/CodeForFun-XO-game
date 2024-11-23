

class Game
{
  constructor(ui)
  {
    this.ui = ui
    
    this.state = {
      "opponent": "player_name",
      "board" : [[],[],[]],
      "yourTurn": true,
      "winner": "-" // name of player
    }
    this.details = {
      "unique_id"  : "",
      "player_id": "",
      "role": 0 // 0:X, 1:O
    }
  }
  
  start()
  {
    if(this.details.unique_id == "")
    {
      this.details = this.request_game()
    }
    
    this.state = this.request_play(this.details)
    
    if(true) this.ui.loadBoard()
  }
  
  // --- game
  
  move(y, x)
  {
    if(this.state.yourTurn && this.state.winner == "-")
    {
      this.ui.move(this.details.role, [y, x]) // speed
      this.state = this.request_move([y, x])
      this.updateUi()
    }
  }
  
  // --- html request
  
  request_game()
  {
    return this.details
  }
  
  request_play(details)
  {
    return this.state
  }
  
  request_move(move)
  {
    return this.state
  }
  
  // --- ui
  
  updateUi()
  {
    this.setHeading();
    // this.updateBoard();
  }
  
  setHeading()
  {
    let d = this.state
    let s = ""
    if(d.winner == "-") s = (d.yourTurn ? "Your" : d.opponent()) + " Turn:"
    else s = d.winner + (d.winner != "draw") ? " Win!" : "Draw!"
    this.ui.setHeading(s)
  }
  
  updateBoard()
  {
    this.ui.updateBoard(this.state.board);
  }
  
}


