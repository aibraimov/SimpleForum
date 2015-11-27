Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:create, :show] do
      resources :jogs, only: [:index, :create, :update, :destroy, :show]
      resources :forums, only: [:index, :create, :update, :destroy, :show]
      resources :posts, only: [:index, :create, :update, :destroy, :show]
      resources :tags, only: [:index, :create, :update, :destroy, :show]
      resources :answers, only: [:index, :create, :update, :destroy, :show]
      resources :comments, only: [:index, :create, :update, :destroy, :show]
      get 'posts/get_forums', to: 'posts#get_forums'
      post 'posts/:id/like_post',  to: 'posts#like_post'
      post 'posts/:id/dislike_post',  to: 'posts#dislike_post'
      post 'answers/:id/like_answer',  to: 'answers#like_answer'
      post 'answers/:id/dislike_answer',  to: 'answers#dislike_answer'
      post 'answers/:id/set_true', to: 'answers#set_true'
    end
    post 'api_tokens', to: 'api_tokens#create'
    delete 'api_tokens', to: 'api_tokens#destroy'
  end

  match "/haml_test/index", to: "haml_test#index", via: 'get'
  match "/haml_test/index2", to: "haml_test#index2", via: 'get'

  root 'welcome#angular'

end
