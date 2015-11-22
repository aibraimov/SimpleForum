class Api::CommentsController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_comment, only: [:update, :destroy]

  def index
    @comments = Answer.find(params[:answer_id]).comments
    @res = Paginator.pagination_attributes(@comments).merge!(:comments => @comments)
  end

  def create
    @comment = @user.comments.create(comment_params)
    @comment.save
    render "show"
  end

  def update
    @comment.update(comment_params)
    render "show"
  end

  def destroy
    st = false
    if @comment.user == @user
      st = @comment.destroy
    end
    respond_with :api, st
  end

  private

  def get_comment
    @comment = Comment.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def comment_params
    params.require(:comment).permit(:title, :user_id, :answer_id)
  end

end


