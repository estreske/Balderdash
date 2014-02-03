require 'spec_helper'

describe GamesController do
	before do 
		@session1 = Capybara::Session.new(:rack_test, Balderdash::Application)
		@user = User.create(email: 'example@email.com', password: 'password123', name: 'Billy Joel')
		@session1.login_as(@user)
	end
	describe "when on the homepage" do
		before do 
			@game = Game.create(in_session: false)
			@session1.visit games_path
		end
		it "should display all the games" do
			@session1.body.should have_content('Game Room #' + @game.id.to_s)
		end
		describe "when a user clicks on the create button" do
			before do
				@session1.click_button 'Create a Game'
			end
			it "should create the game and a player and redirect" do
				@session1.current_path.should == game_path(Game.all.last)
				@session1.body.should have_content('Billy Joel')
			end
		end
		# describe "if there is another user" do 
		# 	before do 
		# 		@user_2 = User.create(email: 'example2@email.com', password: 'password', name: 'Sandra D')
		# 		login_as(@user_2)
		# 		@game = Game.create(in_session: false)
		# 		Player.create(user: @user, game: @game)
		# 	end
		# 	describe "when they click on one of the games listed" do 
		# 		before do 
		# 			click_link(@game.id.to_s)
		# 		end
		# 		it 'should redirect to the game page' do 
		# 			page.should have_content(@user.name)
		# 		end
		# 		it 'should '
		# 	end
		# end
	end
end