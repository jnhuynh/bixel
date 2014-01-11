# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140111231308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "levels", force: true do |t|
    t.integer  "width"
    t.integer  "height"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", force: true do |t|
    t.string   "name"
    t.string   "direction"
    t.integer  "x"
    t.integer  "y"
    t.integer  "level_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "current_health", default: 100
    t.integer  "max_health",     default: 100
  end

  create_table "sprite_sheets", force: true do |t|
    t.string   "src"
    t.integer  "state"
    t.integer  "number_states"
    t.integer  "tile_size"
    t.integer  "player_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
