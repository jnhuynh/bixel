# == Schema Information
#
# Table name: areas
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  width      :integer
#  height     :integer
#  created_at :datetime
#  updated_at :datetime
#

class Area < ActiveRecord::Base
  has_many(:players)
end
