class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword
  
  has_many :jogs
  has_many :api_tokens
  has_many :posts, inverse_of: :user
  has_many :answers, inverse_of: :user
  has_many :comments, inverse_of: :user

  has_secure_password
  validates_presence_of :email
  validates_uniqueness_of :email

  field :email, type: String, default: ""
  field :password_digest, type: String, default: ""
  field :rating, type: Integer, default: 0
end