<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Watson demo</title>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
  <script>
	var earthquakeData = "https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=85e62ad889b1b15314bb96cf6387592215231fc5&outputMode=json&start=now-1d&end=now&maxResults=10&q.enriched.url.cleanedTitle=earthquake&q.enriched.url.cleanedTitle=chile&return=enriched.url.title,enriched.url.text,enriched.url.url";
  $.getJSON(earthquakeData);
    .done(function( data ) {
      print data;
    });
})();
</script>
</head>
<body>