Rails.application.routes.draw do

	root 'yelp#index'
	post '/search', to: 'yelp#search'
end
