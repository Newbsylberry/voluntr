RSpec.describe PersonImporter, "PersonImporter" do
  context "importing_people" do
    before(:each) do
      @params = {"people" => [{"first name"=>"Brandon", "last name"=>"Fleming", "address"=>"1215 Gravida Rd.", "city"=>"Philadelphia", "state"=>"IL", "zip code"=>"19081"}, {"first name"=>"Merrill", "last name"=>"Abbott", "address"=>"Ap #453-1638 Sit Av.", "city"=>"Philadelphia", "state"=>"Missouri", "zip code"=>"19081"}, {"first name"=>"Nolan", "last name"=>"Franco", "address"=>"750-1556 Auctor Rd.", "city"=>"Philadelphia", "state"=>"Montana", "zip code"=>"19081"}, {"first name"=>"Alfonso", "last name"=>"Guzman", "address"=>"Ap #590-1735 Lorem Avenue", "city"=>"Philadelphia", "state"=>"DE", "zip code"=>"19081"}, {"first name"=>"Marvin", "last name"=>"Puckett", "address"=>"Ap #455-578 Mollis Rd.", "city"=>"Philadelphia", "state"=>"MA", "zip code"=>"19081"}, {"first name"=>"Keaton", "last name"=>"Terry", "address"=>"247-3268 Lobortis Road", "city"=>"Philadelphia", "state"=>"NV", "zip code"=>"19081"}, {"first name"=>"Kirk", "last name"=>"Hendricks", "address"=>"P.O. Box 869, 2270 Risus. Avenue", "city"=>"Philadelphia", "state"=>"Virginia", "zip code"=>"19081"}, {"first name"=>"Xenos", "last name"=>"Reid", "address"=>"P.O. Box 464, 8145 Est. Avenue", "city"=>"Philadelphia", "state"=>"Alaska", "zip code"=>"19081"}, {"first name"=>"Eagan", "last name"=>"Conley", "address"=>"Ap #558-8892 Orci Rd.", "city"=>"Philadelphia", "state"=>"Oregon", "zip code"=>"19081"}, {"first name"=>"Neil", "last name"=>"Guthrie", "address"=>"557-6378 Elit, Rd.", "city"=>"Philadelphia", "state"=>"MI", "zip code"=>"19081"}, {"first name"=>"Chancellor", "last name"=>"Mccoy", "address"=>"2042 Nulla. Avenue", "city"=>"Philadelphia", "state"=>"California", "zip code"=>"19081"}]}
    end

    it "#import_people" do
      # expect(PersonImporter(@params).to eq(1))
    end
  end
end