class ChangePassAuth < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.rename :user_password, :password_digest
    end
  end
end
