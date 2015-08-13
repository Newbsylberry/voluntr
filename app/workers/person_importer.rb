class PersonImporter < ActiveJob::Base
  require 'fuzzy_match'
  queue_as :high_priority

  def perform(people, organization_id)
    people.each do |p|
      @person = Person.new
      p.keys.each do |k|
        key_value = p["#{k}"]
        if k.downcase == 'name'
          @person.first_name = key_value.split(" ")[0].to_s
          @person.last_name = key_value.split(" ")[1].to_s
        elsif k.downcase == 'first_name' || k == 'first name'
          @person.first_name = key_value
        elsif k.downcase =='last_name' || k == 'last name'
          @person.last_name = key_value
        elsif k.downcase == 'email' || k == 'email address' || k == 'email_address'
          @person.email = key_value
        elsif k.downcase == 'phone' || k == 'phone number' || k == 'phone_number'
          @person.phone = key_value
        elsif k.downcase == 'address' || k == 'address 1' || k == 'address_1'
          @address = key_value
        elsif k.downcase == 'address 2' || k == 'address_2' || k == 'address 2'
          @person.address_2 = key_value
        elsif k.downcase == 'city'
          @city = key_value
        elsif k.downcase == 'state'
          @state = key_value
        elsif k.downcase =='zip code' || k == 'zip_code' || k == 'zip'
          @zip_code = key_value
        end
      end
      coordinates = Geocoder.coordinates("#{@address} #{@city} #{@state} #{@zip_code}")
      ap coordinates
      if !coordinates.nil?
        @person.latitude = coordinates[0]
        @person.longitude = coordinates[1]
      end
      @person.save
      @person.add_to_organization(Organization.find(organization_id))
      ap @person
    end
  end
end



