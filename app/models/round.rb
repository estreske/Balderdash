class Round < ActiveRecord::Base
  attr_accessible :game_id, :word_id

  belongs_to :word
  belongs_to :game
end
