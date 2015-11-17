class Forum
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :posts, inverse_of: :forum

  field :title, type: String

  validates_uniqueness_of :title
  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
