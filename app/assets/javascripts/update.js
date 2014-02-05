function Game(id, in_session){
	this.id = hash["id"];
	this.in_session = hash["in_session"];
};

function GameView(){
	//ajax call to listen for in_session
};

GameView.prototype = {
	initialize: function(){
	// call render from a PlayerView to create table to list players
	// if current user created game
		// startButton // on.click, beginRound()
	// elsif current user is not a player at all
		//  joinButton // on.click, push to database, renderWaiting()
	}
}

GameView.prototype = {
	beginRound: function(){
	// make ajax request to fill Round with data 
	},
	finishRound: function(){
	// render results
	// render New Round Button (and listener)
	},
	renderWaiting: function(){
	// render whirlybird
	// cal setFetch
	// this is called by on.click on joinButton
	},

}

function PlayerView(){
	// list all objects in DOM
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
	// renders table
	},
}


function Player(){
	var hash = this.add();
	this.game = hash["game"];  // ***** ASK TOMORROW ******
	this.score = hash["score"];
	this.name = hash["name"]; // ***** WE NEED TO PULL THIS FROM USER ******
	this.id = hash["id"];
}

Player.prototype = {
	render: function(){
	// creates <tr>
	// tr.html(this.name)
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
	// returns json data on succeess
	},
}

function RoundView(round){
	// store the relevant dom elements as this.variables
	// this.wordElement = $("<div>").text(round.word);
}

RoundView.prototype = {
	renderWaiting: function(){
	// render whirlybird
	// this is called by on.click on submit.button
	// call setFetch
	},
	renderInput: function(){
	// appends input 
	// append submit button
	},
	fetch: function(){
	//ajax listens to see if everyone has submitted
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
	// add event listeners
	},
}


function DefinitionView(){

}

DefinitionView.prototype = {
	setFetch: function(){
	setInterval(function() {
		this.fetch();
		}, 1000);
	},
	fetch: function(){
	//ajax listens to see if everyone has submitted?
	},
	render: function(){
	// render ul
	},
}

// We don't have a picks and picksView because we are
// rendering them in results 

// We don't have users models
// how do we know who the current user is?











