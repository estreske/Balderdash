class AddDefaultValueToScoreAttribute < ActiveRecord::Migration
  def up
  	change_column :players, :score, :integer, :default => 0
  end
  def down
  	change_column :players, :score, :integer, :default => nil
  end
end
