require 'rails_helper'

RSpec.describe TagsController, type: :controller do

  describe "GET #title" do
    it "returns http success" do
      get :title
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #description" do
    it "returns http success" do
      get :description
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #post_id" do
    it "returns http success" do
      get :post_id
      expect(response).to have_http_status(:success)
    end
  end

end
