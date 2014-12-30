"use strict";angular.module("voluntrApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","facebook","ui.bootstrap","ui.router","duScroll","ngMaterial","ngMap","Devise","geolocation","highcharts-ng"]).config(["FacebookProvider",function(a){a.init("1478625579067596")}]).config(["$httpProvider","AuthProvider",function(a,b){b.registerPath("/api/v1/users.json"),b.loginPath("/api/v1/users/sign_in.json"),a.interceptors.push("authInterceptor")}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("landing_page",{"abstract":!0,url:"/",templateUrl:"views/landing_page.html",controller:"LandingPageCtrl"}).state("landing_page.initial_page",{url:"",templateUrl:"views/landing_page_initial.html",controller:"LandingPageCtrl"}).state("landing_page.volunteer_landing",{url:"volunteers",templateUrl:"views/landing_page_volunteers.html",controller:"LandingPageVolunteerCtrl"}).state("volunteer_home",{url:"/volunteer_home",templateUrl:"views/volunteer_home.html",resolve:{userLocation:function(a){return a.getLocation().then(function(a){var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);return b})}},controller:"VolunteerHomeCtrl"}).state("landing_page.organization_landing",{url:"organizations",templateUrl:"views/landing_page_organizations.html",controller:"LandingPageOrganizationsCtrl"}).state("organization_home",{url:"/organization_home/:organization_Id",templateUrl:"views/organization_home.html",controller:"OrganizationHomeCtrl"}).state("profile",{url:"/profile/:profile_Id",templateUrl:"views/profile.html",controller:"ProfileCtrl"})}]),angular.module("voluntrApp").controller("LandingPageCtrl",["$scope","Facebook","Organization","$http","$state","Auth","$rootScope","$location","$window","$anchorScroll","$document",function(a,b,c,d,e,f,g,h,i,j,k){a.window_height=window.innerHeight,a.window_width=window.innerWidth,$(window).resize(function(){a.$apply(function(){a.window_height=i.innerHeight,a.window_width=i.innerWidth})});var l=1e3;a.goToSection=function(b){if(console.log(b),a.window_width>720)var c=225;else if(a.window_width<720&&"landing-page-organizations"!==b)var c=50;else if(a.window_width<720&&"landing-page-organizations"===b){console.log(b);var c=0}var d=angular.element(document.getElementById(b));k.scrollToElement(d,c,l)},a.organizationslide="organization-1",a.organization_slide=function(b){console.log(b),a.organizationslide=b},a.contactslide="contact-1",a.contact_slide=function(b){console.log(b),a.contactslide=b},a.organizationLogIn=function(){b.getLoginStatus(function(c){"connected"===c.status?(a.facebook_token=c.authResponse.accessToken,e.go("landing_page.organization_landing")):"connected"!==c.status&&(b.login(function(){b.api("/me/accounts",function(b){a.facebook_token=b.authResponse.accessToken})},{scope:["manage_pages","user_groups"]}),e.go("landing_page.organization_landing"))}),console.log(a.organizations)},a.newContact=function(){d.post("/api/v1/user/contact_form",{email:a.newContact.contact_email,content:a.newContact.contact_content}).success(function(){alert("Thanks for Contacting Us, We Will Respond Soon!")}).error(function(){alert("Thanks for Contacting Us, We Will Respond Soon!"),a.newContact.contact_email="",a.newContact.contact_content=""})}}]),angular.module("voluntrApp").factory("Organization",["$resource",function(a){function b(){this.service=a("/api/v1/organizations/:organization_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({Organization_Id:a})},new b}]),angular.module("voluntrApp").controller("LandingPageOrganizationsCtrl",["$scope","Facebook","$http","Organization",function(a,b,c,d){var e=function(b){if(!a.organizations){var d=[];a.organizations=d}c({method:"GET",url:"/api/v1/organizations/existence_check/"+b.id}).success(function(a){a.fb_id?(b.exists=!0,b.v_id=a.id):a.fb_id||(b.exists=!1)}).error(function(){}),a.organizations.push(b)};b.getLoginStatus(function(a){"connected"===a.status&&b.api("/me/accounts",function(a){angular.forEach(a.data,e)})}),a.addOrganization=function(b){a.organization=b;var c={};c.fb_id=b.id;var e=d.create(c);e.$promise.then(function(b){a.organization.v_id=b.id,a.organization.exists=!0})}}]),angular.module("voluntrApp").controller("OrganizationHomeCtrl",["$scope","Facebook","Organization","$stateParams","$state","Event","$http",function(a,b,c,d,e,f,g){var h=function(c){if(!a.events){var d=[];a.events=d}b.api("/"+c.id,function(b){c=b,g({method:"GET",url:"/api/v1/events/existence_check/"+c.id}).success(function(b){b.fb_id?(c.exists=!0,c.v_id=b.id):b.fb_id||(c.exists=!1),a.events.push(c),console.log(a.events)}).error(function(){})})};b.getLoginStatus(function(f){"connected"===f.status?c.get({organization_Id:d.organization_Id},function(c){b.api("/"+c.fb_id,function(d){a.organization=d,b.api("/"+c.fb_id+"/photos",function(d){a.organization.picture=d.data[0],console.log(a.organization),b.api("/"+c.fb_id+"/posts",function(a){console.log(a)}),b.api("/"+c.fb_id+"/tagged",function(a){console.log(a)})})}),b.api("/"+c.fb_id+"/events",function(a){angular.forEach(a.data,h)})}):"connected"!==f.status&&e.go("landing_page.initial_page")}),a.addEvent=function(b){var c={};c.fb_id=b.id,c.name=b.name,c.location=b.location,c.description=b.description,c.latitude=b.venue.latitude,c.longitude=b.venue.longitude,c.start_time=b.start_time,c.end_time=b.end_time,c.timezone=b.timezone,c.organization_id=d.organization_Id;f.create(c);a.event.exists,console.log(a.event)},a.lineGraphConfig={options:{chart:{type:"line"}},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},series:[{name:"Facebook Likes",data:[1,4,12,16,45,100,125,126,140,150,200,250]},{name:"Recorded Hours",data:[45,80,75,60,120,125,25,200,15,20,200,25]}],title:{text:"Your Organization's Information"},loading:!1,size:{height:"350"}},a.pieChartConfig={options:{chart:{type:"pie"}},series:[{name:"Attending Events",data:[["Under 18",10],["18-24",25],["24-34",30],["34-44",15],["44-60",10],["60+",10]]}],title:{text:"Demographic of Volunteers"},loading:!1,size:{height:"250"}},a.barChartConfig={options:{chart:{type:"bar"}},xAxis:{categories:["Event 1","Event 2","Event 3"]},series:[{name:"Attending Facebook Event",data:[200,250,300]},{name:"Recorded Hours",data:[45,80,120]},{name:"Fund Raising",data:[450,600,1e3]}],title:{text:"Past Events Information"},loading:!1,size:{height:"250"}}}]),angular.module("voluntrApp").factory("Event",["$resource",function(a){function b(){this.service=a("/api/v1/events/:event_Id",{Event_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({event_Id:a})},new b}]),angular.module("voluntrApp").service("authInterceptor",["$rootScope","$q","$location","$injector",function(a,b){return{request:function(a){return a.headers=a.headers||{},localStorage.token?a.headers.Authorization="Bearer "+localStorage.token:sessionStorage.token&&(a.headers.Authorization="Bearer "+sessionStorage.token),a},response:function(a){return a||b.when(a)}}}]),angular.module("voluntrApp").controller("VolunteerHomeCtrl",["$scope","geolocation","Event","Organization","$http","$timeout","userLocation","$modal","$rootScope","User",function(a,b,c,d,e,f,g,h,i,j){j.get({user_Id:localStorage.user_id},function(a){console.log(a),i.user=a},function(){}),a.$on("mapInitialized",function(a,b){b.setCenter(g)}),a.getDistance=function(b){console.log("Get Distance"),b.distance||f(function(){function c(c,d){d==google.maps.DistanceMatrixStatus.OK&&(b.distance=c.rows[0].elements[0].distance.text,a.event=b,console.log(a.event))}var d=g,e=new google.maps.LatLng(b.latitude,b.longitude),f=new google.maps.DistanceMatrixService;f.getDistanceMatrix({origins:[d],destinations:[e],travelMode:google.maps.TravelMode.DRIVING,unitSystem:google.maps.UnitSystem.IMPERIAL},c)},500)},a.events=c.all(),a.open=function(a){var b=h.open({templateUrl:"views/profile_create.html",controller:"ProfileCreateCtrl",windowClass:"create-profile-modal-window",size:a});b.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("LandingPageVolunteerCtrl",["$scope","$state","Auth","$rootScope",function(a,b,c,d){localStorage.user_id&&b.go("volunteer_home"),a.newVolunteer=function(){var e={};e.email=a.newVolunteer.email,e.password=a.newVolunteer.password,e.passwordConfirmation=a.newVolunteer.passwordConfirmation,c.register(e).then(function(a){console.log(a),d.user=a.user,localStorage.token=a.token,localStorage.user_id=a.user.id,b.go("volunteer_home",{user_Id:a.user.id})})},a.logIn=function(){var e={};e.email=a.logIn.email,e.password=a.logIn.password,c.login(e).then(function(a){d.user=a.user,localStorage.user_id=a.user.id,localStorage.token=a.token,b.go("volunteer_home",{user_Id:a.user.id})})}}]),angular.module("voluntrApp").controller("ProfileCtrl",["$scope","$log","$modal","Profile","$stateParams","$rootScope",function(a,b,c,d,e,f){d.get({profile_Id:e.profile_Id},function(b){a.profile=b},function(){}),a.open=function(b){var d=c.open({templateUrl:"views/record_hours.html",controller:"RecordHoursCtrl",windowClass:"record-hours-modal-window",size:b});d.result.then(function(){a.profile.total_hours+=f.recordedHours,f.recordedHours=null},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("RecordHoursCtrl",["$scope","Event","UserEventHours","$modal","$modalInstance","$rootScope",function(a,b,c,d,e,f){a.events=b.all(),a.hours1=0,a.hours2=0,a.h1_up=function(){a.hours1<9&&(a.hours1+=1)},a.h2_up=function(){a.hours2<9&&(a.hours2+=1)},a.h1_down=function(){a.hours1>0&&(a.hours1-=1)},a.h2_down=function(){a.hours2>0&&(a.hours2-=1)},a.recordHours=function(){var b=10*a.hours1+a.hours2,d={};d.event_id=a.recordHours.event_id,d.user_id=localStorage.user_id,d.description=a.description,d.hours=b;var g=c.create(d);f.recordedHours=g.hours,e.close()}}]),angular.module("voluntrApp").factory("UserEventHours",["$resource",function(a){function b(){this.service=a("/api/v1/user_event_hours/:user_event_hours_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({user_event_hours_Id:a})},new b}]),angular.module("voluntrApp").factory("Profile",["$resource",function(a){function b(){this.service=a("/api/v1/profiles/:profile_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({profile_Id:a})},new b}]),angular.module("voluntrApp").factory("User",["$resource",function(a){function b(){this.service=a("/api/v1/users/:user_Id",{user_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.get=function(a,b,c){this.service.get(a,b,c)},b.prototype.update=function(a){return this.service.update(a)},new b}]),angular.module("voluntrApp").controller("ProfileCreateCtrl",["$scope","Profile","$modalInstance",function(a,b,c){a.createProfile=function(){console.log("modal");var d={};d.user_id=a.user.id,d.first_name=a.createProfile.first_name,d.last_name=a.createProfile.last_name;var e=b.create(d);a.user.profile=e,c.close()}}]);