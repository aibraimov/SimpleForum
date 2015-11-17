class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :user, inverse_of: :posts
  belongs_to :forum, inverse_of: :posts

  field :title, type: String
  field :description, type: String

  validates_uniqueness_of :title
  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
