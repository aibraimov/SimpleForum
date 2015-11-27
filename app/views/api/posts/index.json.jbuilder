json.total_entries	@res[:total_entries]
json.current_page 	@res[:current_page]
json.to_index 		@res[:to_index]
json.from_index 	@res[:from_index]
json.posts @posts do |post|
  json.extract! post, :title, :description, :created_at, :updated_at, :_id, :user_likes, :user_dislikes, :is_true
  json.id post.id.to_s
  json.forum_id post.forum_id.to_s
  json.forum do
	  json.extract! post.forum, :title, :created_at, :updated_at, :_id
	  json.id post.forum.id.to_s
  end
  json.user do
    json.email post.user.email
    json.id post.user.id.to_s
  end
  json.tags post.tags do |tag|
  	json.extract! tag, :title, :description, :_id
  	json.id tag.id.to_s
  end
end
