require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  it "#reset_password" do
    expect{
      get :reset_password, email: "chris.s.mccarthy@gmail.com"
    }.to change { ActionMailer::Base.deliveries.count }.by(1)
  end
end
