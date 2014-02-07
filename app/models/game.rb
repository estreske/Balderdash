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
    self.players.find(:all, :order => 'score desc').each do |player|
      new_player = {}
      new_player[:name] = player.user.name
      new_player[:score] = player.score
      players[player.id] = new_player
    end
    return players
  end

  def self.to_json
    games = {}
    Game.all.each do |game|
      if game.in_session == false
        if game.players
          games[game.id] = game.players.first.user.name
        else
          games[game.id] = 'Nobody'
        end
      end
    end
    return games
  end
end
