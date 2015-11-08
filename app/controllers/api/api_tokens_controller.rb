class Api::ApiTokensController < ApiController
  respond_to :json
  skip_before_filter :restrict_access, :only => [:create]

  def create
    authenticated_user = User.where(email: login_params[:email])[0].authenticate(login_params[:password])
    respond_to do |format|
      format.json {
        if authenticated_user
          @api_token = ApiToken.create(user: authenticated_user)
          render :json => {
            :user_id => authenticated_user.id.to_s, :email => authenticated_user.email, :api_token => @api_token.api_token
          }
        else
          head :unauthorized
        end
      }
    end
  end

  def destroy
    authenticated_user = ApiToken.where(:api_token => @token).first.try(:user)
    if (authenticated_user)
      authenticated_user.api_tokens.destroy_all
    end
    render :json => {:success => true}
  end

  private

  def login_params
    params.require(:login).permit(:email, :password)
  end
end
