Balderdash::Application.routes.draw do

  devise_for :users

  authenticated :user do
    root :to => "games#index"
  end

  root :to => "home#index"

  put 'games/:id/start' => "games#start"

  get '/games/:id/win' => "games#win", as: "game_win"

  get '/games/:id/begin' => 'games#begin'

  get '/games/:id/players' => 'games#players'

  get '/games/:id/round' => 'games#round'

  get '/games/:id/rounds' => 'games#rounds'

  get '/games/:id/definitions' => 'games#definitions'

  get '/games/:id/picks' => 'games#picks'

  get '/rounds/:id/complete' => 'rounds#complete'

  resources :games, :except => [:edit, :update, :new]

  resources :players, :only => [:create, :destroy, :update]

  resources :picks, :only => [:create, :destroy]

  resources :definitions, :only => [:create]

  resources :rounds, :only => [:create]
  
end
