
var dom = c => document.createRange().createContextualFragment(c)
var copyURL = s => navigator.clipboard.writeText(s)



function setScreenView(elem)
{
  screen = document.getElementById("screen")
  screen.innerHTML = ""
  
  screen.appendChild(elem)
}


function home() { setScreenView(dom(routes["home"])) }
function playerName() { setScreenView(dom(routes["playerName"])) }

function requestGame()
{
  let name = document.querySelector('#player_name').value
  
  // Fetch Here to get url
  
  var url = "test"
  
  let html = routes["waitingForPlayer"](url)
  
  setScreenView(dom(html))
  
  startGame(url)
  
}

function startGame(url)
{
  // loop Fetch
  game_found = true
  if(game_found)
  {
    game(url)
  }
}

function game(url) // make it class
{
  let html = routes["game"](url)
  setScreenView(dom(html))
  generateSquares()
}


function generateSquares(dim=[3,3])
{
  board = document.getElementById("board"); if(!board) return
  board.innerHTML = ""
  
  for(let i = 0; i < dim[0]*dim[1]; i++)
  {
    square = document.createElement("div")
    square.className = "square"
    square.setAttribute("squareId", [(i/3) | 0, i%3])
    square.addEventListener('click', e => print(e.target.getAttribute('squareId')) )
    board.appendChild(square)
  }
}





