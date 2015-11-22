class Api::AnswersController < ApiController
  respond_to :json
  before_filter :set_user
  before_filter :get_answer, only: [:update, :destroy]

  def index
    @answers = Post.find(params[:post_id]).answers
    @res = Paginator.pagination_attributes(@answers).merge!(:answers => @answers)
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


