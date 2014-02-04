Balderdash::Application.routes.draw do
  devise_for :users

  authenticated :user do
  root :to => "games#index"
  end

  root :to => "home#index"

  put 'games/:id/start' => "games#start"

  get '/games/:id/complete' => "games#complete", as: "game_complete_path"

  resources :games, :except => [:edit, :update, :new]
  resources :players, :only => [:create, :destroy, :update]
  resources :picks, :only => [:create, :destroy]
  resources :definitions, :only => [:create]
  resources :rounds, :only => [:create]
end
