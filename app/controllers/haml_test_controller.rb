class HamlTestController < ApplicationController

	def index
		@item = Hash.new
		@item[:id] = 1
		@item[:body] = "Hello World!"
		@print_information = "you peopls!"
	end

	def index2
		@print_information = "you peopls!"
	end

end
