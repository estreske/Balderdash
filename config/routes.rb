Balderdash::Application.routes.draw do
  devise_for :users

  authenticated :user do
  root :to => "games#index"
  end

  root :to => "home#index"

  put 'games/:id/start' => "games#start"

  get '/games/:id/win' => "games#win", as: "game_win"

  get '/games/:id/begin' => 'games#begin'

  get '/games/players' => 'games#players'

  get '/rounds/definitions' => 'rounds#definitions'

  get '/rounds/complete' => 'rounds#complete'

  resources :games, :except => [:edit, :update, :new]
  resources :players, :only => [:create, :destroy, :update]
  resources :picks, :only => [:create, :destroy]
  resources :definitions, :only => [:create]
  resources :rounds, :only => [:create]
end
