json.extract! @post, :title, :description, :created_at, :updated_at, :_id, :user_likes, :user_dislikes, :is_true
json.id @post.id.to_s
json.forum_id @post.forum_id.to_s
json.forum do
	json.extract! @post.forum, :title, :created_at, :updated_at, :_id
	json.id @post.forum.id.to_s
end
json.user do
	json.email @post.user.email
	json.id @post.user.id.to_s
    json.avatar @post.user.avatar.url(:small)
end
json.tags @post.tags do |tag|
	json.extract! tag, :title, :description, :_id
	json.id tag.id.to_s
end
