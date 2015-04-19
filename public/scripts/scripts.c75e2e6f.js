"use strict";angular.module("voluntrApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","facebook","ui.bootstrap","pc035860.scrollWatch","ui.router","duScroll","ngMaterial","ngMap","Devise","geolocation","highcharts-ng","ng-mfb","mdDateTime","config","angular-duration-format","ui.calendar","snap","leaflet-directive","kendo.directives"]).config(["FacebookProvider","ENV",function(a,b){a.init(b.appId)}]).config(["$httpProvider","AuthProvider",function(a,b){b.registerPath("/api/v1/users.json"),b.loginPath("/api/v1/users/sign_in.json"),a.interceptors.push("authInterceptor")}]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c,a.$on("$stateChangeSuccess",function(b,c,d,e,f){a.previousState_name=e.name,a.previousState_params=f,console.log(a.previousState_name)}),a.back=function(){b.go(a.previousState_name,a.previousState_params)}}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("landing_page",{url:"/",templateUrl:"static_pages/landing_page.html",controller:"LandingPageCtrl"}).state("volunteer_home",{url:"/volunteer_home",templateUrl:"volunteers/volunteer_home.html",controller:"VolunteerHomeCtrl"}).state("organizations",{url:"/organizations","abstract":!0,templateUrl:"organizations/organization.html",controller:"OrganizationMainCtrl"}).state("organizations.registration",{url:"/registration",templateUrl:"organizations/registration/organization_registration.html",controller:"OrganizationRegistrationCtrl"}).state("organizations.organization_home",{url:"/:organization_Id",templateUrl:"organizations/home/organization_home.html",controller:"OrganizationHomeCtrl"}).state("organizations.organization_search",{url:"/search/:organization_Id",templateUrl:"organizations/search/organization_search.html",controller:"OrganizationSearchCtrl"}).state("organizations.people_home",{url:"/:organization_Id/people_home",templateUrl:"organizations/people/people_home.html",controller:"PeopleHomeCtrl"}).state("organizations.opportunities_home",{url:"/:organization_Id/opportunity_home",templateUrl:"organizations/opportunities/opportunities_home.html",controller:"OpportunitiesHomeCtrl"}).state("profile",{url:"/profile/:profile_Id",templateUrl:"views/profile.html",controller:"ProfileCtrl"})}]),angular.module("voluntrApp").factory("Organization",["$resource",function(a){function b(){this.service=a("/api/v1/organizations/:organization_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({Organization_Id:a})},new b}]),angular.module("voluntrApp").factory("Opportunity",["$resource",function(a){function b(){this.service=a("/api/v1/opportunities/:opportunity_Id",{Event_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({opportunity_Id:a})},new b}]),angular.module("voluntrApp").factory("PersonOpportunity",["$resource",function(a){function b(){this.service=a("/api/v1/person_opportunities/:person_opportunity_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({person_opportunity_Id:a})},new b}]),angular.module("voluntrApp").service("authInterceptor",["$rootScope","$q","$location","$injector",function(a,b){return{request:function(a){return a.headers=a.headers||{},localStorage.token?a.headers.Authorization="Bearer "+localStorage.token:sessionStorage.token&&(a.headers.Authorization="Bearer "+sessionStorage.token),a},response:function(a){return a||b.when(a)}}}]),angular.module("voluntrApp").factory("RecordedHours",["$resource",function(a){function b(){this.service=a("/api/v1/recorded_hours/:recorded_hours_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({person_Id:a})},new b}]),angular.module("voluntrApp").factory("People",["$resource",function(a){function b(){this.service=a("/api/v1/people/:person_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({person_Id:a})},new b}]),angular.module("voluntrApp").controller("ProfileCtrl",["$scope","$log","$modal","Profile","$stateParams","$rootScope",function(a,b,c,d,e,f){d.get({profile_Id:e.profile_Id},function(b){a.profile=b},function(){}),a.open=function(b){var d=c.open({templateUrl:"views/record_hours.html",controller:"RecordHoursCtrl",windowClass:"record-hours-modal-window",size:b});d.result.then(function(){a.profile.total_hours+=f.recordedHours,f.recordedHours=null},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("RecordHoursCtrl",["$scope","Event","UserEventHours","$modal","$modalInstance","$rootScope",function(a,b,c,d,e,f){a.events=b.all(),a.hours1=0,a.hours2=0,a.h1_up=function(){a.hours1<9&&(a.hours1+=1)},a.h2_up=function(){a.hours2<9&&(a.hours2+=1)},a.h1_down=function(){a.hours1>0&&(a.hours1-=1)},a.h2_down=function(){a.hours2>0&&(a.hours2-=1)},a.recordHours=function(){var b=10*a.hours1+a.hours2,d={};d.event_id=a.recordHours.event_id,d.user_id=localStorage.user_id,d.description=a.description,d.hours=b;var g=c.create(d);f.recordedHours=g.hours,e.close()}}]),angular.module("voluntrApp").factory("UserEventHours",["$resource",function(a){function b(){this.service=a("/api/v1/user_event_hours/:user_event_hours_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({user_event_hours_Id:a})},new b}]),angular.module("voluntrApp").factory("Profile",["$resource",function(a){function b(){this.service=a("/api/v1/profiles/:profile_Id",{organization_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.all=function(){return this.service.query()},b.prototype.get=function(a,b,c){return this.service.get(a,b,c)},b.prototype.create=function(a){return this.service.save(a)},b.prototype.update=function(a){return this.service.update(a)},b.prototype.delete=function(a){return this.service.remove({profile_Id:a})},new b}]),angular.module("voluntrApp").factory("User",["$resource",function(a){function b(){this.service=a("/api/v1/users/:user_Id",{user_Id:"@id"},{update:{method:"PATCH"}})}return b.prototype.get=function(a,b,c){this.service.get(a,b,c)},b.prototype.update=function(a){return this.service.update(a)},new b}]),angular.module("voluntrApp").factory("searchService",function(){return{search:{query:""}}}),angular.module("voluntrApp").controller("ProfileCreateCtrl",["$scope","Profile","$modalInstance",function(a,b,c){a.createProfile=function(){console.log("modal");var d={};d.user_id=a.user.id,d.first_name=a.createProfile.first_name,d.last_name=a.createProfile.last_name;var e=b.create(d);a.user.profile=e,c.close()}}]),angular.module("voluntrApp").controller("AddDataCtrl",["$scope","organization","Facebook","$filter",function(a,b,c){a.organization=b,a.toggleImpressionDataOnLineGraph=function(b,d,e){var f={name:e,data:[]},g=[];angular.forEach(b,function(a){var b=[];if("shared_post"!==d)var c={method:"GET",relative_url:"/"+a.id+"/insights/"+d+"/lifetime"};else if("shared_post"===d)var c={method:"GET",relative_url:"/"+a.id+"/sharedposts/"};b[0]=a.created_time,g.push(c),f.data.push(b)}),c.api("/","POST",{batch:g,include_headers:!1},function(a){for(var b=a.length-1;b>=0;b--){var c=a[b],e=JSON.parse(c.body);"shared_post"!==d?(console.log(f),f.data[b][1]=e.data[0].values[0].value):"shared_post"===d&&(f.data[b][1]=e.data.length)}}),a.lineGraphConfig.series.push(f),console.log(f.data),console.log(a.lineGraphConfig.series)}}]),angular.module("voluntrApp").controller("LandingPageCtrl",["$scope","Facebook","Organization","$http","$state","Auth","$rootScope","$location","$window","$modal",function(a,b,c,d,e,f,g,h,i,j){var k=$(".nav").offset().top,l=function(){var a=$(window).scrollTop();a>k?$(".nav").addClass("sticky"):$(".nav").removeClass("sticky")};l(),$(window).scroll(function(){l()}),$(".fadein img:gt(0)").hide(),setInterval(function(){$(".fadein :first-child").fadeOut().next("img").fadeIn().end().appendTo(".fadein")},4e3),$(".screen1button").click(function(){console.log("OPEN OPEN"),$("#login").fadeIn(400)}),$(".close").click(function(){$("#login").fadeOut(400)}),$(".navicon").click(function(a){a.originalEvent||$(".navmenu").toggleClass("navb")}),$(".navmenu a").click(function(){$(".navmenu").addClass("navb"),console.log("menu close")}),$(".navmenu a").click(function(a){a.preventDefault(),$("html,body").scrollTo(this.hash,this.hash)}),a.newContact=function(){d.post("/api/v1/user/contact_form",{email:a.newContact.contact_email,content:a.newContact.contact_content}).success(function(){alert("Thanks for Contacting Us, We Will Respond Soon!"),a.newContact.contact_email="",a.newContact.contact_content=""}).error(function(){alert("Thanks for Contacting Us, We Will Respond Soon!"),a.newContact.contact_email="",a.newContact.contact_content=""})},a.open_lp_modal=function(b){var c=j.open({templateUrl:"views/tos_privacy.html",controller:"LandingPageCtrl",size:b});c.result.then(function(){a.profile.total_hours+=g.recordedHours,g.recordedHours=null},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("OrganizationRegistrationCtrl",["$scope","Facebook","$http","Organization","$state","$stateParams",function(a,b,c,d,e,f){a.log_in=function(){b.login(function(b){a.connected_to_facebook=!0,a.oauth_key=b.authResponse.accessToken,console.log(a.oauth_key)},{scope:"user_groups,read_insights,manage_pages"})};var g=function(d){if(!a.organizations){var e=[];a.organizations=e}b.api("/"+d.id+"/picture",{type:"large"},function(a){d.picture=a.data.url}),c.get("/api/v1/organizations/existence_check/"+d.id).success(function(a){a?(d.exists=!0,d.v_id=a.id):a||(d.exists=!1)}).error(function(){}),a.organizations.push(d)};b.getLoginStatus(function(b){"connected"===b.status?(a.connected_to_facebook=!0,a.oauth_key=b.authResponse.accessToken,console.log(a.oauth_key)):"connected"!==b.status&&(a.connected_to_facebook=!1)}),a.$watch("connected_to_facebook",function(){a.connected_to_facebook&&!a.organizations&&b.api("/me/accounts",function(a){console.log(a),angular.forEach(a.data,g)})}),a.addOrganization=function(b){a.organization=b;var d={};d.fb_id=b.id,d.name=b.name,d.description=b.description,d.initial_likes=b.likes,d.initial_talking_about;c.post("/api/v1/organizations/",{organization:{name:d.name,fb_id:d.fb_id,description:d.description},oauth_key:a.oauth_key}).success(function(a){e.go("organizations.organization_home",{organization_Id:a.id}),f.organization_Id=a.id}).error(function(){})},a.organizationRegistration=function(c){a.organization_registration=!0,b.api("/"+c.id,function(a){c.description=a.description}),a.organization=c},a.organizationList=function(){a.organization_registration=!1}}]),angular.module("voluntrApp").controller("OrganizationMainCtrl",["$scope","Facebook","$stateParams","$http","$state","$filter","uiCalendarConfig","$rootScope",function(a,b,c,d,e,f,g,h){a.$on("$stateChangeSuccess",function(){a.current_state=e.current.name,h.organization_id=e.params.organization_Id})}]),angular.module("voluntrApp").controller("OrganizationHomeCtrl",["$scope","Facebook","Organization","$stateParams","$state","Opportunity","$http","$filter","$parse","$modal","$rootScope",function(a,b,c,d,e,f,g,h,i,j,k){var l=function(b){a.lineGraphConfig.series[0].data.push([Date.parse(b.post_time),Number(b.likes)])},m=function(b){a.lineGraphConfig.series[1].data.push([Date.parse(b.date),Number(b.total_recorded_hours)]),a.lineGraphConfig.series[2].data.push([Date.parse(b.date),Number(b.planned_hours)]),a.lineGraphConfig.series[3].data.push([Date.parse(b.date),Number(b.total_added_volunteers)])};b.getLoginStatus(function(b){"connected"===b.status?c.get({organization_Id:d.organization_Id},function(b){a.organization=b,k.organization_id=b.id,a.organization.posts=h("orderBy")(b.posts,"post_time"),angular.forEach(a.organization.posts,l),g.get("api/v1/organizations/"+b.id+"/recorded_hours").success(function(b){a.organization.recorded_hours=b}).error(function(a){console.log(a)}),g.get("api/v1/organizations/"+b.id+"/daily_statistics").success(function(b){console.log(b),a.organization.daily_statistics=h("orderBy")(b,"date"),angular.forEach(a.organization.daily_statistics,m)}).error(function(a){console.log(a)}),g.get("api/v1/organizations/"+b.id+"/contact_volunteers").success(function(b){a.organization.contact_volunteers=b}).error(function(a){console.log(a)})}):"connected"!==b.status&&e.go("landing_page.initial_page")}),a.generated_stories="",a.open=function(b){var c=j.open({templateUrl:"views/add_additional_data.html",controller:"AddDataCtrl",size:b,resolve:{organization:function(){return a.organization}}});c.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date),console.log(a.generated_stories)})},a.user_stories=!1,a.addEvent=function(b){var c={};c.fb_id=b.id,c.name=b.name,c.location=b.location,c.description=b.description,c.latitude=b.venue.latitude,c.longitude=b.venue.longitude,c.start_time=b.start_time,c.end_time=b.end_time,c.timezone=b.timezone,c.organization_id=d.organization_Id;Event.create(c);a.event.exists,console.log(a.event)},a.addEventToGraph=function(b,c){if(console.log(c),b.graph_active)b.graph_active&&c>-1&&(k.lineGraphConfig.xAxis.plotLines.splice(b.plotLineIndex,1),k.lineGraphConfig.series[0].data.splice(b.event_data_point_index,1));else{console.log(b);var d={};d.color="red",d.dashStyle="longdashdot",d.value=Date.parse(b.start_time),d.width=3,d.label={},d.label.text=b.name,k.lineGraphConfig.xAxis.plotLines.push(d),b.plot_line_index=k.lineGraphConfig.xAxis.plotLines.indexOf(d);var e=[];e[0]=Date.parse(b.start_time)+6048e5,e[1]=null,k.lineGraphConfig.series[0].data.push(e),b.event_data_point_index=k.lineGraphConfig.series[0].data.indexOf(e),a.organization.posts[c]=b,console.log(b.event_data_point)}},k.lineGraphConfig={options:{chart:{type:"spline",zoomType:"xy"}},xAxis:{type:"datetime",title:{text:"Date"}},yAxis:{allowDecimals:!1,floor:0},series:[{name:"Post Likes",data:[]},{name:"Total Recorded Volunteer Hours",data:[]},{name:"Total Planned Volunteer Hours",data:[]},{name:"Total Added Volunteers",data:[]}],title:{text:"Your Organization's Timeline"},loading:!1,size:{height:"250"}}}]),angular.module("voluntrApp").controller("PeopleHomeCtrl",["$scope","Facebook","$http","$stateParams","$modal",function(a,b,c,d,e){c.get("api/v1/organizations/"+d.organization_Id+"/people").success(function(b){a.people=b}).error(function(a){console.log(a)}),a.personDetail=function(a,b){var c=e.open({templateUrl:"organizations/people/person_detail_modal.html",controller:"PersonDetailCtrl",windowClass:"add-event-modal-window",size:a,resolve:{id:function(){return b}}});c.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("AddPeopleCtrl",["$scope","Facebook","$stateParams","$http","$state","People","$modal",function(a,b,c,d,e,f,g){a.newPerson={},a.addPerson=function(){var b={};b.id=a.newPerson.id,b.first_name=a.newPerson.first_name,b.last_name=a.newPerson.last_name,b.email=a.newPerson.email,b.phone=a.newPerson.phone,b.address=a.newPerson.address,b.city=a.newPerson.city,b.state=a.newPerson.state,b.zip_code=a.newPerson.zip_code,b.organization_id=c.organization_Id;f.create(b);g.close()},a.matchedPerson=function(b){a.newPerson.id=b.id,a.newPerson.first_name=b.first_name,a.newPerson.last_name=b.last_name},d.get("api/v1/organizations/"+c.organization_Id+"/people").success(function(b){a.organization_people=b}).error(function(a){console.log(a)})}]),angular.module("voluntrApp").controller("PersonDetailCtrl",["$scope","Facebook","$http","$stateParams","id","People",function(a,b,c,d,e,f){f.get({person_Id:e},function(b){a.person=b,c.get("api/v1/people/"+b.id+"/opportunities").success(function(b){a.person.opportunities=b}).error(function(){})})}]),angular.module("voluntrApp").controller("AddOpportunityCtrl",["$scope","$timeout","Opportunity","$stateParams","$modalStack","$rootScope","$state","Organization","Facebook","$http","$modal",function(a,b,c,d,e,f,g,h,i,j,k){a.addEventOpportunity=function(a){var b=k.open({templateUrl:"organizations/opportunities/organization_add_event_modal.html",controller:"AddOpportunityCtrl",windowClass:"add-event-modal-window",size:a});b.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})},a.days=[];for(var l=0;30>=l;l++)a.days.push(l);a.duration_label="minutes",a.position_duration=36e5,a.$watch("newOpportunity.position_duration",function(){console.log(a.newOpportunity.position_duration),a.duration_label=a.newOpportunity.position_duration<36e5?"minutes":a.newOpportunity.position_duration<72e5?"hour":"hours",a.newOpportunity.end_time=a.newOpportunity.start_time.getTime()+a.newOpportunity.position_duration}),a.newOpportunity=function(){console.log(a.newOpportunity.position_duration);var f={};f.name=a.newOpportunity.opportunity_name,f.description=a.newOpportunity.description,f.start_time=a.newOpportunity.start_time.getTime(),f.address=a.newOpportunity.address,f.zip_code=a.newOpportunity.zip_code,f.city=a.newOpportunity.city,f.state=a.newOpportunity.state,f.organization_id=d.organization_Id,f.end_time=a.newOpportunity.end_time,f.repeating_event=a.newOpportunity.repeating_event,a.newOpportunity.repeat&&(f.daily=a.newOpportunity.repeat.repeat_daily,f.weekly=a.newOpportunity.repeat.repeat_weekly,f.monthly=a.newOpportunity.repeat.repeat_monthly,f.annually=a.newOpportunity.repeat.repeat_annually),f.repeat_count=a.newOpportunity.repeat_count,f.repeat_days=[],a.newOpportunity.sunday_repeat&&f.repeat_days.push(0),a.newOpportunity.monday_repeat&&f.repeat_days.push(1),a.newOpportunity.tuesday_repeat&&f.repeat_days.push(2),a.newOpportunity.wednesday_repeat&&f.repeat_days.push(3),a.newOpportunity.thursday_repeat&&f.repeat_days.push(4),a.newOpportunity.friday_repeat&&f.repeat_days.push(5),a.newOpportunity.saturday_repeat&&f.repeat_days.push(6),b(function(){var d=new google.maps.Geocoder;d.geocode({address:a.newOpportunity.address},function(b,c){c==google.maps.GeocoderStatus.OK&&angular.forEach(b,function(b){angular.forEach(b.address_components,function(c){if(c.short_name===a.newOpportunity.zip_code){{new google.maps.LatLng(b.geometry.location.D,b.geometry.location.k)}f.latitude=b.geometry.location.k,f.longitude=b.geometry.location.D}})})}),b(function(){c.create(f);e.dismissAll()},3e3)},3e3)};var m=function(b){if(!a.events){var c=[];a.facebook_events=c}i.api("/"+b.id,function(c){b=c,j({method:"GET",url:"/api/v1/events/existence_check/"+b.id}).success(function(c){c||a.facebook_events.push(b)}).error(function(){})})};h.get({organization_Id:d.organization_Id},function(a){i.api("/"+a.fb_id+"/events",function(a){angular.forEach(a.data,m)})}),a.open=function(b,c){b.preventDefault(),b.stopPropagation(),a[c]=!0}}]),angular.module("voluntrApp").controller("OpportunitiesHomeCtrl",["$scope","Facebook","$stateParams","$http","$state","$filter","uiCalendarConfig","$modal",function(a,b,c,d,e,f,g,h){a.eventSources=[{url:"api/v1/organizations/"+c.organization_Id+"/opportunities"}],a.uiConfig={myCalendar:{height:500,editable:!0,header:{left:"month agendaWeek agendaDay",center:"title",right:"today prev,next"},businessHours:{start:"7:00",end:"20:00",dow:[1,2,3,4,5]}}},a.opportunityDetail=function(a,b,c){var d=h.open({templateUrl:"organizations/opportunities/opportunity_detail_modal.html",controller:"OpportunityDetailCtrl",windowClass:"add-event-modal-window",size:a,resolve:{id:function(){return b},start_time:function(){return c}}});d.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})},a.uiConfig.myCalendar.eventClick=function(b){a.opportunityDetail("lg",b.id,b.start_time)}}]),angular.module("voluntrApp").controller("OpportunityDetailCtrl",["$scope","Facebook","$stateParams","$http","$state","Opportunity","id","PersonOpportunity","start_time","$modal",function(a,b,c,d,e,f,g,h,i,j){d.get("api/v1/opportunities/"+g).success(function(b){a.opportunity=b,d.get("api/v1/opportunities/"+b.id+"/instance",{params:{instance_date:new Date(i).getTime()}}).success(function(b){a.opportunity.people=b,console.log(b)}).error(function(){})}),d.get("api/v1/organizations/"+c.organization_Id+"/people").success(function(b){a.organization_people=b}).error(function(a){console.log(a)}),a.commitVolunteer=function(){},a.addOpportunityPersonModal=function(b,c){var d=j.open({templateUrl:"organizations/opportunities/add_opportunity_person.html",controller:"AddOpportunityPersonCtrl",windowClass:"add-event-modal-window",size:b,resolve:{person:function(){return c},opportunity:function(){return a.opportunity},start_time:function(){return i}}});d.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("AddOpportunityPersonCtrl",["$scope","Facebook","$stateParams","$http","$state","opportunity","PersonOpportunity","$modal","person","start_time",function(a,b,c,d,e,f,g,h,i,j){a.opportunity=f,a.opportunity.repeat_intervals=[],a.opportunity.active_days=[];for(var k=0;4>=k;k++)a.opportunity.repeat_intervals.push(k);a.scheduled_days={Monday:!1,Tuesday:!1,Wednesday:!1,Thursday:!1,Friday:!1,Saturday:!1,Sunday:!1};var l=function(b){"MO"===b?a.opportunity.active_days.push("Monday"):"TU"===b?a.opportunity.active_days.push("Tuesday"):"WE"===b?a.opportunity.active_days.push("Wednesday"):"TH"===b?a.opportunity.active_days.push("Thursday"):"FR"===b?a.opportunity.active_days.push("Friday"):"SA"===b?a.opportunity.active_days.push("Saturday"):"SU"===b&&a.opportunity.active_days.push("Sunday")};f.ical&&angular.forEach(f.ical.BYDAY,l),console.log(f.ical),a.addOpportunityPerson=function(){var b={};b.person_id=i.id,b.opportunity_id=f.id,f.ical&&(b.repeat_count=f.ical.INTERVAL,"DAILY"===f.ical.FREQ?b.daily=!0:"WEEKLY"===f.ical.FREQ?b.weekly=!0:"MONTHLY"===f.ical.FREQ&&(b.monthly=!0),b.start_time=new Date(j).getTime(),b.repeat_days=[],a.scheduled_days.Sunday&&b.repeat_days.push(0),a.scheduled_days.Monday&&b.repeat_days.push(1),a.scheduled_days.Tuesday&&b.repeat_days.push(2),a.scheduled_days.Wednesday&&b.repeat_days.push(3),a.scheduled_days.Thursday&&b.repeat_days.push(4),a.scheduled_days.Friday&&b.repeat_days.push(5),a.scheduled_days.Saturday&&b.repeat_days.push(6)),g.create(b)}}]),angular.module("voluntrApp").controller("FABCtrl",["$scope","$modal","$rootScope",function(a,b){a.addVolunteerOpportunity=function(a){var c=b.open({templateUrl:"organizations/opportunities/organization_add_position_modal.html",controller:"AddOpportunityCtrl",windowClass:"add-event-modal-window",size:a});c.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})},a.addOrganizationPerson=function(a){var c=b.open({templateUrl:"organizations/people/organization_add_person_modal.html",controller:"AddPeopleCtrl",windowClass:"add-event-modal-window",size:a});c.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})},a.recordHours=function(a){var c=b.open({templateUrl:"organizations/modals/record_hours_modal.html",controller:"RecordHoursCtrl",windowClass:"add-event-modal-window",size:a});c.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})}}]),angular.module("voluntrApp").controller("SideMenuCtrl",["$scope","$stateParams","$state","Opportunity","$modal","$rootScope",function(a){a.snapOpts={disable:"right"}}]),angular.module("voluntrApp").controller("HeaderCtrl",["$scope","$rootScope","searchService",function(a,b,c){a.search_filter=c.search}]),angular.module("voluntrApp").controller("VolunteerHomeCtrl",["$scope","geolocation","Opportunity","Organization","$http","$timeout","$modal","$rootScope","leafletData",function(a,b,c,d,e,f){a.center={autoDiscover:!0,zoom:14},b.getLocation().then(function(b){a.coords={lat:b.coords.latitude,"long":b.coords.longitude},a.markers={m1:{lat:a.coords.lat,lng:a.coords.long,focus:!0,message:"Your Current Location"}}}),a.getDistance=function(b){var c=new google.maps.LatLng(a.coords.lat,a.coords.long);!b.distance&&b.latitude&&b.longitude&&f(function(){function d(c,d){d==google.maps.DistanceMatrixStatus.OK?(console.log(c.rows[0].elements[0]),b.distance=c.rows[0].elements[0].distance.text,a.event=b):d!==google.maps.DistanceMatrixStatus.OK&&console.log(d)}var e=c,f=new google.maps.LatLng(b.latitude,b.longitude),g=new google.maps.DistanceMatrixService;g.getDistanceMatrix({origins:[e],destinations:[f],travelMode:google.maps.TravelMode.DRIVING,unitSystem:google.maps.UnitSystem.IMPERIAL},d)},700)};var g=function(b){console.log(b),b.latitude&&b.longitude&&(a.markers[b.name]={lat:b.latitude,lng:b.longitude,message:b.name})};a.$watch("markers",function(){a.markers&&(c.all().$promise.then(function(b){angular.forEach(b,g),a.opportunities=b}),console.log(a.markers))})}]),angular.module("voluntrApp").controller("OrganizationSearchCtrl",["$scope","$modal","$rootScope","$http","$stateParams","searchService","$window",function(a,b,c,d,e,f){a.query=f.search;var g=function(b){a.search_items||(a.search_items=[]);var c={};c.id=b.id,b.first_name?(c.name=b.first_name+" "+b.last_name,c.result_type="Volunteer",b.fb_id&&(c.fb_id=b.fb_id),a.search_items.push(c)):b.opportunity_type_id&&(c.result_type="Opportunity",c.name=b.name,c.description=b.description,a.search_items.push(c))};d.get("api/v1/organizations/"+e.organization_Id+"/people").success(function(a){angular.forEach(a,g)}).error(function(a){console.log(a)}),d.get("api/v1/organizations/"+e.organization_Id+"/opportunities").success(function(a){angular.forEach(a,g)}).error(function(a){console.log(a)})}]),angular.module("voluntrApp").controller("RecordHoursCtrl",["$scope","$modal","$rootScope","RecordedHours","$stateParams","$http","People","$modalInstance",function(a,b,c,d,e,f,g,h){var i=document.querySelector(".dashboard-module"),j=angular.element(i).scope();a.recordHours=function(){var b={};if(b.hours=a.recordHours.hours,b.organization_id=e.organization_Id,b.description=a.description,a.new_volunteer){var c={};c.first_name=a.first_name,c.last_name=a.last_name,c.description=a.description,c.email=a.email,c.organization_id=e.organization_Id,g.create(c).$promise.then(function(a){b.person_id=a.id;var c=d.create(b);j.organization.recorded_hours.push(c)}),h.close()}else{b.person_id=a.volunteer_id;var f=d.create(b);j.organization.recorded_hours.push(f),h.close()}},a.selectHoursPerson=function(b){a.first_name=b.first_name,a.last_name=b.last_name,a.email=b.email,a.volunteer_id=b.id},f.get("api/v1/organizations/"+e.organization_Id+"/people").success(function(b){a.organization_people=b}).error(function(a){console.log(a)}),a.clearPerson=function(){a.first_name="",a.last_name="",a.email="",a.volunteer_id=""},a.first_name="",a.last_name="",a.email="",a.$watchGroup(["first_name","last_name","email"],function(){a.results=""!==a.first_name||""!==a.last_name||""!==a.email?!0:!1,a.new_volunteer_validation=""===a.first_name||""===a.last_name||""===a.email?!0:!1})}]),angular.module("voluntrApp").controller("ModalCtrl",["$scope","$modal","$rootScope","$http","$stateParams","searchService","$window",function(){}]),angular.module("voluntrApp").directive("scroll",["$window",function(a){return function(b){angular.element(a).bind("scroll",function(){console.log("SCROLLL"),b.sticky=!0,b.$apply()})}}]),angular.module("voluntrApp").directive("personModal",["$modal",function(a){function b(b,c,d){c.bind("click",function(){console.log(d),console.log("HELLLOOOO WORLD!");var b=a.open({templateUrl:"organizations/people/person_detail_modal.html",controller:"PersonDetailCtrl",windowClass:"add-event-modal-window",size:d.size,resolve:{id:function(){return d.id}}});b.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})})}return{link:b}}]),angular.module("voluntrApp").directive("opportunityModal",["$modal",function(a){function b(b,c,d){c.bind("click",function(){var b=a.open({templateUrl:"organizations/opportunities/opportunity_detail_modal.html",controller:"OpportunityDetailCtrl",windowClass:"add-event-modal-window",size:d.size,resolve:{id:function(){return d.id},start_time:function(){return d.start_time?start_time:d.start_time?void 0:0}}});b.result.then(function(){},function(){console.log("Modal dismissed at: "+new Date)})})}return{link:b}}]);