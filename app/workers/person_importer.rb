class PersonImporter < ActiveJob::Base
  require 'fuzzy_match'
  require 'street_address'
  queue_as :high_priority

  def perform(people, organization_id, address_column, name_column)
    people.each do |p|
      if address_column === true && p["address"]
        address = StreetAddress::US.parse(p["address"])
        if address
          if address.number && address.street && address.street_type
            p["address_1"]= "#{address.number} #{address.street} #{address.street_type}"
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
      if name_column === true && p["name"].split(' ').count >= 2
        name = p["name"].split(' ')
        p["first_name"] = name.first
        p["last_name"] = name.last
        p.delete("name")
      end

      @person = Person.create_with(locked: false)
                    .find_or_initialize_by(email: p["email"])
      if @person.new_record?
        @person = Person.create!(
            first_name: p["first_name"],
            last_name: p["last_name"],
            email: p["email"],
            state: p["state"],
            city: p["city"],
            zip_code: p["zip_code"],
            address_1: p["address_1"],
            address_2: p["address_2"],
            organization_name: p["organization_name"],
            occupation: p["occupation"],
            phone: p["phone"]
        )
      end




        if p["notes"]
          @po = @person.add_to_organization(Organization.find(organization_id), "#{p["notes"]}")
        else
          @po = @person.add_to_organization(Organization.find(organization_id), "")
        end

        @po.custom_fields = p["custom_fields"]
        @po.save
      end
    end
  end


