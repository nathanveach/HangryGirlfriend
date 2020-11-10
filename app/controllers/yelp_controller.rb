class YelpController < ApplicationController

	def index
	end

	def search
		yelp_key = Rails.application.credentials.yelp[:api_key]
		token = "Bearer " + yelp_key
		lat = params[:lat]
		lng = params[:lng]
		time = Time.now.to_i + (30 * 60)
		@response = HTTParty.get("https://api.yelp.com/v3/businesses/search?&term=restaurant&latitude=#{lat}&longitude=#{lng}&open_at=#{time}&limit=50",
				headers: { "Content-Type": "application/json",
				"Authorization": token
			}).body
		render json: @response
	end

end
