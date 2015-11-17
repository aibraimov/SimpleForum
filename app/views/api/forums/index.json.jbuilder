json.total_entries	@res[:total_entries]
json.current_page 	@res[:current_page]
json.to_index 		@res[:to_index]
json.from_index 	@res[:from_index]
json.forums @forums do |forum|
  json.extract! forum, :title, :created_at, :updated_at
  json.id forum._id.to_s
end
