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

function Game(id, in_session){
	var hash = this.add();
	this.id = hash["id"];
	this.in_session = hash["in_session"];
}

Game.prototype = {
	add: function() {
		// Make the AJAX call to create a new Game
		// returns json data on success
	},
	joinGame: function(){
		// ajax call to '/player/create'
		// instantiates a player in the database with the current user and the current game
	}
}

function GameView(){
	// store the relevant dom elements as this.variables
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
	}
} 

GameView.prototype = {
	beginRound: function(){
	// make ajax request to fill a new round with data 
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

}

function PlayerView(){
	// store the relevant dom elements as this.variables
}

PlayerView.prototype = {
	
	var players = []

	fetch: function(){
		$.ajax({
		url: '/games/players', 
		dataType: 'json', 
		method: 'get',
		success: function(data){
		//	if( data[:status] === 'more_players' ) { // IS THIS HOW TO DO THIS? 
		//	console.log(data[:players]);
		//	} else {
		//	console.log('waiting for the players to show up');
		//	};
		},
		error: function(data){
			console.log('error');
		}
	},
	setFetch: function(){
	setInterval(function() {
		this.fetch();
		}, 1000);
	},
	render: function(){
	// renders table
	},
}


function Player(game_id, score, name){
	this.game_id = game;  //  ***** ASK TOMORROW ****** game v. game.id
	this.score = score;
	this.name = name;
	this.id = id;
}

Player.prototype = {
	render: function(){
	// creates tr with player name and score 
		// have to get name from the player's user 
	}
}

function Round(){
	var hash = this.add();
	this.game = hash["game"];  // ***** ASK TOMORROW ****** game v. game.id
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
	this.round_id = hash["round_id"]; // ***** ASK TOMORROW ****** round v. round.id
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











