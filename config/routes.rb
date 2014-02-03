Balderdash::Application.routes.draw do
  devise_for :users

  root :to => "home#index"

  put 'games/:id/start' => "games#start"

  resources :games, :except => [:edit, :update, :new]
  resources :players, :only => [:create, :destroy, :update]
  resources :picks, :only => [:create, :destroy]
end
