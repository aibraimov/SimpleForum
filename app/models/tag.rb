class Tag
  include Mongoid::Document
  include Mongoid::Timestamps
  has_and_belongs_to_many :posts, inverse_of: :tags

  field :title, type: String
  field :description, type: String

  validates_uniqueness_of :title
  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
