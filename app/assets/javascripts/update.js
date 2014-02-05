// var fetch = function(){
// 	$.ajax({
// 		url: '/games/ajax',
// 		dataType: 'json',
// 		method: 'get',

// 		success: function(data){
// 			console.log(data);
// 		},
// 		error: function(data){
// 			console.log('error');
// 		}
// 	})
// };

// $(function(){
// 	setInterval(function() {
// 		fetch();
// 		}, 3000);
// });
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
				var score = players[i].score;
				var name = players[i].name;
				var player = new Player(game_id, score, name);
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
	this.setFetch();
}

GameView.prototype = {
	initialize: function() {
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
	// make ajax request to fill Round with data
	// render word << SHOULD THIS CALL A DIFFERENT FUNCTION TO RENDER THE WORD? A ROUND FUNCTION?
	},
	finishRound: function(){
	// render results
	// render newRoundButton // on('click') this.beginRound()
	},
	renderWaiting: function(){
	// render whirlybird
	// this is called by on.click on joinButton
	},

	fetch: function(){
		var pathName = window.location.pathname;

		$.ajax({
			url: "/games/" + pathName.split("/")[2],
			dataType: 'json',
			method: 'get',
			success: function(data){
			console.log(data);
			}
		})
	},

	setFetch: function(){
		setInterval(this.fetch(), 1000);
	}

}

function PlayerView(){
	this.players = [];
	// store the relevant dom elements as this.variables
}

PlayerView.prototype = {
	fetch: function(){
		$.ajax({
		url: '/games/players',
		dataType: 'json',
		method: 'get',
			success: function(data){
				if ( data[:status] === 'more_players' ) { // IS THIS HOW TO DO THIS?
				console.log(data[:players]);
				} else {
				console.log('waiting for the players to show up');
				};
			},
			error: function(data){
				console.log('error');
			},
		},
	},
	setFetch: function(){
	setInterval(function() {
		this.fetch();
		}, 1000);
	},
	render: function(){
		var table_row = $('<tr>');
		var table_name_cell = $('<td>').text(this.name);
		var table_score_cell = $('<td>').text(this.score);
		table_row.append(table_name_cell).append(table_score_cell);
		return table_row;
	}
}


function Player(game_id, score, name){
this.game_id = game_id;  //  ***** ASK TOMORROW ****** game v. game.id
this.score = score;
this.name = name;
}

Player.prototype = {
	render: function(){
	// creates tr
	}
}

function Round(){
	var hash = this.add();
	this.game = hash["game"];  // ***** ASK TOMORROW ******
	this.word = hash["word"];
	this.id = hash["id"];
}

Round.prototype = {
	add: function() {
		// Make the AJAX call to create a new round
		// returns json data on success
	},
	submit: function(){
		// ajax call to 'definition/create'
		// put submission in database
	}
}


function RoundView(round){
	// store the relevant dom elements as this.variables
	// this.wordElement = $("<div>").text(round.word);
}

RoundView.prototype = {
	renderWaiting: function(){
		// render whirlybird
		// call setFetch()
	},
	renderInput: function(){
		// appends input
		// append submitButton // on('click', function(){
			//renderWaiting()
			//Round.submit()
		//})
	},
	fetch: function(){
		// ajax listens to see if everyone has submitted
	},
	setFetch: function(){
	setInterval(function() {
		this.fetch();
		}, 1000);
	},
}

function Definition(){
	var hash = this.add()
	this.round_id = hash["round_id"]; // ***** ASK TOMORROW ******
	this.content = hash["content"];
	this.id = hash["id"];
}

Definition.prototype = {
	render: function(){
	// render li
	// on('click', this.pick())
	},
	pick: function(){
	// ajax call to '/picks/create'
	},
	add: function(){
	//	Make the AJAX call to create a new round
	// returns json data on success
	}

}


function DefinitionView(){
	// store the relevant dom elements as this.variables
}

DefinitionView.prototype = {
	setFetch: function(){
		setInterval(function() {
			this.fetch();
			}, 1000);
	},
	fetch: function(){
	//ajax listens to see if everyone has submitted
	},
	render: function(){
	// render ul
	},
}

// We don't have a picks and picksView because we are
// rendering them in results

// We don't have users and UserView

$(function(){
	var pathName = window.location.pathname;
	if (pathName.split("/").length > 2 && pathName.split("/")[1] == "games"){
		new App();
	}
});








