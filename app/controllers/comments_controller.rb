class CommentsController < ApplicationController

  def new
    @comment =Comment.new
  end

  def create 
    # @comment =Comment.new
    @article = Article.find(params[:article_id])
    # debugger
    # @user = current_user
    # @comment.user_id = params[:user_id]
    # @comment = Comment.new( :user_id => @article.user.id, :article_id => @article.id )
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.article = Article.find(params[:article_id])
    # debugger
    # @comment = @article.comments.new(params[:comment].permit(:comment, :user_id))
    # debugger
    if @comment.save
      flash[:success] = "You have created a new comment"
      redirect_to article_path(@article)
    end
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to article_path(@article)
  end

  private

  def comment_params
    params.require(:comment).permit(:comment)
  end
end
