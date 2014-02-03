class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.boolean :in_session

      t.timestamps
    end
  end
end
