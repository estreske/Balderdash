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

  def players_to_json
    players = {}
    self.players.each do |player|
      new_player = {}
      new_player[:name] = player.user.name
      new_player[:score] = player.score
      players[player.id] = new_player
    end
    return players
  end

end
