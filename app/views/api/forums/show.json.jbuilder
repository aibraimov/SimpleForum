json.extract! @forum, :title, :created_at, :updated_at, :_id
json.id @forum._id.to_s