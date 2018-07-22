Rails.application.routes.draw do
  devise_for :users
  root 'games#lobby'
  resources :games do
    get 'waiting_room', on: :member
    get 'lobby', on: :collection
  end
end
