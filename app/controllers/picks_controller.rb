class PicksController < ApplicationController

	def create 
		definition_id = params[:definition_id]
		definition = Definition.find(definition_id)
		game = definition.round.game
		player = Player.where(user_id: current_user.id, game_id: game.id).first
		Pick.create(player: player, definition: definition)
		

		#  add points at the end of each round
		# -----------------

		if definition.player
			# if user picks own definition
			if definition.player == player
			# if user picks one of the other users' definitions
			else
			definition.player.add_point
			end
		
		# if the definition is correct 
		# (if the picked definition doesn't have a player_creator)
		else
			2.times{player.add_point}
		end


		redirect_to game_path(game)
	end



end
