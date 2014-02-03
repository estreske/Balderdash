class GamesController < ApplicationController
# games GET    /games(.:format)               games#index
	def index
		@games = Game.all
	end
#      POST   /games(.:format)               games#create
	def create
		game = Game.new
		game.in_session = false
		game.save
		user = current_user
		player = Player.create({
			user: user,
			game: game,
			})
		redirect_to game_path(game)
	end
# game GET    /games/:id(.:format)           games#show
	def show
		@game = Game.find(params[:id])
	end
#      DELETE /games/:id(.:format)           games#destroy
	def start
		game = Game.find(params[:id])
		game.in_session= true
		game.save
		redirect_to game_path(game)
	end

end