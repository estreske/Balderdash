class PlayersController < ApplicationController
 # players POST   /players(.:format)             players#create
 	def create
 		user = current_user
 		game = Game.find(params[:game_id])
 		player = Player.create({
 			user: user,
 			game: game
 			})
 		redirect_to game_path(game)
 	end

  #  player PUT    /players/:id(.:format)         players#update
 	def update
 		
 	end

  #         DELETE /players/:id(.:format)         players#destroy
 	def destroy
    player = Player.find(params[:id])
    redirect_to root_path
 	end
end