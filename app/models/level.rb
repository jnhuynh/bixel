# == Schema Information
#
# Table name: levels
#
#  id         :integer          not null, primary key
#  width      :integer
#  height     :integer
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Level < ActiveRecord::Base
end
