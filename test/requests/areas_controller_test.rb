require "test_helper"

describe "Api::V1::AreasController" do
  it "must fail" do
    get("/")
    3.must_equal 4
  end
end
