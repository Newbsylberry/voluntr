require 'spec_helper'
require 'spreadsheet_import/spreadsheet_import'

RSpec.describe SpreadsheetImport, "SpreadsheetImport" do
  before(:each) do
    @params = Array.new
    @params = ['first me',
               'last name',
               'address_1',
               'address_2',
               'email',
               'city',
               'zip code',
               'state',
               'phone',
               'organization',
               'occupation',
               'profession',
               'times volunteered',
               'known through',
               'additional']
  end

  it "#check_spreadsheet" do
    ap SpreadsheetImport.check_spreadsheet(@params).as_json

    expect(SpreadsheetImport.check_spreadsheet(@params)[:database_map]["first_name"]).to eq('first me')
  end


end
