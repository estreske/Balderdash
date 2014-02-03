class Player < ActiveRecord::Base
  attr_accessible :game_id, :score, :user_id

  belongs_to :user
  belongs_to :game

end
