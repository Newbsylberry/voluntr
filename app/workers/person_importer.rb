class PersonImporter < ActiveJob::Base
  require 'fuzzy_match'
  require 'street_address'
  queue_as :high_priority

  def perform(people, organization_id, address_column, name_column)
    people.each do |p|
      if address_column && p["address"]
        address = StreetAddress::US.parse(p["address"])
        if address
          if address.number && address.street && address.street_type
            p["address_1 "]= "#{address.number} #{address.street} #{address.street_type}"
          end
          if address.unit_prefix && address.unit
            p["address_2"] = "#{address.unit_prefix} #{address.unit}"
          end
          if address.city
            p["city"]= "#{address.city}"
          end
          if address.state
            p["state"] = "#{address.state}"
          end
          if address.postal_code
            p["zip_code"] = "#{address.postal_code}"
          end
        end
        p.delete("address")
      end
      if name_column && p["name"].split(' ').count >= 2
        name = p["name"].split(' ')
        p["first_name"] = name.first
        p["last_name"] = name.last
        p.delete("name")
      end
      ap p
      @person = Person.create!(p)

      if p["notes"]
        @person.add_to_organization(Organization.find(organization_id), "#{p.notes}")
      else
        @person.add_to_organization(Organization.find(organization_id), "")
      end
    end


  end
end


