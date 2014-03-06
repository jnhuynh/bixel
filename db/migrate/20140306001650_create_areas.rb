class CreateAreas < ActiveRecord::Migration
  def change
    create_table :areas do |t|
      t.string :name
      t.integer :width
      t.integer :height

      t.timestamps
    end
  end
end
