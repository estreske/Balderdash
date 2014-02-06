var App = function(){
    this.fetch();
  }

  App.prototype.fetch = function(){

    var pathName = window.location.pathname;

    $.ajax({
      url: "/games/" + pathName.split("/")[2],
      dataType: 'json',
      method: 'get',
      success: function(data){
        var game = new Game(data["game_id"], data["in_session"]);
        var gameView = new GameView(game);
  // gameView.render();

  var playerView = new PlayerView();
  var players = data["players"];
  for (i in players){
    var game_id = pathName.split("/")[2];
    var player_id = i;
    var score = players[i].score;
    var name = players[i].name;
    var player = new Player(game_id, score, name, player_id);
    playerView.players.push(player);
  };
  console.log(playerView.players);
  console.log(game);
}
});
  }
  function Game(id, in_session){
    this.id = id;
    this.in_session = in_session;
  }

  Game.prototype = {
    joinGame: function(){
  //ajax call to '/player/create'
}
}

function GameView(game){
  // store the relevant dom elements as this.variables
  this.setSync();
}

GameView.prototype = {
  initialize: function() {
    PlayerView.render()
  // PlayerView.render() to create table
  // if user == game.players[0] << this won't work -- how do we get this logic to work?
  // startGame Button // on('click'), beginRound()
  // else
  // display joinButton // on('click', function(){
  // game.joinGame()
  // render whirlybird
  // setFetch()
  //})
},

beginRound: function(){
  $.ajax({
    url: "/games/" + pathName.split("/")[2] + "/round",
    dataType: 'json',
    method: 'get',
    success: function(data){
    var game_id = data["game_id"];
    var word = data["word"];
    var round_id = data["round_id"];
    var round = new Round(game_id, word, round_id);
    var view = new RoundView(round)
    // render RoundView
  // make ajax request to fill Round with data
  // render word << SHOULD THIS CALL A DIFFERENT FUNCTION TO RENDER THE WORD? A ROUND FUNCTION?
}
})
},
finishRound: function(){
  // render results
  // render newRoundButton // on('click') this.beginRound()
},
renderWaiting: function(){

  $('<i>').addClass("fa fa-refresh fa-spin fa-5x").append('body');//future change body to div class name
    // render whirlybird
    this.setFetch();
  // render whirlybird
  // this is called by on.click on joinButton
},
// sync: function(){
//   var self = this;
//     $.ajax({
//       url: "/games/" + pathName.split("/")[2] + '/',
//       dataType: 'json',
//       method: 'get',
//       success: function(data){
//         if (data.status === 'in_session'){
//           clearInterval(self.interval); 
//           location.reload();
//         }
//     }
//   })
//   }

sync: function(){
  var pathName = window.location.pathname;
  var self = this;

  $.ajax({
    url: "/games/" + pathName.split("/")[2] + "/begin",
    dataType: 'json',
    method: 'get',
    success: function(data){
      console.log(data);
        if (data.status === 'in_session'){
          clearInterval(self.interval); 
          clearInterval(PlayerView.interval);
          location.reload();
        }
    }
  })
},

setSync: function(){
  var self = this;
  this.interval = setInterval(function(){self.sync()},1000);
  
}
};

function PlayerView(){
  this.players = [];
  // store the relevant dom elements as this.variables
}

PlayerView.prototype = {
  fetch: function(){
  var pathName = window.location.pathname;
  var self = this;

  $.ajax({
    url: "/games/" + pathName.split("/")[2] + "/players",
    dataType: 'json',
    method: 'get',
    success: function(data){
      console.log(data)
      if (data.status === 'more_players'){
          PlayerView.players = [];
          var players = data["players"];
        for (i in players){
          var game_id = pathName.split("/")[2];
          var player_id = i;
          var score = players[i].score;
          var name = players[i].name;
          var player = new Player(game_id, score, name, player_id);
          playerView.players.push(player);
        };
          
        }
    }
})
},
setSync: function(){
  var self = this;
  this.interval = setInterval(function(){self.sync()},1000);
},
render: function(){
  var table = $('<table>');

    $(this.players).each(function(index, player) {
      table.append(player.render());
    });

    return table;
}
}


