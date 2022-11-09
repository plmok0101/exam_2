api_key = "RGAPI-36ee680b-3a79-4409-b916-8aea231793bd";

function getPuuid(){
    $.getJSON("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + api_key, function(data){
        $('body').append("<p>id="+(data.id)+"</p>");
        $('body').append("<p>puuid="+(data.puuid)+"</p>");
        puuid = (data.puuid);
    })
}
function getTotalID(){
    $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=10&api_key=" + api_key, function(data){
        
        game1 = (data[0]);
        game2 = (data[1]);
        game3 = (data[2]);
        game4 = (data[3]);
        game5 = (data[4]);
        game6 = (data[5]);
        game7 = (data[6]);
        game8 = (data[7]);
        game9 = (data[8]);
        game10 = (data[9]);
        //each문으로 배열로 받을예정
       game1 = (data[0]);
        $('body').append("<p>id="+(data[0])+"</p>");
    })
}

$(document).ready(function(){
    
    let nickname;


    $("#form").submit(function(event){
        event.preventDefault();
        nickname = $("#nickname").val();
        /*
        //닉네임으로 유저정보 얻기
        $.getJSON("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + api_key, function(data){
            $('body').append("<p>id="+(data.id)+"</p>");
            $('body').append("<p>puuid="+(data.puuid)+"</p>");
            puuid = (data.puuid);
        })
        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=10&api_key=" + api_key, function(data){
           
            game1 = (data[0]);
            game2 = (data[1]);
            game3 = (data[2]);
            game4 = (data[3]);
            game5 = (data[4]);
            game6 = (data[5]);
            game7 = (data[6]);
            game8 = (data[7]);
            game9 = (data[8]);
            game10 = (data[9]);
            
           game1 = (data[0]);
            $('body').append("<p>id="+(data[0])+"</p>");
        })
*/
        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/" + "KR_6192872633" + "?api_key=" + api_key,function(data){
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


