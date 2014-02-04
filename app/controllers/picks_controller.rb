class PicksController < ApplicationController

	def create 
		definition_id = params[:definition_id]
		definition = Definition.find(definition_id)
		game = definition.round.game
		player = Player.find_by_user_id(current_user.id)
		Pick.create(player: player, definition: definition)
		
		
		#  add points at the end of each round
		# -----------------

		if definition.player
			# if user picks own definition
			if definition.player.user == current_user
				return 'cheater'
			# if user picks one of the other users' definitions
			else
			definition.player.add_point
			end
		
		# if the definition is correct 
		# (if the picked definition doesn't have a player_creator)
		else
			player.add_point
		end


		redirect_to game_path(game)
	end
end
