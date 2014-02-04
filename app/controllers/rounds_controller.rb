class RoundsController < ApplicationController
	def create 
		game = Game.find(params[:game_id])
		Round.begin(game)
		redirect_to game_path(game)
	end
end