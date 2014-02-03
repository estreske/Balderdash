class Player < ActiveRecord::Base
  attr_accessible :game_id, :score, :user_id, :user, :game

  belongs_to :user
  belongs_to :game

end
