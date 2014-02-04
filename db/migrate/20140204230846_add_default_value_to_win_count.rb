class AddDefaultValueToWinCount < ActiveRecord::Migration
  def up
    change_column :users, :win_count, :integer, :default => 0
  end

  def down
    change_column :users, :win_count, :integer, :default => nil
  end
end
