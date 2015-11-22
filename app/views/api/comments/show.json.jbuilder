json.extract! @comment, :title, :user, :created_at, :updated_at
json.id @comment._id.to_s