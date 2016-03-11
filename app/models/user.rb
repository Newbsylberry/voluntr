class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
  has_many :user_organizations
  has_many :organizations, through: :user_organizations
  has_one :profile
  has_many :user_event_hours

  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  def password_required?
    new_record? ? false : super
  end

  def password_entered?
    if encrypted_password.blank?
      false
    else
      true
    end
  end

  def facebook_user?
    if uid && provider === 'facebook'
      true
    else
      false
    end
  end

end
