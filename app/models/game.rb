class Game < ActiveRecord::Base
  attr_accessible :in_session

  has_many :players
  has_many :users, through: :players
  has_many :rounds

  def start
  	self.in_session = true
  	self.save
  	Round.begin(self)
  end

end
