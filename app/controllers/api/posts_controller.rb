class Api::PostsController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_post, only: [:update, :destroy]

  def index
    page = params[:page].present? ? params[:page] : 1
    if !params[:forum_id].blank?
      where = "forum_id = #{params[:forum_id]}"
    end
    if !params[:tag_id].blank?
      where = "tag_id = #{params[:tag_id]}"
    end
    if !params[:forum_id].blank?
      @posts = Post.where(forum_id: params[:forum_id]).paginate(:page => page, :per_page => 20)
    elsif !params[:tag_id].blank?
      @posts = Tag.find(params[:tag_id]).posts.paginate(:page => page, :per_page => 20)
    else
      @posts = Post.all.paginate(:page => page, :per_page => 20)
    end
    @res = Paginator.pagination_attributes(@posts).merge!(:posts => @posts)
  end

  def create
    @post = @user.posts.create(post_params)
    @post.save
    render "show"
  end

  def update
    @post.update(post_params)
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
    params.require(:post).permit(:title, :description, :forum_id, :tag_ids => [])
  end

end


