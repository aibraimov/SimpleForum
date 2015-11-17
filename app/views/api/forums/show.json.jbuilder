json.extract! @forum, :title, :created_at, :updated_at
json.id @forum._id.to_s