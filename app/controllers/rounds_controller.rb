class RoundsController < ApplicationController
	def create 
		game = Game.find(params[:game_id])
	    if game.rounds.count < 7
			  Round.begin(game)
			  redirect_to game_path(game)
	    elsif game.rounds.count == 7
	      redirect_to game_complete_path(game)
	    end
	end

	def definitions
		## returns all defintions
		## response to ajax call if all of the players (game.players.count) have guessed (= game.rounds.defintions.count - 1)
		round = Round.find(params[:round_id])
		respond_to do |format|
			format.json do
				if round.all_submitted?
					render :json => {status: 'all_submitted', data: game.rounds.last.definitions}.to_json
				else
					render :json => {status: 'waiting'}.to_json
				end
			end
		end
	end

	def complete
		## returns results
		## response to ajax call if all of the players (game.players.count) have picked (= round.picks)
		round = Round.find(params[:round_id])
		respond_to do |format|
			format.json do
				if round.all_picked?
					render :json => {status: 'all_picked', data: game.picks}.to_json
				else
					render :json => {status: 'waiting'}.to_json
				end
			end
		end

	end


end