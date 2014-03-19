require "test_helper"

describe Api::V1::AreasController do
  before do
    @plains = Area.create(:name => "Plains", :width => 640,  :height => 512)
    @desert = Area.create(:name => "Desert", :width => 640,  :height => 512)

    @night_elf = Player.create(:name => "Night Elf", :direction => "down",
      :x => 0, :y => 0)

    @barbarian = Player.create(:name => "Barbarian", :direction => "down",
      :x => 0, :y => 0 )
  end

  describe "#index" do
    it "must respond with JSON containing all Areas" do
      get "index"

      response.status.must_equal 200
      json.length.must_equal 2
    end
  end

  describe "#update" do
    it "must add players when IDs are provided" do
      @plains.players.length.must_equal 0

      payload = {
        :id => @plains.id,
        :area => {
          :players => [@night_elf.id, @barbarian.id]
        }
      }
      post("update", payload)

      @plains.reload
      @plains.players.length.must_equal 2
    end

    it "must remove players when IDs are not provided" do
      @plains.players.length.must_equal 0

      payload = {
        :id => @plains.id,
        :area => {
          :players => []
        }
      }
      post("update", payload)

      @plains.reload
      @plains.players.length.must_equal 0
    end

    it "must remove the players when their IDs are not provided" do
      @plains.players.length.must_equal 0

      payload = {
        :id => @plains.id,
        :area => {
          :players => [@night_elf.id, @barbarian.id]
        }
      }
      post("update", payload)

      @plains.reload
      @plains.players.length.must_equal 2

      payload = {
        :id => @plains.id,
        :area => {
          :players => [@night_elf.id]
        }
      }
      post("update", payload)

      @plains.reload
      @night_elf.reload
      @plains.players.length.must_equal 1
      @plains.players[0].must_equal @night_elf
      @plains.players[1].must_be_nil
    end
  end
end
