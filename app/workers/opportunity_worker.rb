class OpportunityWorker < ActiveJob::Base
  include IceCube
  queue_as :low_priority

  #

  def perform
    Person.all.each do |p|
      if p.email && p.person_opportunities
        person_opportunities = []
        p.person_opportunities.each do |po|
          instances = []
          if po.instances && !po.instances.empty?
            po.instances.each do |i|
              if (Time.now.next_month.beginning_of_month..Time.now.next_month.end_of_month).cover?(Date.parse(i))
                instances.push(i)
              end
            end
          end
          if !instances.empty?
            po.instances = instances
            person_opportunities.push(po)
          end
        end
      end
      if person_opportunities && !person_opportunities.empty?
        OpportunityMailer.upcoming_opportunities_information(p, person_opportunities).deliver_now
      end
    end
  end




end
