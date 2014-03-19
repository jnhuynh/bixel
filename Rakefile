# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Bixel::Application.load_tasks

require "rake/testtask"
Rake::TestTask.new(:test => "db:test:prepare") do |t|
  t.libs << "test"
  t.pattern = "test/**/*_test.rb"
end

task :default => :test
