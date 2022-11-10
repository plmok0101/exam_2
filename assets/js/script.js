api_key = "RGAPI-7a31f444-76c8-4619-92dd-29c885be5493";
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
function createDiv(){
    for (let i = 0; i < 10; i++){
        $(".game"+[i]).after("<div class=\"game"+[i+1]+"\"></div>");
        for(let j = 0; j <10; j++){
            $(".game"+[i+1]).append("<div class=\"pick"+[j+1]+"\"></div>"); 
        }
    }
}

$(document).ready(function(){

    $("#btn").click(function(){
        createDiv();
    })
    
    let nickname;
    let game = [];
    let puuid;

    $("#form").submit(function(event){
        event.preventDefault();
        nickname = $("#nickname").val();

        $.getJSON("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + api_key, function(data){
            puuid = (data.puuid);
        })

        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=10&api_key=" + api_key, function(data){
            game = (data);
        })

        for(let i = 0; i < 10; i++){
            $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/" + game[i] + "?api_key=" + api_key,function(data){
                for(let j = 0; j <10; j++){
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].championName)+"</span>");//챔피언
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].summonerName)+"</span>");//닉
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].kills)+"</span>");//킬
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].deaths)+"</span>");//데스
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].assists)+"</span>");//어시
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].totalMinionsKilled)+"</span>");//수정필요
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].totalDamageDealtToChampions)+"</span>");//딜량
                    $(".game" + [i+1] + " > .pick"+[j+1]).append("<span>  "+(data.info.participants[j].goldEarned)+"</span>");//획득골드
                }
            })
        }


    })
})


