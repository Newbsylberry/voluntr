class PersonImporter < ActiveJob::Base
  require 'fuzzy_match'
  queue_as :high_priority

  def perform(people, organization_id)
    people.each do |p|
      @person = Person.create(p)

      coordinates = Geocoder.coordinates("#{[p.address_1]} #{p.address_2} #{p.city} #{p.state} #{p.zip_code}")
      if !coordinates.nil?
        @person.latitude = coordinates[0]
        @person.longitude = coordinates[1]
      end
      @person.save
      @person.add_to_organization(Organization.find(organization_id), "#{p.notes}")
    end
  end
end



