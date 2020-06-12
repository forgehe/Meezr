class User < ApplicationRecord
  has_many :meals
  has_many :favorites

  validates :user_name, presence: true
  validates :email, presence: true
  
  has_secure_password

end
