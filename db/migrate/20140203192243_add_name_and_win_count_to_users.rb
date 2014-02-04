class AddNameAndWinCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :win_count, :integer
    add_column :users, :name, :string, :null => false, :default => ""
  end
end
