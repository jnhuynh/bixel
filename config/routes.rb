Bixel::Application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :levels
      resources :players
      resources :sprite_sheets
    end
  end
end
