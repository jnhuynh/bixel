Game::Application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :players
    end
  end
end
