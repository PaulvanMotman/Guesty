// select all events where {event-id}/admin == session.user.id
// to make sure you can search through your own events and find one that matches your ID

// fb.api en guesty.api : front-end haalt gegevens uit de guesty api. en de guesty.api haalt zijn info uit de FB.api 
// en stored dit in de guesty api
// de call naar de fb.api wordt gemaakt binnen in een call naar de guesty.api
// front-end wilt call maken naar guesty.api en vervolgens maakt de guesty.api een call naar de fb.api om 
// de gewenste objecten te renderen

// info we need from FB.api
	// 
	/{event-id}/attending status
{
  "data": [
    {
      "name": "Sven van Hoorn",
      "id": "790269277659279",
      "rsvp_status": "attending"
    },
    {
      "name": "Gijs van Til",
      "id": "895691990505721",
      "rsvp_status": "attending"
    }
  ],
  "paging": {
    "cursors": {
      "before": "TVRBd01EQXdNamcyTkRJM01EY3dPakUwTmpZAME5Ea3lNREE2TVRjMk9UQTRNVE0xTmpnM09UWXgZD",
      "after": "TVRBd01EQXhPVFEzT0RRNE5UWXlPakUwTmpZAME5Ea3lNREE2TVRZAMU1EZAzBPRGsyT0RRNE5UZA3gZD"
    }
  }
}


