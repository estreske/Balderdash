class Round < ActiveRecord::Base
  attr_accessible :game_id, :word_id, :word, :game

  belongs_to :word
  belongs_to :game
  has_many :guessed_players, :through => :definitions, :source => :player
  has_many :definitions
  has_many :picks, through: :definitions

  def self.begin(game)
    word = Word.pick
    round = Round.create(word: word, game: game)
    Definition.create(round: round, content: word.definition)
  end

  def picked_players 
    picks.map do |pick| 
      pick.player
    end
  end

  def submitted_players 
    definitions.map do |definition| 
      definition.player
    end
  end

  def defs_to_json 
    definitions = {}
    self.definitions.shuffle.each do |definition|
      definitions[definition.id] = definition.content
    end
    return definitions
  end

  def all_picked?
    if self.picks.count == self.game.players.count
      return true
    else
      return false
    end
  end

  def all_submitted?
    if self.definitions.count == ( self.game.players.count + 1 )
      return true
    else
      return false
    end
  end
end
