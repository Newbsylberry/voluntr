Rails.application.routes.draw do

  resources :profiles, except: [:new, :edit]
  scope '/api' do
    scope '/v1' do
      devise_for :users, defaults: {format: :json},
                 :controllers => { registrations: 'registrations',
                                   sessions: 'sessions'}, defaults: {format: :json}
      resources :organizations, except: [:new, :edit], defaults: {format: :json}
      resources :user_event_hours, except: [:new, :edit], defaults: {format: :json}
      resources :events, except: [:new, :edit], defaults: {format: :json}
      match '/organizations/existence_check/:fb_id', to: 'organizations#existence_check', via: :get, defaults: {format: :json}
      match '/events/existence_check/:fb_id', to: 'events#existence_check', via: :get, defaults: {format: :json}
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
