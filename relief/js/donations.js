function Donation(name, createdAt, location, amount) {
  this.name = name;
  this.createdAt = createdAt;
  this.location = location;
  this.amount = amount;
}

function print(dictionaryTitle, dictionaryDate, dictionaryAmount) {

    var index = 0;
    for (var title in dictionaryAmount) {
        console.log("1"+dictionaryTitle);
        amount = dictionaryAmount[title];
        createdAt = dictionaryDate[title];


    $('#donations').append(' \
    <li class="disaster-item" > \
        <a href="#"> \
          <div class="row"> \
            <span class="chev-holder"> \
              <i class="fa fa-chevron-right"></i> \
            </span> \
            <div class="col-md-1 "> \
              <span class="number-order">'+index+'</span> \
            </div> \
            <div class=" col-md-3 text-center img-holder"> \
              <img class="disaster-img" src="img/earthquake.png" alt=""> \
            </div> \
            <div class="col-md-8" style="padding-left:0;"> \
              <h2>'+title+'</h2> \
                <div class="row second-row text-center"> \
                  <div class="col-md-5"> \
                    <i class="fa fa-clock-o"></i> '+createdAt+' \
                  </div> \
                  <div class="col-md-5 money"> \
                    <i class="fa fa-usd"></i> \
                      <span>'+amount+' raised</span> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </a> \
      </li> \
        ');

        index += 1;
    }
}


function printData(donation) {
  dictionaryAmt = [];
  dictionaryTitle = [];
  dictionaryDate = [];

  console.log(donation);

  $.each(donation, function(index, donation) {
    //donation.print(index+1);
    if (donation.name in dictionaryAmt)
      dictionaryAmt[donation.name] = dictionaryAmt[donation.name] + donation.amount;
    else
      dictionaryAmt[donation.name] = donation.amount;
    dictionaryDate[donation.name] = donation.createdAt;

    dictionaryTitle[donation.name] = donation.name;   

  });

  print(dictionaryTitle, dictionaryDate, dictionaryAmt);
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " mins";
    }
    return Math.floor(seconds) + " seconds";
}

function Donations() {
  this.donation = [];

  this.getData = function() {
    Parse.initialize("ahKpQvGXaUQHQ1iCyNGyccBU1hz6UsYIWu1HQcwg", "g15tPzTig1ocoqTPFAiuZvTtYb5iq8QlgOURaZkl");
    var donationsParse = Parse.Object.extend("donations");
    var donationsData = new Parse.Query(donationsParse);
    donationsData.limit(100);

    (function(donation){
      donationsData.find({
       success: function(donationCollection) {

        $.each(donationCollection, function(index, donationData) {
          var quakes = Parse.Object.extend("disasters");
          var quakesData = new Parse.Query(quakes);
          (function(donation){
            console.log(donationData.get('quake'));
            quakesData.get(donationData.get('quake'), {
              success: function(object) {
                donationElement = new Donation(object.get('Name'), timeSince(donationData.createdAt), donationData.get('location'), donationData.get('amount'));

                donation.push(donationElement); 
                console.log("Lenght"+donation.length);

                if (donation.length == 16) {
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
