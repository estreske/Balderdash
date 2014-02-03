require 'spec_helper'

describe Player do
  describe "given a player" do
  	before do 
  		user = User.create(email: 'email', password: 'password')
  		game = Game.create(in_session: true)
  		@player = Player.create(user: user, game: game)
  	end
  	it "should allow players to get points" do
  		@player.score.should == 0 
  		@player.add_point
  		@player.score.should == 1
  	end
  end
end
