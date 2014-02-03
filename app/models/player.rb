class Player < ActiveRecord::Base
  attr_accessible :game_id, :score, :user_id
end
