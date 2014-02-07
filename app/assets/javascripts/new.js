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
      playerView = new PlayerView();  
    }
  });
}

function GameView(game){
  this.setSync();
}

GameView.prototype = {
  
  sync: function(){
    var pathName = window.location.pathname;
    var self = this;

    $.ajax({
      url: "/games/" + pathName.split("/")[2] + "/begin",
      dataType: 'json',
      method: 'get',
      success: function(data){
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
  this.tbody = $('#players tbody');
  this.setSync();
}

PlayerView.prototype = {

  sync: function(){
    var pathName = window.location.pathname;
    var self = this;

    $.ajax({
      url: "/games/" + pathName.split("/")[2] + "/players",
      dataType: 'json',
      method: 'get',
      success: function(data){
          self.players = [];
          var players = data["players"];

          for (i in players){
            var game_id = pathName.split("/")[2];
            var player_id = i;
            var score = players[i].score;
            var name = players[i].name;
            var player = new Player(game_id, score, name, player_id);
            self.players.push(player);
            self.render();
          }
      }
    })
  },

  setSync: function(){
    var self = this;
    this.interval = setInterval(function(){self.sync()},1000);
  },

  render: function(){
    var self = this;
    $(this.tbody).empty();
    $(this.players).each(function(index, player) {
      $(self.tbody).append(player.render());
    });
  }
}

function Player(game_id, score, name, player_id){
  this.game_id = game_id; 
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
  }
}

function RoundView(){
  this.setSync();
}

RoundView.prototype = {
  
  sync: function(){
    var pathName = window.location.pathname;
    var self = this;
    $.ajax({
      url: "/games/" + pathName.split("/")[2]+ '/picks',
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

  setSync: function(){
    var self = this;
    this.interval = setInterval(function(){self.sync()},1000);
  },
};

function Definition(id, content){
  this.id = id;
  this.content = content;
}

Definition.prototype = {
  render: function(){
    var $newform = $('<form method="post" action="/picks"><input name="authenticity_token" type="hidden" value="' + token + '"><input type="hidden" name="definition_id" value="' + this.id + '"><div class="cube"><div class="flippety"></div><div class="flop"><button class="btn-link" type="submit">' + this.content + '</button></div></div></div></form>')
    return $newform
  }
}

function DefinitionView(){
  var definitions = []
  this.$picklist = $('#pick-list')
  this.setSync();
}

DefinitionView.prototype = {

  setSync: function(){
    var self = this;
    this.interval = setInterval(function(){self.sync()},1000);
  },
  
  sync: function(){
    var self = this;
    var pathName = window.location.pathname;
    $.ajax({
      url: "/games/" + pathName.split("/")[2] + '/rounds',
      dataType: 'json',
      method: 'get',
      success: function(data){
        console.log(data);
        self.definitions = [];
        var definitions = data["definitions"];

        for (i in definitions){
          var id = i;
          var content = definitions[i];
          var definition = new Definition(id, content);
          self.definitions.push(definition);
          self.render();
        }
        if (data.status === 'all_submitted'){
          clearInterval(self.interval); 
          self.render();
          setTimeout(function(){self.$picklist.find('.cube').addClass('active')}, 1000);
          $('#whirlybird2').remove();
        }
      }
    })
  },
  render: function(){
    var self = this;
    this.$picklist.empty();
    $(this.definitions).each(function(index, definition) {
      self.$picklist.append(definition.render());
    });
  }
};

function Room(game_id, name){
  this.name = name;
  this.game_id = game_id;
}

Room.prototype = {

  render: function(){
    var $newli = $('<li>');
    $newli.html("<a href='/games/"+ this.game_id +"'>" + this.name + "'s Game Room</a>");
    return $newli;
  }
};

function RoomView(){
  var rooms = []
  this.$roomlist = $('ul#roomView');
  this.setSync();
}

RoomView.prototype = {

  render: function(){
    var self = this;
   self.$roomlist.empty();
    $(this.rooms).each(function(index, room) {
      self.$roomlist.append(room.render());
    });
  },

  sync: function(){
    var self = this;
    $.ajax({
      url: "/games",
      dataType: 'json',
      method: 'get',
      success: function(data){
          self.rooms = [];
          var rooms = data["games"];
          for (i in rooms){
            var game_id = i;
            var name = rooms[i];
            var room = new Room(game_id, name);
            self.rooms.push(room);
            self.render(); 
          }
      }
    })
  },

  setSync: function(){
    var self = this;
    this.interval = setInterval(function(){self.sync()},1000);
  }
};

$(function(){
  var pathName = window.location.pathname;
  var patharray = pathName.split("/");
  if ( patharray[2] && patharray[2] != '' ){
    var app = new App();


    if ($('#whirlybird1').length == 1){
      new GameView();
    }
    else if  ($('#whirlybird2').length == 1) {
      new DefinitionView();
    }
    else if ($('#whirlybird3').length == 1){
      new RoundView();
      $('#pick-list').remove();
    }
  }
  else if ( pathName.split("/").length <= 3 && pathName.split("/").length != 1 && pathName.split("/")[1] == "games"){
    new RoomView();
  }
});
