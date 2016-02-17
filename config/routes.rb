Rails.application.routes.draw do



  resources :organization_types, except: [:new, :edit]
  resources :user_organizations, except: [:new, :edit]
  scope '/api' do
    scope '/v1' do
      match '/users/update_password', to: 'users#update_password', via: :patch, defaults: {format: :json}
      match '/users/current/organizations', to: 'users#current_user_organizations', via: :get, defaults: {format: :json}
      devise_for :users,
                :controllers => { registrations: 'registrations',
                                  confirmations: 'confirmations',
                                  sessions: 'sessions'}, defaults: {format: :json}
      resources :group_administrators, except: [:new, :edit], defaults: {format: :json}
      resources :groups, except: [:new, :edit], defaults: {format: :json}
      resources :resources, except: [:new, :edit], defaults: {format: :json}
      resources :mailing_service_lists, except: [:new, :edit], defaults: {format: :json}
      resources :organization_people, except: [:new, :edit], defaults: {format: :json}
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
      post '/user/contact_form', to: 'administration#contact_email', defaults: {format: :json}
      post '/administration/feedback', to: 'administration#feedback', defaults: {format: :json}
      resources :profiles, defaults: {format: :json}
      resources :organizations, except: [:new, :edit], defaults: {format: :json}
      resources :user_event_hours, except: [:new, :edit], defaults: {format: :json}
      resources :opportunities, except: [:new, :edit], defaults: {format: :json}
      match '/organizations/existence_check/:fb_id', to: 'organizations#existence_check', via: :get, defaults: {format: :json}
      match '/organization_people/:organization_id/:person_id', to: 'organization_people#show', via: :get, defaults: {format: :json}

      # People Routes
      match '/people/import', to: 'people#import', via: :post, defaults: {format: :json}
      match '/people/:id/person_availability_schedule', to: 'people#person_availability_schedule', via: :get, defaults: {format: :json}
      match '/people/:id/add_schedule', to: 'people#add_schedule', via: :patch, defaults: {format: :json}
      match '/people/:id/opportunities', to: 'people#opportunities', via: :get, defaults: {format: :json}
      match '/people/:id/recorded_hours', to: 'people#recorded_hours', via: :get, defaults: {format: :json}

      # Organization Routes
      match '/organizations/create/with_email/', to: 'organizations#create_with_email', via: :post, defaults: {format: :json}
      match '/organizations/:id/get_token/', to: 'organizations#provide_token', via: :get, defaults: {format: :json}
      match '/organizations/by_url/:custom_url/', to: 'organizations#show_by_url', via: :get, defaults: {format: :json}
      match '/organizations/:id/search/', to: 'organizations#search_organization', via: :get, defaults: {format: :json}
      match '/organizations/:id/people_search/', to: 'organizations#search_people', via: :get, defaults: {format: :json}
      match '/organizations/:id/people', to: 'organizations#people', via: :get, defaults: {format: :json}
      match '/organizations/:id/authorization', to: 'organizations#log_in', via: :get, defaults: {format: :json}
      match '/organizations/:id/daily_statistics', to: 'organizations#daily_statistics', via: :get, defaults: {format: :json}
      match '/organizations/:id/opportunities', to: 'organizations#opportunities', via: :get, defaults: {format: :json}
      match '/organizations/:id/summary_statistics', to: 'organizations#summary_statistics', via: :get, defaults: {format: :json}
      match '/opportunity/:id/schedule', to: 'opportunities#opportunity_schedule', via: :get, defaults: {format: :json}
      match '/organizations/:id/recently_recorded_hours', to: 'organizations#recently_recorded_hours', via: :get, defaults: {format: :json}
      match '/organizations/:id/posts', to: 'organizations#posts', via: :get, defaults: {format: :json}
      match '/organizations/:id/contact_volunteers', to: 'organizations#contact_volunteers', via: :get, defaults: {format: :json}
      match '/organizations/:id/public_opportunities', to: 'organizations#public_opportunities', via: :get, defaults: {format: :json}
      match '/organizations/:id/associated_organizations', to: 'organizations#associated_organizations', via: :get, defaults: {format: :json}

      #search
      match '/search/organizations_search/', to: 'search#search_organizations', via: :get, defaults: {format: :json}

      # group routes
      match '/groups/:id/people', to: 'groups#people', via: :get, defaults: {format: :json}
      match '/groups/:id/recorded_hours', to: 'groups#recorded_hours', via: :get, defaults: {format: :json}
      match '/groups/:id/opportunities', to: 'groups#opportunities', via: :get, defaults: {format: :json}


      # email services
      match '/organizations/:id/auth/mail_chimp_check', to: 'organization_mailing_services#mailchimp_check', via: :get, defaults: {format: :json}
      match '/auth/mailchimp_callback', to: 'organization_mailing_services#mailchimp_callback', via: :get, defaults: {format: :json}

      # Opportunities Routes
      match '/opportunities/:id/volunteers', to: 'opportunities#volunteers', via: :get, defaults: {format: :json}
      match '/opportunities/:id/delete_instance', to: 'opportunities#destroy_instance', via: :delete, defaults: {format: :json}
      match '/opportunities/:id/delete_future_instances', to: 'opportunities#destroy_future_instances', via: :delete, defaults: {format: :json}
      match '/opportunities/:id/instance', to: 'opportunities#instance', via: :get, defaults: {format: :json}
      match '/opportunities/:id/recorded_hours', to: 'opportunities#recorded_hours', via: :get, defaults: {format: :json}
      match '/opportunities/existence_check/:fb_id', to: 'opportunities#existence_check', via: :get, defaults: {format: :json}
      match '/opportunities/sign_in/:opportunity_id', to: 'opportunities#existence_check', via: :get, defaults: {format: :json}
      match '/opportunities/:id/instance_statistics', to: 'opportunities#instance_statistics', via: :get, defaults: {format: :json}
      match '/opportunities/:id/roles', to: 'opportunities#roles', via: :get, defaults: {format: :json}
      match '/opportunities/:id/update_schedule', to: 'opportunities#update_schedule', via: :patch, defaults: {format: :json}
      match '/opportunities/by_location/user_location/', to: 'opportunities#by_user_location', via: :get, defaults: {format: :json}
      match '/organizations/:id/nearby_organizations/', to: 'organizations#nearby_organizations', via: :get, defaults: {format: :json}
      # match '/opportunities/:fb_id', to: 'opportunities#instance_schedule', via: :get, defaults: {format: :json}

      # Reports
      match '/reports/opportunity/:id', to: 'reports#opportunity', via: :get, defaults: {format: :json}
      match '/reports/person/:id', to: 'reports#person', via: :get, defaults: {format: :json}
      match '/reports/organization/:id', to: 'reports#organization', via: :get, defaults: {format: :json}

      #schedule
      match '/schedules/format/schedule_string', to: 'schedules#schedule_string', via: :get, defaults: {format: :json}


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
