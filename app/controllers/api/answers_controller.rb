class Api::AnswersController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_answer, only: [:update, :destroy, :like_answer, :dislike_answer, :set_true]

  def index
    @answers = Post.find(params[:post_id]).answers
  end

  def create
    @answer = @user.answers.create(answer_params)
    @answer.save
    render "show"
  end

  def update
    @answer.update(answer_params)
    render "show"
  end

  def destroy
    st = false
    if @answer.user == @user
      st = @answer.destroy
    end
    respond_with :api, st
  end

  def like_answer
    st = false
    user_id = @user.id.to_s
    if @answer.user_dislikes.include? user_id
      @answer.user_dislikes.delete user_id
    end
    unless @answer.user_likes.include? user_id
      @answer.user_likes << user_id
      st = @answer.save
    end
    status = st ? "success" : "error"
    render json: {status: status}
  end

  def dislike_answer
    st = false
    user_id = @user.id.to_s
    if @answer.user_likes.include? user_id
      @answer.user_likes.delete user_id
    end
    unless @answer.user_dislikes.include? user_id
      @answer.user_dislikes << user_id
      st = @answer.save
    end
    status = st ? "success" : "error"
    render json: {status: status}
  end

  def set_true
    post = @answer.post
    post.is_true = true
    st &&= post.save

    post.answers.each do |answer|
      answer.is_true = false
      answer.save
    end

    @answer.is_true = true
    st = @answer.save
    status = st ? "success" : "error"
    render json: {status: status}
  end

  private

  def get_answer
    @answer = Answer.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def answer_params
    params.require(:answer).permit(:title, :user_id, :post_id)
  end

end


