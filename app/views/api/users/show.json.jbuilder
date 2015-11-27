json.extract! @user, :email, :created_at, :updated_at, :_id, :rating
json.user_posts_num @user.posts.size
json.id @user.id.to_s
user_tags = []
json.posts @user.posts.limit(5) do |post|
	json.extract! post, :created_at, :updated_at, :_id, :user_likes, :user_dislikes, :is_true
	json.title post.title[0..150]
	json.id post.id.to_s
end
json.answers @user.answers.limit(5) do |answer|
	json.extract! answer, :created_at, :updated_at, :_id, :user_likes, :user_dislikes, :is_true
	json.title answer.title[0..150]
	json.id answer.id.to_s
	json.post_id answer.post_id.to_s
end

@user.posts.each do |post|
	post.tags.each do |tag|
		user_tags << tag
	end
end
user_tags.uniq!
json.tags user_tags do |tag|
	json.extract! tag, :title, :description, :_id
	json.id tag.id.to_s
end

