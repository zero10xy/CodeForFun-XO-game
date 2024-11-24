
var print   = s => console.log(s)
var dom     = c => document.createRange().createContextualFragment(c)
var copyURL = s => s != "" ? navigator.clipboard.writeText(s) : null


class ui
{
    constructor()
    {
        this.screen = document.getElementById("screen")
        this.url = ""
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
        
        let html = routes["waitingForPlayer"]
        this.setScreenView(dom(html))
    }
    
    requestGame()
    {
        this.game.start()
    }
    
    play_again()
    {
        this.game.request_play()
    }
    
    sync_game()
    {
        this.game.request_status()
    }
    
    endGame()
    {
        this.reset()
        this.game.reset()
        this.home()
    }
    
    // --- game UI
    
    reset()
    {
        this.resetUrl()
        this.url = ""
    }
    
    getUrlGameId()
    {
        let url = new URL(window.location.href);
        let uid = url.searchParams.get('game');
        return uid || "";
    }
    
    setUrlGameId(uid) {
        let curl = new URL(window.location.href);
        curl.searchParams.set('game', uid);
        window.history.pushState({}, '', curl);
        this.setUrlView(window.location.href)
    }
    
    setUrlView(url)
    {
        let linkView = document.querySelector("#game_link")
        if(linkView) linkView.innerHTML = url
        this.url = url
    }
    
    resetUrl()
    {
        let url = window.location.href;
        url = url.split('?')[0];
        window.history.replaceState({}, document.title, url);
    }
    
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
        let contents = XandO[c == "X" ? 1 : (c == "O" ? 2 : 0)] // 0:blank, 1:X, 2:O
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
