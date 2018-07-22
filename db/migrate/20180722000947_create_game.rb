class CreateGame < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :name
    end
    create_table :players do |t|
      t.references :game
      t.references :user
      t.string :name
    end
  end
end
