class Answer
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :post, inverse_of: :answers
  belongs_to :user, inverse_of: :answers
  has_many :comments, inverse_of: :post

  field :title, type: String

  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
