class Answer
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :post, inverse_of: :answers
  belongs_to :user, inverse_of: :answers
  has_many :comments, inverse_of: :answer

  field :title, type: String
  field :user_likes, type: Array
  field :user_dislikes, type: Array
  field :is_true, type: Boolean

  validates_presence_of :title
  validates_length_of :title, minimum: 1
end