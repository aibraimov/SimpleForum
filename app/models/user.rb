class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword
  include Mongoid::Paperclip
  
  has_many :jogs
  has_many :api_tokens
  has_many :posts, inverse_of: :user
  has_many :answers, inverse_of: :user
  has_many :comments, inverse_of: :user

  has_secure_password
  validates_presence_of :email
  validates_uniqueness_of :email
  has_mongoid_attached_file :avatar,
  :default_url => '/images/missing_:style.png',
  :styles => {
    :small    => ['64x64#', :jpg]
  }
  validates_attachment_content_type :avatar, :content_type => %w(image/jpeg image/jpg image/png)

  field :email, type: String, default: ""
  field :password_digest, type: String, default: ""
  field :rating, type: Integer, default: 0
end