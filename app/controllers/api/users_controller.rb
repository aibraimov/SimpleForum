class Api::UsersController < ApiController
  respond_to :json
  skip_before_filter :restrict_access, :only => [:create]

  def create
    respond_to do |format|
      format.json {
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created, location: nil
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      }
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: {avatar: @user.avatar}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :avatar)
  end
end
