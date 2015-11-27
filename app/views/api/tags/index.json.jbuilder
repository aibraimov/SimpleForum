json.array! @tags do |tag|
  json.extract! tag, :title, :description, :created_at, :updated_at, :_id
  json.id tag._id.to_s
end