class CreatePicks < ActiveRecord::Migration
  def change
    create_table :picks do |t|
      t.integer :player_id
      t.integer :definition_id

      t.timestamps
    end
  end
end
