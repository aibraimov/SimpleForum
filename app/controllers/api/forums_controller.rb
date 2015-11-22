class Api::ForumsController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_forum, only: [:update, :destroy]

  def get_forums
    respond_with :api, Forum.all
  end

  def index
    page = params[:page].present? ? params[:page] : 1
    @forums = Forum.all.paginate(:page => page, :per_page => 1000)
    @res = Paginator.pagination_attributes(@forums).merge!(:forums => @forums)
  end

  def create
    @forum = Forum.create(forum_params)
    render "show"
  end

  def update
    @forum.update(forum_params)
    render "show"
  end

  def destroy
    respond_with :api, @forum.destroy
  end

  private

  def get_forum
    @forum = Forum.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def forum_params
    params.require(:forum).permit(:title)
  end
end
