json.total_entries	@res[:total_entries]
json.current_page 	@res[:current_page]
json.to_index 		@res[:to_index]
json.from_index 	@res[:from_index]
json.tags @tags do |tag|
  json.extract! tag, :title, :description, :created_at, :updated_at
  json.id tag._id.to_s
end
