function Donation(name, createdAt, location, amount) {
  this.name = name;
  this.createdAt = createdAt;
  this.location = location;
  this.amount = amount;

  this.print = function() {
    $('#donations').append('<h2>'+this.name+'</h2> \
      <div class="row"> \
        <div class="col-md-5"> \
          <i class="fa fa-clock-o"></i> '+this.createdAt+' 4hrs ago</div> \
        <div class="col-md-5 money"> \
        <i class="fa fa-usd"></i> \
        <span>$'+this.amount+' raised from '+this.location.latitude+','+this.location.longitude+'</span> \
      </div> \
    </div>');
  }
}

function printData(donation) {
  $.each(donation, function(index, donation) {
    donation.print();
  });
}

function Donations() {
  this.donation = [];
  
  this.getData = function() {
    Parse.initialize("ahKpQvGXaUQHQ1iCyNGyccBU1hz6UsYIWu1HQcwg", "g15tPzTig1ocoqTPFAiuZvTtYb5iq8QlgOURaZkl");
    var donationsParse = Parse.Object.extend("donations");
    var donationsData = new Parse.Query(donationsParse);
    donationsData.limit(10);

    (function(donation){
      donationsData.find({
       success: function(donationCollection) {

        $.each(donationCollection, function(index, donationData) {    
          var quakes = Parse.Object.extend("quakes");
          var quakesData = new Parse.Query(quakes);
          (function(donation){
            console.log(donationData.get('quake'));
            quakesData.get(donationData.get('quake'), {       
              success: function(object) {
                donationElement = new Donation(object.get('place'), donationData.createdAt, donationData.get('location'), donationData.get('amount'));
                donation.push(donationElement); 

                if (donation.length == 2) {
                printData(donation);
              }
              
                
              },
              error: function(object, error) {
              }

            }); 

          })(donation);         
       });
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  })(this.donation);
}
}
      
var donations = new Donations();
donations.getData();
console.log("FINAL END");
console.log(donations.donation);

$.each(donations.donation, function(index, donation) {
});