Rails.application.routes.draw do



  resources :resources, except: [:new, :edit]
  scope '/api' do
    scope '/v1' do
      #devise_for :users,
       #          :controllers => { registrations: 'registrations',
        #                           sessions: 'sessions'}, defaults: {format: :json}
      resources :mailing_service_lists, except: [:new, :edit], defaults: {format: :json}
      resources :organization_mailing_services, except: [:new, :edit], defaults: {format: :json}
      resources :opportunity_roles, except: [:new, :edit], defaults: {format: :json}
      resources :organization_email_templates, except: [:new, :edit], defaults: {format: :json}
      resources :schedules, except: [:new, :edit], defaults: {format: :json}
      resources :person_opportunities, except: [:new, :edit], defaults: {format: :json}
      resources :daily_statistics, except: [:new, :edit], defaults: {format: :json}
      resources :recorded_hours, except: [:new, :edit], defaults: {format: :json}
      resources :opportunity_types, except: [:new, :edit], defaults: {format: :json}
      resources :users, defaults: {format: :json}
      resources :people, defaults: {format: :json}
      post '/user/contact_form', to: 'users#contact', defaults: {format: :json}
      resources :profiles, except: [:new, :edit], defaults: {format: :json}
      resources :organizations, except: [:new, :edit], defaults: {format: :json}
      resources :user_event_hours, except: [:new, :edit], defaults: {format: :json}
      resources :opportunities, except: [:new, :edit], defaults: {format: :json}
      match '/organizations/existence_check/:fb_id', to: 'organizations#existence_check', via: :get, defaults: {format: :json}

      # People Routes
      match '/people/import', to: 'people#import', via: :post, defaults: {format: :json}
      match '/people/:id/opportunities', to: 'people#opportunities', via: :get, defaults: {format: :json}
      match '/people/:id/recorded_hours', to: 'people#recorded_hours', via: :get, defaults: {format: :json}

      # Organization Routes
      match '/organizations/by_url/:custom_url/', to: 'organizations#show_by_url', via: :get, defaults: {format: :json}
      match '/organizations/:id/search/', to: 'organizations#search_organization', via: :get, defaults: {format: :json}
      match '/organizations/:id/people', to: 'organizations#people', via: :get, defaults: {format: :json}
      match '/organizations/:id/authorization', to: 'organizations#log_in', via: :get, defaults: {format: :json}
      match '/organizations/:id/daily_statistics', to: 'organizations#daily_statistics', via: :get, defaults: {format: :json}
      match '/organizations/:id/opportunities', to: 'organizations#opportunities', via: :get, defaults: {format: :json}
      match '/opportunity/:id/schedule', to: 'opportunities#opportunity_schedule', via: :get, defaults: {format: :json}
      match '/organizations/:id/recorded_hours', to: 'organizations#recorded_hours', via: :get, defaults: {format: :json}
      match '/organizations/:id/posts', to: 'organizations#posts', via: :get, defaults: {format: :json}
      match '/organizations/:id/contact_volunteers', to: 'organizations#contact_volunteers', via: :get, defaults: {format: :json}


      # email services
      match '/organizations/:id/auth/mail_chimp_check', to: 'organization_mailing_services#mailchimp_check', via: :get, defaults: {format: :json}
      match '/auth/mailchimp_callback', to: 'organization_mailing_services#mailchimp_callback', via: :get, defaults: {format: :json}

      # Opportunities Routes
      match '/opportunities/:id/volunteers', to: 'opportunities#volunteers', via: :get, defaults: {format: :json}
      match '/opportunities/:id/instance', to: 'opportunities#opportunity_instance', via: :get, defaults: {format: :json}
      match '/opportunities/:id/recorded_hours', to: 'opportunities#recorded_hours', via: :get, defaults: {format: :json}
      match '/opportunities/existence_check/:fb_id', to: 'opportunities#existence_check', via: :get, defaults: {format: :json}
      match '/opportunities/sign_in/:opportunity_id', to: 'opportunities#existence_check', via: :get, defaults: {format: :json}
      match '/opportunities/:id/instance_statistics', to: 'opportunities#instance_statistics', via: :get, defaults: {format: :json}
      match '/opportunities/:id/roles', to: 'opportunities#roles', via: :get, defaults: {format: :json}
      # match '/opportunities/:fb_id', to: 'opportunities#instance_schedule', via: :get, defaults: {format: :json}

      # Reports
      match '/reports/opportunity/:id', to: 'reports#opportunity', via: :get, defaults: {format: :json}
      match '/reports/person/:id', to: 'reports#person', via: :get, defaults: {format: :json}
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
