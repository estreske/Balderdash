class Game < ActiveRecord::Base
  attr_accessible :in_session

  has_many :players
  has_many :rounds
end
