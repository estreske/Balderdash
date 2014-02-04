class DefinitionsController < ApplicationController

	def create 
		round = Round.find(params[:round_id])
		player = Player.find_by_user_id(current_user.id)
		content = params[:content]
		Definition.create(player: player, round: round, content: content)

		game = round.game
		
		redirect_to game_path(game)
	end

end