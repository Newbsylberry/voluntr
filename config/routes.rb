Rails.application.routes.draw do


  scope '/api' do
    scope '/v1' do
      devise_for :users, defaults: {format: :json},
                 :controllers => { registrations: 'registrations',
                                   sessions: 'sessions'}, defaults: {format: :json}
      resources :opportunity_types, except: [:new, :edit]
      resources :users, defaults: {format: :json}
      post '/user/contact_form', to: 'users#contact', defaults: {format: :json}
      resources :profiles, except: [:new, :edit], defaults: {format: :json}
      resources :organizations, except: [:new, :edit], defaults: {format: :json}
      resources :user_event_hours, except: [:new, :edit], defaults: {format: :json}
      resources :opportunities, except: [:new, :edit], defaults: {format: :json}
      match '/organizations/existence_check/:fb_id', to: 'organizations#existence_check', via: :get, defaults: {format: :json}
      match '/people/import', to: 'people#import', via: :post, defaults: {format: :json}
      match '/organizations/:id/people', to: 'organizations#people', via: :get, defaults: {format: :json}
      match '/organizations/:id/opportunities', to: 'organizations#opportunities', via: :get, defaults: {format: :json}
      match '/opportunities/existence_check/:fb_id', to: 'opportunities#existence_check', via: :get, defaults: {format: :json}
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
