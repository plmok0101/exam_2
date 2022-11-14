api_key = "RGAPI-8cfe852b-2069-4a73-aa16-cc560c70fdfc";
 //닉네임으로 유저정보 얻기

function getPuuid(){
    $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
        puuid = (data.puuid);
    })
}
//최근10판 게임 ID얻기
function getTotalID(){
    $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${api_key}`, function(data){
        game = (data);
    })    
}

//게임정보 가져오기
function getGame(){
    for(let i = 0; i < 10; i++){
        $.getJSON("https://asia.api.riotgames.com/lol/match/v5/matches/" + game[i] + "?api_key=" + api_key,function(data){
            for(let j = 0; j <10; j++){
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].championName));//챔피언
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].summonerName));//닉
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].kills));//킬
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].deaths));//데스
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].assists));//어시
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].totalMinionsKilled));//수정필요
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].totalDamageDealtToChampions));//딜량
                $(".game" + [i+1] + " > .pick"+[j+1]+ " > .span" + n).text((data.info.participants[j].goldEarned));//획득골드
            }
        })
    }
}
//div생성
function createDiv(){
    for (let i = 0; i < 10; i++){
        $(".game"+[i]).after("<div class=\"game"+[i+1]+"\"></div>");
        for(let j = 0; j <10; j++){
            $(".game"+[i+1]).append("<div class=\"pick"+[j+1]+"\"></div>");  
        }
    }
    for(let i = 0; i<10; i++){
        for(let n = 0; n <8; n++){
            $(".pick"+[i+1]).append("<span class=\"span"+[n+1]+"\"></span>");
        }
    }
}


$(document).ready(function(){
    let nickname;
    let game = [];
    let puuid;
    let html = document.querySelector("#template").innerHTML
    var result;
    $("#form").submit(function(event){
        event.preventDefault();
        nickname = $("#nickname").val();

        $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
            puuid = (data.puuid);
            console.log(puuid);
            $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`, function(data){
                game = (data);
                console.log(data[0]);
                for(let i = 0; i < 5; i++){
                    $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/${game[i]}?api_key=${api_key}`,function(data){
                        for(let j = 0; j < 10; j++){
                            result += html.replace(`{champion${j+1}}`,data.info.participants[j].championName)
                                      html.replace(`{userName${j+1}}`,data.info.participants[j].summonerName)
                                      html.replace(`{k${j+1}}`,data.info.participants[j].kills+"/")
                                      html.replace(`{d${j+1}}`,data.info.participants[j].deaths+"/")
                                      html.replace(`{a${j+1}}`,data.info.participants[j].assists)
                                      html.replace(`{cs${j+1}}`,data.info.participants[j].totalMinionsKilled)
                                      html.replace(`{damage${j+1}}`,data.info.participants[j].totalDamageDealtToChampions)
                                      html.replace(`{gold${j+1}}`,data.info.participants[j].goldEarned)
                                      html.replace(`{gamemode}`,data.info.gameMode)
                                      html.replace(`{time}`,data.info.gameDuration+"s");
                        }
                        document.querySelector(".con").innerHTML += result;
                    })
                }
            })
        })
    })

})


