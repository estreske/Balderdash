class GamesController < ApplicationController
before_filter :authenticate_user!

# games GET    /games(.:format)               games#index
	def index
		@games = Game.all
		respond_to do |format|
			format.html do 
				render :index
			end
			format.json do
				render :json => {games: Game.to_json}
			end
		end
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
		
		# render :json => {game: game, player: player}.to_json
		redirect_to game_path(game)
	end
# game GET    /games/:id(.:format)           games#show
	def show
		## when the show page is initially rendered
		respond_to do |format|
			format.html do 
				@game = Game.find(params[:id])
				@current_round = @game.rounds.last
				if Player.where(user_id: current_user.id, game_id: @game.id).first
					@current_player = Player.where(user_id: current_user.id, game_id: @game.id).first
				end
				render :show
			end
			format.json do
				game = Game.find(params[:id])
				render :json => {game_id: params[:id], players: game.players_to_json, in_session: game.in_session}
				# HOW DO WE KNOW IF THE CURRENT USE IS A PLAYER OR NOT?
				## HOW DO WE KNOW IF THE CURRENT USER IS PLAYER #1?
			end
		end
		# @game = Game.find(params[:id])
		# @current_round = @game.rounds.last
		# if Player.where(user_id: current_user.id, game_id: @game.id).first
		# 	@current_player = Player.where(user_id: current_user.id, game_id: @game.id).first
		# end
	end
	def start
		## responds to $('#start_game').on('click')
		## returns game, round, and word
		respond_to do |format|
			format.html do 
				@game = Game.find(params[:id])
				@game.start
				redirect_to game_path(@game)
			 end
			# format.json do
			# 	game = Game.find(params[:id])
			# 	game.start
			# 	# ^ creates the first round in the game
			# 	render :json => {game: game, round: game.rounds.last, word: game.rounds.last.word}
			# end
		end
		# redirect_to game_path(params[:id])
	end

	def begin 
		## waits til game is in_session
		## then returns game, round, and word
		game = Game.find(params[:id])
		respond_to do |format|
			format.json do
				if game.in_session
					render :json => {status: 'in_session'}
				else
					render :json => {status: 'waiting'}
				end
			end
		end
	end

	def players
		## returns all players
		## responds one by one to sync JS object.length with Rails game.players.count
		game = Game.find(params[:id])
		respond_to do |format|
			format.json do
				if game.players.count != params[:player_count]
					render :json => {status: 'more_players', players: game.players_to_json}
				else
					render :json => {status: 'waiting'}.to_json
				end
			end
		end
	end

	def round 
		## returns a new round
		## response to $('#new_round')on.click
		game = Game.find(params[:game_id])
		current_round = game.rounds.last
		respond_to do |format|
			format.json do
				render :json => {status: 'new_round', game_id: game.id, round_id: current_round.id, word: current_round.word.name}
			end
		end
	end

# once a game has reached 7 rounds
	def win
		game = Game.find(params[:id])
		@players = game.players.find(:all, :order => 'score desc')
		@winners = []
		@players.each do |player|
			if player.score == @players.first.score
				winner = player.user
				winner.win_count +=1
				winner.save!
				@winners << player
			end
		end
	end

def rounds
	game = Game.find(params[:id])
	current_round = game.rounds.last
	respond_to do |format|
		format.json do
			if current_round.all_submitted?
				render :json => {status: 'all_submitted'}
			else
				render :json => {status: 'waiting'}
			end
		end
	end
end

def picks
	game = Game.find(params[:id])
	current_round = game.rounds.last
	respond_to do |format|
		format.json do
			if current_round.all_picked?
				render :json => {status: 'all_picked'}
			else
				render :json => {status: 'waiting'}
			end
		end
	end
end


end