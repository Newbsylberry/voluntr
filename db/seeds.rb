# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

OrganizationEmailType.create(name: 'Opportunity Sign In Email',
                             description: 'The email that is delivered when a volunteer
                                            signs in to an opportunity.')

OrganizationEmailType.create(name: 'Opportunity Volunteer Follow Up Email',
                             description: 'The email that is delivered after a
                                            volunteer has recorded hours at an opportunity.')

