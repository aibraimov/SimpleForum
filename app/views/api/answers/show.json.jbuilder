json.extract! @answer, :title, :user, :created_at, :updated_at
json.tags @answer.comments do |comment|
	json.extract! comment, :id, :title, :user, :created_at, :updated_at
end
json.id @answer._id.to_s