function Player(game_id, score, name, player_id){
  this.game_id = game_id;  //  ***** ASK TOMORROW ****** game v. game.id
  this.score = score;
  this.name = name;
  this.player_id = player_id;
}

Player.prototype = {
  render: function(){
    var table_row = $('<tr>');
  var table_name_cell = $('<td>').text(this.name);
  var table_score_cell = $('<td>').text(this.score);
  table_row.append(table_name_cell).append(table_score_cell);
  return table_row;
  // creates tr
}
}

function Round(game_id, word, round_id){
  this.game_id = game_id;  // ***** ASK TOMORROW ******
  this.word = word;
  this.round_id = round_id;
}

Round.prototype = {
submit: function(){
  // ajax call to 'definition/create'
  // put submission in database
}
}


function RoundView(){
  // store the relevant dom elements as this.variables
  // this.wordElement = $("<div>").text(round.word);
    this.setSync();
}

RoundView.prototype = {
renderWaiting: function(){
  $('<i>').addClass("fa fa-refresh fa-spin fa-5x").append('body');//future change body to div class name
    // render whirlybird
    this.setFetch();
  // render whirlybird
  // call setFetch()
},
renderInput: function(){
  var self = this;
    var word_container = $('div').addClass('word-container').text(this.round.word);
    var def_field = $('<textarea>');
    var def_submit_btn = $('<button>').addClass('btn btn-primary');
    var def_input_container = $('<div>').addClass('def-input-container').append(def_field).append(def_submit_btn)
    $('body').append(word_container);
    def_submit_btn.on('click', function(){
      self.renderWaiting();
      self.round.submit();
    });
},
sync: function(){
    var pathName = window.location.pathname;
    var self = this;
    $.ajax({
      url: "/games/" + pathName.split("/")[2]+ '/rounds',
      dataType: 'json',
      method: 'get',
      success: function(data){
        if (data.status === 'all_submitted'){
          clearInterval(self.interval); 
          location.reload();
        }
    }
  })
},
setSync: function(){
  var self = this;
  this.interval = setInterval(function(){self.sync()},1000);
},
}

function Definition(round_id, content, id){
  this.round_id = round_id; // ***** ASK TOMORROW ******
  this.content = content;
  this.id = id;
}

Definition.prototype = {
  render: function(){

    var def_content = $('<li>').text(this.content);
    def_content.on('click', function(){
      this.pick();
    });
  // render li
    return def_content;
  // render li
  // on('click', this.pick())
},
pick: function(){
  // ajax call to '/picks/create'
},
add: function(){
  // Make the AJAX call to create a new round
  // returns json data on success
}

}


function DefinitionView(){
  // store the relevant dom elements as this.variables
    this.setSync();
}

DefinitionView.prototype = {
  setSync: function(){
    var self = this;
    this.interval = setInterval(function(){self.sync()},1000);
  },
  fetch: function(){  

  },
  render: function(){
    var def_container = $('<ul>').addClass('def-container');
    $(this.definitions).each(function(index, definition) {
      def_container.append(definition.render());
    });
  // render ul
  },
  sync: function(){
  var self = this;
  var pathName = window.location.pathname;
    $.ajax({
      url: "/games/" + pathName.split("/")[2] + '/picks',
      dataType: 'json',
      method: 'get',
      success: function(data){
        if (data.status === 'all_picked'){
          clearInterval(self.interval); 
          location.reload();
        }
    }
  })
  },

submitDefinition: function(){
  // takes user input and creates an entry in the database
}
}

  // We don't have a picks and picksView because we are
  // rendering them in results

  // We don't have users and UserView

  $(function(){
    var pathName = window.location.pathname;
    if (pathName.split("/").length > 2 && pathName.split("/")[1] == "games"){
      new App();
      if ($('#whirlybird1') != []){
        new(GameView);
      }
    else if  ($('#whirlybird2') != []) {
      new(RoundView);
    }
    else if ($('#whirlybird3') != []){
      new(DefinitionView);
  }
    }
  });
