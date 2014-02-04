class Word < ActiveRecord::Base
  attr_accessible :definition, :name

  has_many :rounds

  def self.pick
  	id = rand(Word.first.id..Word.last.id)
  	word = Word.find(id)
  	return word
  end
  
end
