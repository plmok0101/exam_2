let api_key = "RGAPI-98228dfe-5b5d-4430-9b56-073792183cf2";
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

function abc3(){
    for (let j = 0; j<10; j++){
        html.replace(`{champion${j+1}}`,data.info.participants[j].championName)
            .replace(`{userName${j+1}}`,data.info.participants[j].summonerName)
            .replace(`{k${j+1}}`,data.info.participants[j].kills+"/")
            .replace(`{d${j+1}}`,data.info.participants[j].deaths+"/")
            .replace(`{a${j+1}}`,data.info.participants[j].assists)
            .replace(`{cs${j+1}}`,data.info.participants[j].totalMinionsKilled)
            .replace(`{damage${j+1}}`,data.info.participants[j].totalDamageDealtToChampions)
            .replace(`{gold${j+1}}`,data.info.participants[j].goldEarned)
            .replace(`{gamemode}`,data.info.gameMode)
            .replace(`{time}`,data.info.gameDuration+"s");
    };
};

function test1234(){
    $("#form").submit();
}


$(document).ready(function(){
    let nickname;
    let game = [];
    let puuid;
    let html = document.querySelector("#template").innerHTML;
    let html2 = document.querySelector("#template2").innerHTML;
    let a = 0;
    let resultblue;
    let resultred;
    let min;
    let abc;
    let sec;
    let wlBlue;
    let wlRed;
    let date;
    let spel1
    let spel2
    let nowDate;
    $("#plusBtn").click(function(){
        a +=5;
        $("#form").submit();
    })
    
    $("#form").submit(function(event){
        event.preventDefault();
        $(".loading").css("display", 'inline-block');
        setTimeout(function(){
        nickname = $("#nickname").val();
        $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
            puuid = (data.puuid);
            $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`, function(data){
                game = (data);
                for(let i = 0+a ; i < 5+a ; i++){
                    $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/${game[i]}?api_key=${api_key}`,function(data){
                        resultblue ="";
                        resultred = "";
                        abc = (data.info.queueId);
                        min = parseInt((data.info.gameDuration)/60);
                        sec = parseInt((data.info.gameDuration)%60);
                        wlBlue = (data.info.participants[0].win);
                        wlRed = (data.info.participants[5].win); 
                        switch(abc){
                            case 420 :
                                abc = "솔로랭크";
                                break;
                            case 430 :
                                abc = "일반";
                                break;
                            case 440 :
                                abc = "자유랭크";
                                break;
                            case 450 :
                                abc = "킬바람";
                                break;
                            case 700 :
                                abc = "격전";
                                break;
                            case 900 :
                                abc = "URF";
                            case 1020 :
                                abc = "단일모드";
                        };
                        switch(wlBlue){
                            case true :
                                wlBlue = "승리";
                                break;
                            case false :
                                wlBlue = "패배";
                                break;
                        }
                        switch(wlRed){
                            case true :
                                wlRed = "승리";
                                break;
                            case false :
                                wlRed = "패배";
                                break;
                        }
                        date = new Date(data.info.gameStartTimestamp);
                        date = `${date.getFullYear()}년${date.getMonth()+1}월${date.getDate()}일`;
                        $(".con").append(
                            html.replace(`id ="game"`, `id ="game${i+1}"`)
                                 .replace(`{time}`,`${min}분${sec}초`)
                                 .replace(`{gamemode}`,abc)
                                 .replace(`{wlBlue}`,wlBlue)
                                 .replace(`{wlRed}`,wlRed)
                                 .replace(`{date}`,date)
                        );
                        for(let n = 0; n<10; n++){
                            if(nickname == (data.info.participants[n].summonerName).trim()){
                                if(data.info.participants[n].win){
                                    $(`#game${i+1} > .head > #WL`).text("승리");
                                }else{
                                    $(`#game${i+1} > .head > #WL`).text("패배");
                                }
                            }
                            spel1 = (data.info.participants[n].summoner1Id);
                            switch(spel1){
                                case 1 :
                                    spel1 = "Boost"
                                break;
                                case 3 :
                                    spel1 = "Exhaust"
                                break;
                                case 4 :
                                    spel1 = "Flash"
                                break;
                                case 6 :
                                    spel1 = "Haste"
                                break;
                                case 7 :
                                    spel1 = "heal"
                                break;
                                case 11 :
                                    spel1 = "smite"
                                break;
                                case 12 :
                                    spel1 = "Teleport"
                                break;
                                case 13 :
                                    spel1 = "Mana"
                                break;
                                case 14 :
                                    spel1 = "dot"
                                break;
                                case 21 :
                                    spel1 = "barrier"
                                break;
                                case 32 :
                                    spel1 = "snowball"
                                break;
                            }
                            spel2 = (data.info.participants[n].summoner2Id);
                            switch(spel2){
                                case 1 :
                                    spel2 = "Boost"
                                break;
                                case 3 :
                                    spel2 = "Exhaust"
                                break;
                                case 4 :
                                    spel2 = "Flash"
                                break;
                                case 6 :
                                    spel2 = "Haste"
                                break;
                                case 7 :
                                    spel2 = "heal"
                                break;
                                case 11 :
                                    spel2 = "smite"
                                break;
                                case 12 :
                                    spel2 = "Teleport"
                                break;
                                case 13 :
                                    spel2 = "Mana"
                                break;
                                case 14 :
                                    spel2 = "dot"
                                break;
                                case 21 :
                                    spel2 = "barrier"
                                break;
                                case 32 :
                                    spel2 = "snowball"
                                break;
                            }
                            if(n<5){
                                resultblue += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                                    .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                                    .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                                    .replace(`{userName}`,data.info.participants[n].summonerName)
                                                   .replace(`{k}`,data.info.participants[n].kills+"/")
                                                   .replace(`{d}`,data.info.participants[n].deaths+"/")
                                                   .replace(`{a}`,data.info.participants[n].assists)
                                                   .replace(`{cs}`,(data.info.participants[n].totalMinionsKilled) + (data.info.participants[n].neutralMinionsKilled))
                                                   .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                                   .replace(`{gold}`,data.info.participants[n].goldEarned);
                            }else{
                                resultred += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                                  .replace(`{userName}`,data.info.participants[n].summonerName)
                                                  .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                                  .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                                  .replace(`{k}`,data.info.participants[n].kills+"/")
                                                  .replace(`{d}`,data.info.participants[n].deaths+"/")
                                                  .replace(`{a}`,data.info.participants[n].assists)
                                                  .replace(`{cs}`,data.info.participants[n].totalMinionsKilled + (data.info.participants[n].neutralMinionsKilled))
                                                  .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                                  .replace(`{gold}`,data.info.participants[n].goldEarned);
                           }
                        }
                        document.querySelector(`#game${i+1} .blue2`).innerHTML = resultblue;
                        document.querySelector(`#game${i+1} .red2`).innerHTML = resultred; 
                    })
                }

            })
        })
        $(".loading").css("display", 'none');
        $("#plusBtn").css("display", "block");
        },500)
    })

    $("#btn").click(function(){
        if(a < 15){
            let abcd = Date.now();
            alert(abcd);
        }
    })
})

