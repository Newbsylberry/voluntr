module SlackNotificationTool
  require 'slack-notifier'

  def self.send_message(channel, message)
    notifier = Slack::Notifier.new "https://hooks.slack.com/services/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", channel: "#{channel}", username: 'Site Activity Steve'
    notifier.ping "#{message}"
  end

end