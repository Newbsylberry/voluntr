module SpreadsheetImport
  require 'fuzzy_match'

  def self.check_spreadsheet(params)
    database_attributes = ['first_name','last_name','address_1','address_2','email','zip_code','state','city','occupation','phone','organization_name']
    ap params
    @matched = Hash.new
    database_attributes.each do |da|

      if !params.nil?
      value = FuzzyMatch.new(params).find(da)
      @matched[da] = value
      params.delete(value)
      end
    end
    params.each do |p|
      @matched[p] = false
    end
    ap @matched
    return {database_map: @matched}
  end
end