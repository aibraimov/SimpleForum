class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :user, inverse_of: :posts
  belongs_to :forum, inverse_of: :posts
  has_and_belongs_to_many :tags, inverse_of: :posts
  has_many :answers, inverse_of: :post

  field :title, type: String
  field :description, type: String
  field :user_likes, type: Array
  field :user_dislikes, type: Array
  field :is_true, type: Boolean

  validates_uniqueness_of :title
  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
