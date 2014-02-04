class Word < ActiveRecord::Base
  attr_accessible :definition, :name

  has_many :rounds

  def self.pick
  	id = rand(1..Word.count)
  	word = Word.find(id)
  	return word
  end
  
end
