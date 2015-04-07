class AddDayToDailyStatistics < ActiveRecord::Migration
  def change
    add_column :daily_statistics, :date, :datetime
  end
end
