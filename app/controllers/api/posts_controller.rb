class Api::PostsController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_post, only: [:update, :destroy]

  def index
    page = params[:page].present? ? params[:page] : 1
    @posts = Post.all.paginate(:page => page, :per_page => 5)
    @res = Paginator.pagination_attributes(@posts).merge!(:posts => @posts)
  end

  def create
    @post = @user.posts.create(post_params)
    render "show"
  end

  def update
    respond_with :api, @post.update(post_params)
    render "show"
  end

  def destroy
    st = false
    if @post.user == @user
      st = @post.destroy
    end
    respond_with :api, st
  end

  private

    def get_post
      @post = Post.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def post_params
      params.require(:post).permit(:title, :description, :forum_id)
    end
end
