class Jog
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :user

  field :start_time, type: DateTime, default: ->{Time.now}
  field :distance_in_miles, type: Float, default: 0#, precision: 5, scale: 2
  field :time_in_hours, type: Float, default: 0#, precision: 5, scale: 2

end
