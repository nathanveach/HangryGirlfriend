class HomepageController < ApplicationController

	def yelp
		yelp_key = Rails.application.credentials.yelp[:api_key]
		token = "Bearer " + yelp_key
		@response = HTTParty.get("https://api.yelp.com/v3/businesses/search?&location=nyc",
				headers: { "Content-Type": "application/json",
				"Authorization": token
			}).body

		render json: @response

	end





end
