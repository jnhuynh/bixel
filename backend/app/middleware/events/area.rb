module Events
  class Area
    class << self
      def player_enter
        puts "player_enter"
      end

      def player_exit
        puts "player_exit"
      end

      def player_move
        puts "player_move"
      end
    end
  end
end
