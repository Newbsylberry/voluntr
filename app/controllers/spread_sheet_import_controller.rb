class SpreadSheetImportController < ApplicationController
  require 'spreadsheet_import/spreadsheet_import'

  def spreadsheet_check
    render json: SpreadsheetImport.check_spreadsheet(params[:row_titles])
  end

end