# frozen_string_literal: true

class UsersController < ApplicationController
  include Rails.application.routes.url_helpers

  before_action :authenticate_user!, only: %i[index edit update destroy set_avatar remove_avatar]
  before_action :find_user, only: %i[show edit update destroy set_avatar remove_avatar]
  before_action :permit_only_current_user, only: %i[edit destroy set_avatar remove_avatar]

  def index
    @users = User.all
  end

  def show
    @publications = @user.publications.order(created_at: :desc)
    return unless user_signed_in? && @user.id == current_user.id

    @avatar_props = {
      user_id: @user.id,
      action: 'show'
    }
  end

  def edit
    @user_props = {
      user_id: @user.id,
      login: @user.login,
      name: @user.name,
      email: @user.email,
      web_page: @user.web_page,
      phone: @user.phone,
      gender: @user.gender,
      about_me: @user.about_me
    }
  end

  def update
    @user.update(user_params)
    return unless @user.errors.empty?

    flash[:success] = 'your profile settings have been updated'
    render json: {}
  end

  def destroy; end

  def set_avatar
    Rails.logger.debug params.inspect
    @user.avatar.attach(params[:avatar])

    render json: {
      avatar_url: rails_blob_path(
        @user.avatar,
        disposition: 'attachment',
        only_path: true
      )
    }
  end

  def remove_avatar
    @user.avatar.purge
    render json: {}
  end

  def search_by_login_or_name
    @users = User.__elasticsearch__.search(
      query: {
        multi_match: {
          query: params[:login],
          fields: %w[name login]
        }
      }
    ).records.to_a
    respond_to do |format|
      format.js
    end
  end

  private

  def find_user
    @user = User.find_by(id: params[:id])
    render_404 unless @user
  end

  def permit_only_current_user
    render_403 unless @user.id == current_user.id
  end

  def user_params
    params.require(:user).permit(:name,
                                 :login,
                                 :email,
                                 :web_page,
                                 :about_me,
                                 :phone,
                                 :gender)
  end

  def avatar_url(user)
    if user.avatar.attached?
      url_for(@user.avatar)
    else
      false
    end
  end

  def authenticity_token
    session[:_csrf_token] ||= SecureRandom.base64(32)
  end
end
