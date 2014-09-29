var request = require('request');

var urls = ['http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-06-15-heat-spurs.json', 'http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-04-09-thunder-clippers.json'];

urls.forEach(function(url){
		request(url, function (error, response, body) {
		var players = JSON.parse(body);
		basketball(players);
	});
});

function basketball(players){

	var first = players[0].team;

	var team1 = players.filter(function(person){
		return person.team === first
	});

	var team1Name = team1[0].team;

	var team2 = players.filter(function(person){
		return person.team !== first
	});

	var team2Name = team2[0].team;

	console.log("\n" + team1Name + " vs. " + team2Name + "\n");

	function calculateScore(team){
		var score = 0;
		team.forEach(function(player){
			score = score + (player.threesMade * 3) + ((player.fieldGoalsMade - player.threesMade) * 2) + (player.freeThrowsMade); 
		});
		return score;
	}

	function percentFromThrees() {
		var highestPercentage = 0;
		var highestPlayer = "";

		players.forEach(function(player){
			var totalPoints = (player.threesMade * 3) + ((player.fieldGoalsMade - player.threesMade) * 2) + (player.freeThrowsMade);
			var threePercent = (Math.floor(((player.threesMade * 3)/totalPoints) * 100));

			if (totalPoints > 10 && threePercent > highestPercentage){
				highestPercentage = threePercent;
				highestPlayer = player.name;
			}
		});
		return highestPlayer;
	}

	function mostRebounds(team1, team2){

		var team1Rebounds = 0;

		var team2Rebounds = 0;

		for(var i = 0; i < team1.length; i++){
			team1Rebounds = team1Rebounds + team1[i].defensiveRebounds + team1[i].offensiveRebounds;
		}

		for(var i = 0; i < team1.length; i++){
			team2Rebounds = team2Rebounds + team2[i].defensiveRebounds + team2[i].offensiveRebounds;
		}

		if(team1Rebounds > team2Rebounds){
			return team1Name + " with " + team1Rebounds;
		}else{
			return team2Name + " with " + team2Rebounds;
		}
	}

	function mostAssists(){
		var nonGuard = players.filter(function(person){
			return person.position !== "G";
		});

		var highestAssists = 0;
		var highestPlayer = "";

		nonGuard.map(function(person) {
			var player = person.name;
			var assists = person.assists;

			if(assists > highestAssists){
				highestAssists = assists;
				highestPlayer = player;
			}

		});
		return highestPlayer + " with " + highestAssists;
	}

	console.log("Final Score: " + team1Name + ": " + calculateScore(team1) + ", " + team2Name + ": " + calculateScore(team2) + "\n =====");
	console.log("* Player with highest percentage of points from three pointers: " + percentFromThrees(players));
	console.log("* Team with most rebounds: " + mostRebounds(team1, team2));
	console.log("* Non guard player with most assists: " + mostAssists());
	console.log("* Players with more turnovers than assists: ");
	var moreTurnovers = players.filter(function(person){
		if(person.turnovers > person.assists){
			console.log("\t" + person.name);
		}
	});

}
