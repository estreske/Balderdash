class GamesController < ApplicationController
before_filter :authenticate_user!

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
		@current_round = @game.rounds.last
		if Player.where(user_id: current_user.id, game_id: @game.id).first
			@current_player = Player.where(user_id: current_user.id, game_id: @game.id).first
		end
	end
#      DELETE /games/:id(.:format)           games#destroy
	def start
		game = Game.find(params[:id])
		game.start
		redirect_to game_path(game)
	end
# once a game has reached 7 rounds
	def complete
		game = Game.find(params[:id])
		@players = game.players.find(:all, :order => 'score desc')
		@winner = @players.first.user.name
	end

end