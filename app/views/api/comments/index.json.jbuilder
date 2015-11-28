json.answers @comments do |comment|
  json.extract! comment, :title, :created_at, :updated_at, :_id
  json.id comment._id.to_s
  json.user do
    json.email comment.user.email
    json.id comment.user.id.to_s
    json.avatar comment.user.avatar
  end
end
