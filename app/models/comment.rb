class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :answer, inverse_of: :comments
  belongs_to :user, inverse_of: :comments

  field :title, type: String

  validates_presence_of :title
  validates_length_of :title, minimum: 1
end
