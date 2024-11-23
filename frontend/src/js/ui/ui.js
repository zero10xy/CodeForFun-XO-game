
var print = s => console.log(s)
var dom     = c => document.createRange().createContextualFragment(c)
var copyURL = s => navigator.clipboard.writeText(s)


class ui
{
  constructor()
  {
    this.screen = document.getElementById("screen")
    this.url = "/"
    this.player_name = ""
    this.game = new Game(this)
    this.home()
  }
  
  setScreenView(elem)
  {
    this.screen.innerHTML = "";
    this.screen.appendChild(elem) 
  }
  
  // --- button scripts
  
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
  }
  
  requestGame()
  {
    let url = "test" // Fetch Here to get url
    this.url = url
    
    let html = routes["waitingForPlayer"](url)
    this.setScreenView(dom(html))
    
    this.game.start()
  }
  
  // --- game UI
  
  loadBoard()
  {
    let html = routes["game"]
    this.setScreenView(dom(html))
    this.generateSquares()    
  }
  
  generateSquares(dim=[3,3])
  {
    let board = document.getElementById("board"); if(!board) return
    board.innerHTML = ""
    
    for(let i = 0; i < dim[0]*dim[1]; i++)
    {
      let square = document.createElement("div")
      square.className = "square"
      square.setAttribute("squareId", `${(i/3)|0},${i%3}` )
      square.addEventListener('click', e => this.squareClick(e) )
      board.appendChild(square)
    }
  }
  
  squareClick(e)
  {
    let i = e.target.getAttribute('squareId'); if(!i) return
    let y = parseInt(i.split(",")[0])
    let x = parseInt(i.split(",")[1])
    this.game.move(y, x)
  }
  
  move(c, yx)
  {
    let contents = XandO[c+1] // 0:blank, 1:X, 2:O
    let square = document.getElementById("board").querySelector(`[squareId="${yx[0]},${yx[1]}"]`)
    square.innerHTML = contents
  }
  
  updateBoard(arr=[[0,0,0],[0,0,0],[0,0,0]])
  {
    let contents = XandO
    
    let board = document.getElementById("board");
    
    for(let y=0; y < arr.length; y++)
    {
      for(let x=0; x < arr.length; x++)
      {
        let square = board.querySelector(`[squareId="${y},${x}"]`);
        square.innerHTML = ""
        let c = dom(contents[arr[y][x]])
        square.appendChild(c)
      }
    }
  }
  
  setHeading(s)
  {
    document.querySelector("#game_info").innerHTML = s
  }
  
  gameOver()
  {
    document.querySelector("#game_buttons").classList.remove("hide")
  }
  
}