json.extract! @answer, :title, :created_at, :updated_at, :_id, :user_likes, :user_dislikes, :is_true
json.user do
	json.email @answer.user.email
	json.id @answer.user.id.to_s
end
json.comments @answer.comments do |comment|
	json.extract! comment, :title, :created_at, :updated_at, :_id
	json.id comment._id.to_s
    json.user do
      json.email comment.user.email
      json.id comment.user.id.to_s
    end
end
json.id @answer._id.to_s