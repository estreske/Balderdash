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
	this.id = id;
	this.in_session = in_session;
}

function GameView(){
	//ajax call to listen for in_session
}

GameView.prototype.initialize() {
	// display Join // on click, make ajax, render whirleybird
	// Start Button // on click, make ajax to change game to insession and create round with word
	// call render from a PlayerView to create ul
}

GameView.prototype.beginRound = function(){
	// make ajax request to fill Round with data 
}

GameView.prototype.finishRound = function(){
	// render results
	// render New Round Button (and listener)
}

GameView.prototype.renderWaiting = function(){
	// render whirlybird
	// this is called by on.click on join.button
}

function PlayerView(){
}

PlayerView.prototype.fetch = function(){
	// ajax call to listen for new players
}

PlayerView.prototype.setFetch = function(){
	// sets interval
}

PlayerView.prototype.render = function(){
	// renders table
}

function Player(){
	var hash = this.add()
	this.game = hash["game"];  // ***** ASK TOMORROW ******
	this.score = hash["score"];
	this.id = hash["id"];
}

Player.prototype.render(){
	// creates tr
}

function Round(){
	var hash = this.add()
	this.game = hash["game"];  // ***** ASK TOMORROW ******
	this.word = hash["word"];
	this.id = hash["id"];
}

Round.prototype.add = function() {
	// Make the AJAX call to create a new round
	// returns json data on succeess
}

function RoundView(round){
	// store the relevant dom elements as this.variables
	// this.wordElement = $("<div>").text(round.word);
}

RoundView.prototype.renderWaiting = function(){
	// render whirlybird
	// this is called by on.click on submit.button
	// starts setter
}

RoundView.prototype.renderInput = function(){
	// appends input 
	// append submit button
}

RoundView.prototype.fetch = function(){
	//ajax listesn to see if everyone has submitted?
}

RoundView.prototype.setFetch = function(){
	// interval for listener
}

function Definition(){
	var hash = this.add()
	this.round_id = hash["round_id"]; // ***** ASK TOMORROW ******
	this.content = hash["content"];
	this.id = hash["id"];
}

Definition.prototype.render = function(){
	// render li
	// add event listeners
}

function DefinitionView(){

}

DefinitionView.prototype.setFetch = function(){
	// interval for listener
}

DefinitionView.prototype.fetch = function(){
	//ajax listesn to see if everyone has submitted?
}

DefinitionView.prototype.render = function(){
	// render ul
}

// We don't have a picks and picksView because we are
// rendering them in results 











