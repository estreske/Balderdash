class Pick < ActiveRecord::Base
  attr_accessible :definition_id, :player_id

  belongs_to :player
  belongs_to :definition
end
