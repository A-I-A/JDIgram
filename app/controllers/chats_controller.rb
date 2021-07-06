class ChatsController < ApplicationController

  def index
    @chats = []
    @chats.concat(current_user.inbox_chats).to_a
    @chats.concat(current_user.outbox_chats).to_a
  end

  def show
    @chat = Chat.find_by(id: params[:id])
  end

end