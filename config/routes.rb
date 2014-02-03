Balderdash::Application.routes.draw do
  devise_for :users

  root :to => "home#index"

  resources :games, :except => [:edit, :update, :new]
end
