class Pick < ActiveRecord::Base
  attr_accessible :definition_id, :player_id, :player, :definition

  belongs_to :player
  belongs_to :definition

end
