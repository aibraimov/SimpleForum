class Post
  include Mongoid::Document
  belongs_to :user

  field :title, type: String
  field :description, type: String

  validates_uniqueness_of :title
  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
