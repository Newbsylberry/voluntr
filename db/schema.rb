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

ActiveRecord::Schema.define(version: 20150526190436) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "daily_statistics", force: :cascade do |t|
    t.integer  "organization_id"
    t.integer  "total_recorded_hours"
    t.integer  "total_added_volunteers"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "date"
    t.integer  "planned_hours"
  end

  create_table "object_schedules", force: :cascade do |t|
    t.integer  "scheduleable_id"
    t.string   "scheduleable_type"
    t.string   "end_time"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.text     "schedule"
    t.boolean  "outdated"
  end

  add_index "object_schedules", ["scheduleable_id"], name: "index_object_schedules_on_scheduleable_id", using: :btree

  create_table "opportunities", force: :cascade do |t|
    t.integer  "fb_id"
    t.integer  "string"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",                limit: 255
    t.integer  "opportunity_type_id"
    t.string   "location",            limit: 255
    t.text     "description"
    t.string   "timezone",            limit: 255
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "organization_id"
    t.string   "start_time",          limit: 255
    t.string   "end_time",            limit: 255
    t.text     "start_schedule"
    t.string   "color",               limit: 255
    t.string   "city",                limit: 255
    t.string   "state",               limit: 255
    t.string   "zip_code",            limit: 255
    t.string   "address"
    t.integer  "volunteer_goal"
  end

  create_table "opportunity_types", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organization_people", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "organization_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organizations", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "fb_id",              limit: 8
    t.string   "name",               limit: 255
    t.text     "description"
    t.datetime "last_social_update"
  end

  create_table "people", force: :cascade do |t|
    t.string   "fb_id",      limit: 255
    t.string   "first_name", limit: 255
    t.string   "last_name",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zip_code",   limit: 255
    t.string   "state",      limit: 255
    t.string   "city",       limit: 255
    t.string   "phone",      limit: 255
    t.string   "email",      limit: 255
    t.string   "address",    limit: 255
  end

  create_table "person_opportunities", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "opportunity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "schedule"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "fb_id",           limit: 255
    t.text     "message"
    t.string   "organization_id", limit: 255
    t.datetime "post_time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "likes",           limit: 255
  end

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "first_name", limit: 255
    t.string   "last_name",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "recorded_hours", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "opportunity_id"
    t.integer  "organization_id"
    t.integer  "hours"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  create_table "user_event_hours", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "hours"
    t.string   "description", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
