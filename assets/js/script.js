api_key = "RGAPI-36ee680b-3a79-4409-b916-8aea231793bd";
 //닉네임으로 유저정보 얻기
function getPuuid(){
    $.getJSON("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + api_key, function(data){
        puuid = (data.puuid);
    })
}
//최근10판 게임 ID얻기
function getTotalID(){
    $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=10&api_key=" + api_key, function(data){
        game = (data);
        alert(game);
    })
}

$(document).ready(function(){
    
    let nickname;
    let game = [];

    $("#form").submit(function(event){
        event.preventDefault();
        nickname = $("#nickname").val();
        
        $.getJSON("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + api_key, function(data){
            puuid = (data.puuid);
        })

        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=10&api_key=" + api_key, function(data){
            game = (data);
            alert(game[0]);
        })

        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/" + game[0] + "?api_key=" + api_key,function(data){
            $('body').append("<p>어시="+(data.info.participants[0].assists)+"</p>");
            $('body').append("<p>킬="+(data.info.participants[0].kills)+"</p>");
            $('body').append("<p>챔피언="+(data.info.participants[0].championName)+"</p>");
            $('body').append("<p>데스="+(data.info.participants[0].deaths)+"</p>");
            $('body').append("<p>획득한골드="+(data.info.participants[0].goldEarned)+"</p>");
            $('body').append("<p>승패="+(data.info.participants[0].win)+"</p>");
            $('body').append("<p>cs="+(data.info.participants[0].totalMinionsKilled)+"</p>");
            $('body').append("<p>유저닉="+(data.info.participants[0].summonerName)+"</p>");
            $('body').append("<p>딜량="+(data.info.participants[0].totalDamageDealtToChampions)+"</p>");
            
            //반복해서 10명데이터 모두 추출
            

        })

    })
})


