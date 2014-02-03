class Player < ActiveRecord::Base
  attr_accessible :game_id, :score, :user_id, :user, :game

  belongs_to :user
  belongs_to :game

  def add_point
  	self.score += 1
  	self.save
  end

end
