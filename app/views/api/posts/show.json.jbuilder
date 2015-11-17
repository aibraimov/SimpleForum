json.extract! @post, :title, :description, :forum, :created_at, :updated_at
json.id @post._id.to_s