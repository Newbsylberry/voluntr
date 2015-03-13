class OpportunitySerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :allDay

  def title
    name
  end

  def start
    start_time
  end

  def end
    end_time
  end

  def allDay
    false
  end

  def timezone
    'local'
  end








end
