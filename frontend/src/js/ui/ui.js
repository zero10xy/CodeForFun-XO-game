
var dom     = c => document.createRange().createContextualFragment(c)
var copyURL = s => navigator.clipboard.writeText(s)


// --- ui scripts

class ui
{
  constructor()
  {
    this.screen = document.getElementById("screen")
    this.url = "/"
    this.player_name = ""
    this.home()
  }
  
  setScreenView(elem)
  {
    this.screen.innerHTML = "";
    this.screen.appendChild(elem) 
  }
  
  home()
  {
    let html = routes["home"]
    this.setScreenView(dom(html))
  }
  
  playerName()
  {
    let html = routes["playerName"](this.player_name)
    this.setScreenView(dom(html))
  }
  
  addPlayerName()
  {
    let name = document.querySelector('#player_name').value
    
    this.player_name = name;
    
    // Fetch Here to get url
    
  }
  
  requestGame()
  {
    var url = "test"
    this.url = url
    let html = routes["waitingForPlayer"](url)
    
    this.setScreenView(dom(html))
    
    this.startGame()
  }
  
  startGame()
  {
    // loop Fetch
    let game_found = true
    if(game_found)
    {
      this.game()
    }
  }
  
  game()
  {
    let html = routes["game"]
    this.setScreenView(dom(html))
    this.generateSquares()
    document.querySelector("#game_buttons").classList.remove("hide")
  }
  
  generateSquares(dim=[3,3])
  {
    let board = document.getElementById("board"); if(!board) return
    board.innerHTML = ""
    
    for(let i = 0; i < dim[0]*dim[1]; i++)
    {
      let square = document.createElement("div")
      square.className = "square"
      square.setAttribute("squareId", [(i/3) | 0, i%3])
      square.addEventListener('click', e => 
        print(e.target.getAttribute('squareId'))
      )
      board.appendChild(square)
    }
  }
}