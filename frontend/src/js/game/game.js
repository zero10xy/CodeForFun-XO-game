sleep = (ms=1000) => new Promise(resolve => setTimeout(resolve, ms));


class Game
{
    constructor(ui)
    {
        this.ui = ui
        
        this.state = {
            "opponent": "player_name",
            "board" : [[],[],[]],
            "yourTurn": false,
            "winner": "-"
        }
        this.details = {
            "unique_id" : "",
            "player_id": "",
            "role": ""
        }
    }
    
    start()
    {
        this.request_game()
    }
    
    // --- game
    
    move(y, x)
    {
        if(this.state.yourTurn && this.state.winner == "-")
        {
            this.ui.move(this.details.role, [y, x]) // speed
            // this.state = 
            this.request_move([y, x])
        }
    }
    
    // --- html request
    
    async request_game()
    {
        let player_name = this.ui.player_name
        let game_uid = this.details.unique_id
        let player_id = this.details.player_id
        
        if(game_uid == "")
        {
            game_uid = this.ui.getUrlGameId() || ""
        }
        
        let res = await this.post("/game", {
            "player_name": player_name,
            "game_uid": game_uid,
            "player_id": player_id,
            "reason": "create game"
        })
        
        this.details = await res
        await this.ui.setUrlGameId(this.details.unique_id)
        
        await this.request_play()
        
    }
    
    
    request_play()
    {
        print("waiting")
        
        this.post("/play",
            { ...this.details,"reason": "waiting_for_player" }
        )
        .then(res => {
            if(res.message == "!player") return sleep().then(() => this.request_play())
            else {
                this.state = res ? res : this.state
                this.ui.loadBoard();
                this.updateUi();
                this.request_status();
            }
        })
        
    }
    
    request_status()
    {
        print("sync")
        
        this.post("/sync",
            { ...this.details,"reason": "sync" }
        )
        .then(res => {
            this.state = res ? res : this.state
            this.updateUi()
            if(this.state.winner == "-") return sleep().then(() => this.request_status())
            else {
                this.state = res
                this.updateUi()
                this.ui.gameOver()
            }
        })
        
    }
    
    
    async request_move(move)
    {
        
        let res = this.post("/move", 
            { ...this.details,"move": move }
        )
        
        return res
    }
    
    // --- ui
    
    updateUi()
    {
        this.setHeading();
        this.updateBoard();
    }
    
    setHeading()
    {
        let d = this.state
        let s = ""
        if(d.winner == "-") s = (d.yourTurn ? "Your" : d.opponent) + " Turn:"
        else {
            if(d.winner == "draw") s = "Draw!"
            else if(d.winner == this.details.role) s = "You Win!"
            else s = d.opponent + " Win!"
        }
        
        this.ui.setHeading(s)
    }
    
    updateBoard()
    {
        this.ui.updateBoard(this.state.board);
    }
    
    // --- fetch
    
    post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => {
            if(!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
    }
}


