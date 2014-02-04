class PicksController < ApplicationController

	def create 
		definition_id = params[:definition_id]
		definition = Definition.find(definition_id)
		game = definition.round.game
		player = Player.find_by_user_id(current_user.id)
		Pick.create(player: player, definition: definition)
		
		# if the definition is correct
		if definition.player
			definition.player.add_point
		# if user picks own definition
		elsif definition.player == nil
			player.add_point
		# if user picks a different user's definition
		elsif definition.player.user == current_user
			return 'cheater'
		end
		redirect_to game_path(game)
	end
end
