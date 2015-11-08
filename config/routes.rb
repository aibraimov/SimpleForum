Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:create] do
      resources :jogs, only: [:index, :create, :update, :destroy]
      resources :forums, only: [:index, :create, :update, :destroy]
      resources :posts, only: [:index, :create, :update, :destroy]
    end
    post 'api_tokens', to: 'api_tokens#create'
    delete 'api_tokens', to: 'api_tokens#destroy'
  end

  match "/haml_test/index", to: "haml_test#index", via: 'get'
  match "/haml_test/index2", to: "haml_test#index2", via: 'get'

  root 'welcome#angular'

end
