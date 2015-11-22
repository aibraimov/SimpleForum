class Api::TagsController < ApiController
  respond_to :json
  before_filter :get_tag, only: [:update, :destroy]

  def index
    page = params[:page].present? ? params[:page] : 1
    @tags = Tag.all.paginate(:page => page, :per_page => 20)
    @res = Paginator.pagination_attributes(@tags).merge!(:tags => @tags)
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.save
    render "show"
  end

  def update
    @tag.update(tag_params)
    render "show"
  end

  def destroy
    st = false
    st = @tag.destroy
    respond_with :api, st
  end

  private

  def get_tag
    @tag = Tag.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def tag_params
    params.require(:tag).permit(:title, :description)
  end
end
