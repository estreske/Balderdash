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
end