Balderdash::Application.routes.draw do
  devise_for :users

  root :to => "home#index"

  put '/:id/start' => "games#start"

  resources :games, :except => [:edit, :update, :new]
  resources :players, :only => [:create, :destroy, :update]
end
