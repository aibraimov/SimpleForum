class Api::PostsController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_post, only: [:update, :destroy, :show, :like_post, :dislike_post]

  def index
    page = params[:page].present? ? params[:page] : 1
    if !params[:forum_id].blank?
      @posts = Post.where(forum_id: params[:forum_id]).paginate(:page => page, :per_page => 20)
    elsif !params[:tag_id].blank?
      @posts = Tag.find(params[:tag_id]).posts.paginate(:page => page, :per_page => 20)
    else
      @posts = Post.all.paginate(:page => page, :per_page => 20)
    end
    @res = Paginator.pagination_attributes(@posts).merge!(:posts => @posts)
  end

  def show
  end

  def create
    @post = @user.posts.create(post_params)
    @post.save
    @user.rating += 1
    @user.save
    render "show"
  end

  def update
    if params[:post][:tag_ids].blank?
      params[:post][:tag_ids] = nil
    end
    @post.update(post_params)
    render "show"
  end

  def destroy
    st = false
    if @post.user == @user
      st = @post.destroy
    end
    status = st ? "success" : "error"
    render json: {status: status}
  end

  def like_post
    st = false
    post_user = @post.user
    post_user.rating += 1
    post_user.save
    user_id = @user.id.to_s
    if @post.user_dislikes.include? user_id
      @post.user_dislikes.delete user_id
    end
    unless @post.user_likes.include? user_id
      @post.user_likes << user_id
      st = @post.save
    end
    status = st ? "success" : "error"
    render json: {status: status}
  end

  def dislike_post
    st = false
    user_id = @user.id.to_s
    if @post.user_likes.include? user_id
      @post.user_likes.delete user_id
    end
    unless @post.user_dislikes.include? user_id
      @post.user_dislikes << user_id
      st = @post.save
    end
    status = st ? "success" : "error"
    render json: {status: status}
  end

  private

  def get_post
    @post = Post.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def post_params
    params.require(:post).permit(:title, :description, :forum_id, :tag_ids => [])
  end

end


