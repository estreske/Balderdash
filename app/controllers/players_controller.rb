class PlayersController < ApplicationController
 # players POST   /players(.:format)             players#create
 	def create
 		user = current_user
 		game = game[:game_id]
 		player = Player.new({
 			user_id: user,
 			game_id: game
 			})
 		player.save
 		redirect_to game_path(game)
 	end
 #  player PUT    /players/:id(.:format)         players#update
 	def update

 	end
 #         DELETE /players/:id(.:format)         players#destroy
 	def destroy

 	end


end