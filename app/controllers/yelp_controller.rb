class YelpController < ApplicationController

	def index
	end

	def search
		yelp_key = Rails.application.credentials.yelp[:api_key]
		token = "Bearer " + yelp_key
		lat = params[:lat]
		lng = params[:lng]
		@response = HTTParty.get("https://api.yelp.com/v3/businesses/search?&latitude=#{lat}&longitude=#{lng}",
				headers: { "Content-Type": "application/json",
				"Authorization": token
			}).body
		render json: @response
	end



end
