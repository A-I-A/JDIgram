class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
   users_path
  end

  protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys:[:login, :name])
  end
  
  private
  
  def render_404
    render file: "#{Rails.root}/public/404.html", status: 404
  end
end
