var routes = {

  "home": `
  
  <!-- Home -->
  <div class="display center XO_home">
    <div class="xo strong_head bold">XO game</div>
    <div class="xo body bold">(v1.0)</div>
    <div style="height: 30px;"></div>
    <div class="xo body button green center" onclick="playerName()">Start a New Game Now</div>
  </div>
  
  `,
  
  "playerName": `
  
  <!-- Player Name -->
  <div class="display center XO_playerName">
    <div class="xo head bold">Your Player Name:</div>
    <div style="height: 15px;"></div>
    <form id="player_info" class="center">
      <input type="text" id="player_name" name="player_name" class="text_view strong_body bold center">
      <div style="height: 20px;"></div>
      <div class="xo body button green center" onclick="requestGame()">Next</div>
    </form>
  </div>
  
  `,
  
  "waitingForPlayer": (url) => `
  
  <!-- Waiting for Player -->
  <div class="display center XO_waitingForPlayer">
    <div class="xo body bold">copy and share the link with your friend to start:</div>
    <div style="height: 15px;"></div>
    <div id="game_link" class="text_view body bold center">${url}</div>
    <div style="height: 20px;"></div>
    <div id="game_link_copy" class="xo body button green center" onclick="copyURL('${url}')">Copy</div>
  </div>
  
  `,
  
  "game": (url) => `
  
  <!-- Game -->
  <div class="display center XO_game">
    <div id="game_info" class="xo head bold">B Turn:</div>
    <div style="height: 15px;"></div>
    
    <div class="board" id="board"></div>
    
    <div style="height: 15px;"></div>
    <div id="game_buttons" class="centerH hide">
      <div class="xo body button green center" onclick="startGame(${url})">Play Again</div>
      <div style="width: 15px;"></div>
      <div class="xo body button green center" onclick="home()">Exit</div>
    </div>
  </div>
  
  `
}