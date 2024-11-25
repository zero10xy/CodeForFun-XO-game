
var scripts = {
    
    "newGame"           : "page.playerName()",
    "addPlayerName"     : "page.addPlayerName()",
    "copyUrl"           : "copyURL(page.url)",
    
    "waitingForPlayer"  : "page.requestGame()", //
    "playAgain"         : "page.play_again()",
    "exit"              : "page.endGame()"
}


var routes = {

    "home": `
    
    <!-- Home -->
    <div class="display center XO_home">
        <div class="xo strong_head bold">XO game</div>
        <div class="xo body bold">(v1.0)</div>
        <div style="height: 30px;"></div>
        <div class="xo body button green center" onclick="${scripts['newGame']}">Start a New Game Now</div>
    </div>
    
    `,
    
    "playerName": (playerName) => `
    
    <!-- Player Name -->
    <div class="display center XO_playerName">
        <div class="xo head bold">Your Player Name:</div>
        <div style="height: 15px;"></div>
        <form id="player_info" class="center">
            <input value="${playerName}" maxlength="20" type="text" id="player_name" name="player_name" class="text_view strong_body bold center">
            <div style="height: 20px;"></div>
            <div class="xo body button green center" onclick="${scripts['addPlayerName']}">Next</div>
        </form>
    </div>
    
    `,
    
    "waitingForPlayer": `
    
    <!-- Waiting for Player -->
    <script>${scripts['waitingForPlayer']}</script>
    <div class="display center XO_waitingForPlayer">
        <div class="xo body bold">copy and share the link with your friend to start:</div>
        <div style="height: 15px;"></div>
        <div id="game_link" class="text_view body bold center">Getting Link...</div>
        <div style="height: 20px;"></div>
        <div id="game_link_copy" class="xo body button green center" onclick="${scripts['copyUrl']}">Copy</div>
    </div>
    
    `,
    
    "game": `
    
    <!-- Game -->
    <script>${scripts['game']}</script>
    <div class="display center XO_game">
        <div id="game_info" class="xo head bold">Game Starting...</div>
        <div style="height: 15px;"></div>
        
        <div class="board" id="board"></div>
        
        <div style="height: 15px;"></div>
        <div id="game_buttons" class="centerH hide">
            <div class="xo body button green center" onclick="${scripts['playAgain']}">Play Again</div>
            <div style="width: 15px;"></div>
            <div class="xo body button green center" onclick="${scripts['exit']}">Exit</div>
        </div>
    </div>
    
    `
}


var XandO = [
    "<div></div>",    // 0: blank
    "<div>×</div>",   // 1: X
    "<div>○</div>"    // 2: O
]
