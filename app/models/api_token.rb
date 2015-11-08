class ApiToken
  include Mongoid::Document
  include Mongoid::Timestamps

  before_create :generate_api_token
  belongs_to :user

  field :api_token, type: String, default: ""

private
  def generate_api_token
    begin
      self.api_token = SecureRandom.hex
    end while self.class.where(api_token: api_token).count > 0
  end
end