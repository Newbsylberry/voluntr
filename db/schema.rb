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

ActiveRecord::Schema.define(version: 20150824174528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "daily_statistics", force: :cascade do |t|
    t.integer  "organization_id"
    t.integer  "total_recorded_hours"
    t.integer  "total_added_volunteers"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "date"
    t.integer  "planned_hours"
  end

  create_table "group_administrators", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "city"
    t.string   "state"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "mailing_service_lists", force: :cascade do |t|
    t.integer  "organization_mailing_service_id"
    t.string   "name"
    t.integer  "current_subscribers"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "list_id"
  end

  create_table "opportunities", force: :cascade do |t|
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
    t.string   "end_time"
    t.text     "start_schedule"
    t.string   "color"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "address"
    t.integer  "volunteer_goal"
    t.text     "schedule"
  end

  create_table "opportunity_roles", force: :cascade do |t|
    t.integer  "opportunity_id"
    t.string   "name"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.text     "description"
    t.integer  "volunteers_required"
  end

  create_table "opportunity_types", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "organization_email_templates", force: :cascade do |t|
    t.integer  "organization_email_type_id"
    t.string   "name"
    t.string   "description"
    t.text     "introduction_text"
    t.integer  "marketing_materials"
    t.integer  "upcoming_events"
    t.integer  "upcoming_events_period"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "organization_id"
    t.text     "conclusion_text"
  end

  create_table "organization_email_types", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "organization_mailing_services", force: :cascade do |t|
    t.integer  "organization_id"
    t.text     "token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "service_type"
    t.integer  "default_list_id"
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
    t.string   "name"
    t.text     "description"
    t.datetime "last_social_update"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "custom_url"
    t.text     "website_url"
    t.text     "facebook_url"
    t.text     "twitter_url"
    t.text     "instagram_url"
  end

  create_table "people", force: :cascade do |t|
    t.string   "fb_id"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zip_code"
    t.string   "state"
    t.string   "city"
    t.string   "phone"
    t.string   "email"
    t.string   "address_1"
    t.string   "address_2"
    t.hstore   "schedule"
    t.float    "latitude"
    t.float    "longitude"
  end

  create_table "person_opportunities", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "opportunity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "schedule"
    t.integer  "opportunity_role_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "fb_id"
    t.text     "message"
    t.string   "organization_id"
    t.datetime "post_time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "likes"
  end

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
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
    t.datetime "date_recorded"
    t.integer  "opportunity_role_id"
    t.boolean  "photo_consent"
    t.integer  "group_id"
  end

  create_table "resources", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "resourceable_id"
    t.string   "resourceable_type"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "resource"
  end

  add_index "resources", ["resourceable_id"], name: "index_resources_on_resourceable_id", using: :btree

  create_table "user_event_hours", force: :cascade do |t|
    t.integer  "event_id"
    t.integer  "hours"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", force: :cascade do |t|
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
