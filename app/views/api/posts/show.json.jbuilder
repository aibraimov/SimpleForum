json.extract! @post, :title, :description, :forum, :created_at, :updated_at
json.tags @post.tags do |tag|
	json.extract! tag, :id, :title, :description
end
json.id @post._id.to_s