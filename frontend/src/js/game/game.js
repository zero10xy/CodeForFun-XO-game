

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
    }
  }
  
  start()
  {
    if(this.details.unique_id == "")
    {
      this.details = this.request_game()
    }
    
    this.state = this.request_play(this.details)
    
    if(true)
    {
      this.ui.loadBoard()
    }
  }
  
  
  setHeading()
  {
    let d = this.state
    let s = ""
    if(d.winner == "-") s = (d.yourTurn ? "Your" : d.opponent()) + " Turn:"
    else s = d.winner + " Win!"
    this.ui.setHeading(s)
  }
  
  // --- html request
  
  request_game()
  {
    
  }
  
  request_play(details)
  {
    
  }
  
  request_move(move)
  {
    
  }
  
}


