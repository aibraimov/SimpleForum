module Mongoid
  module Document   

    def serializable_hash(options={})
      attrs = super
      attrs['id'] = attrs['_id'].to_s
      attrs
    end

  end
end