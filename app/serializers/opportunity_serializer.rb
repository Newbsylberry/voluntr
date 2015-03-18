class OpportunitySerializer < ActiveModel::Serializer
  attributes :id, :fb_id, :name, :start_time, :end_time, :location, :longitude, :latitude, :description,
             :opportunity_type_id, :start, :end, :title, :color, :allDay

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


  # def color
  #   @colors = ['#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#CDDC39']
  #   return @colors.sample
  # end








end
