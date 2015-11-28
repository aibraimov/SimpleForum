source 'https://rubygems.org'

ruby "2.2.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails'
gem 'bcrypt'
gem 'thin'
# Use sqlite3 as the database for Active Record
#gem 'pg'
gem 'mongoid', '5.0.1'
gem "mongoid-paperclip", :require => "mongoid_paperclip"
gem 'aws-sdk', '~> 1.3.4'
gem 'devise'
gem 'themes_on_rails'
gem 'liquid-rails'
#gem 'bson_ext'
gem 'kaminari'
gem 'will_paginate_mongoid'
gem 'font-awesome-rails'
gem 'ckeditor_rails'

# Use SCSS for stylesheets
gem 'sass-rails'
gem 'haml'
gem 'haml-rails'

# CSS libraries
gem 'twitter-bootstrap-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'

# JavaScript libraries
gem 'jquery-rails'

gem 'angularjs-rails'
gem 'angular-ui-bootstrap-rails'
gem 'angular-rails-templates'
gem 'jbuilder'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development, :test do
  gem 'binding_of_caller'
  gem 'better_errors'
  gem 'annotate'
  gem 'heroku_san'
#  gem 'debase'
end

group :test do
	gem 'database_cleaner'
	gem 'rspec-rails'
	gem 'factory_girl_rails'
end

# For Heroku
group :production do
  gem 'unicorn'
  gem 'rails_12factor'
end
