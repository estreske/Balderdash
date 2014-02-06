# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'open-uri'

Word.delete_all

words = []
("a".."z").to_a.each do |letter|

  url = "http://phrontistery.info/#{letter}.html"
  doc = Nokogiri::HTML(open(url))
  found_trs = doc.css(".words").css('tr')

  parsed_tr = found_trs.map do |tr|
    word, definition = tr.css('td')
    
    if word && definition
      words << {name: word.text.chomp, definition: definition.text.chomp}
    end
  end
end

words.shuffle!

(0..1000).each do |x|
  Word.create(name: words[x][:name], definition: words[x][:definition])
end

Word.where(name: "\n\nWord\n").destroy_all
Word.where(name: "\n\nWord\n\n").destroy_all
