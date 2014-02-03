class CreateDefinitions < ActiveRecord::Migration
  def change
    create_table :definitions do |t|
      t.string :content
      t.integer :player_id
      t.integer :round_id

      t.timestamps
    end
  end
end
