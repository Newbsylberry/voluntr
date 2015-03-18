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

ActiveRecord::Schema.define(version: 20150318011658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "opportunities", force: true do |t|
    t.integer  "fb_id"
    t.integer  "string"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "opportunity_type_id"
    t.string   "location"
    t.text     "description"
    t.string   "timezone"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "organization_id"
    t.string   "start_time"
    t.text     "start_schedule"
    t.string   "end_time"
    t.string   "color"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
  end

  create_table "opportunity_types", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organization_people", force: true do |t|
    t.integer  "person_id"
    t.integer  "organization_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organizations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "fb_id",       limit: 8
    t.string   "name"
    t.text     "description"
  end

  create_table "people", force: true do |t|
    t.string   "fb_id"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: true do |t|
    t.string   "fb_id"
    t.text     "message"
    t.string   "organization_id"
    t.datetime "post_time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "likes"
  end

  create_table "profiles", force: true do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_event_hours", force: true do |t|
    t.integer  "event_id"
    t.integer  "hours"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
