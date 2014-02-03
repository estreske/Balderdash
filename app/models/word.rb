class Word < ActiveRecord::Base
  attr_accessible :definition, :name

  has_many :rounds
  
end
