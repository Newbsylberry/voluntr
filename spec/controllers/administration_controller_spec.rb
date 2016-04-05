require 'rails_helper'

RSpec.describe AdministrationController, type: :controller do
  it "#volunteer_drive_leaderboard" do
    get :volunteer_drive_leaderboard
  end
end
