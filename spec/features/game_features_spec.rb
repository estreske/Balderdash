require 'spec_helper'

describe GamesController do
	before do
		@session1 = Capybara::Session.new(:rack_test, Balderdash::Application)
		@user = User.create(email: 'example@email.com', password: 'password123', name: 'Billy Joel')
		@session1.login_as(@user)
		Word.create(name: 'crap', definition: 'that which is shitty')
	end
	describe "when on the homepage" do
		before do
			@session1.visit games_path
		end
		it "should display all the games" do
			@session1.body.should have_content('Game')
		end
		describe "when a user clicks on the create button" do
			before do
				@session1.click_button 'Create a Game'
			end
			it "should create the game and a player and redirect" do
				@session1.current_path.should == game_path(Game.all.last)
				@session1.body.should have_content('Billy Joel')
				@session1.body.should have_content('Start Game')
			end
			describe "if there is another user" do
				before do
					@session2 = Capybara::Session.new(:rack_test, Balderdash::Application)
					@user_2 = User.create(email: 'example2@email.com', password: 'password', name: 'Sandra D')
					@session2.login_as(@user_2)
				end
				describe "when the second user clicks on one of the games listed" do
					before do
						@session2.visit games_path
						@session2.click_link('Billy')
					end
					it "should show that game page" do
						@session2.body.should have_content('Join Game')
					end
					describe 'when clicking join game' do
						before do
							@session2.click_button('join_game')
						end
						it "should become a player in the game" do
							@session2.body.should have_content(@user_2.name)
						end
						describe "the first user can start the game" do
							before do
								@session1.click_button('Start Game')
							end
							it "should show a word" do
								@session1.body.should have_content('crap')
							end
						end
					end
				end
			end
		end
	end
end