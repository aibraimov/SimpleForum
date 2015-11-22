json.total_entries	@res[:total_entries]
json.current_page 	@res[:current_page]
json.to_index 		@res[:to_index]
json.from_index 	@res[:from_index]
json.posts @posts do |post|
  json.extract! post, :title, :description, :forum, :created_at, :updated_at
  json.id post._id.to_s
  json.tags post.tags do |tag|
  	json.extract! tag, :id, :title, :description
  end
end
