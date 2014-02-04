class Round < ActiveRecord::Base
  attr_accessible :game_id, :word_id

  belongs_to :word
  belongs_to :game
  has_many :guessed_players, through: :definitions, source: :players
  has_many :definitions

  def self.begin(game)
    word = word.pick
    round = Round.create(word: word, game: game)
    round.definitions << word.definition
  end
end
