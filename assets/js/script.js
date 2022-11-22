let api_key = "RGAPI-8e58be1f-8a0b-4a2e-8bad-4f2908b8decd";
let nickname;
let game = [];
let puuid;
let a = 0;
let team1;
let team2;
let team;
let min;
let gamemode;
let sec;
let wlBlue;
let wlRed;
let date;
let spel1
let spel2
let nowDate;
let now;
let year;
let month;
let day;
let stDate;
let endDate;
let btMs;
let btDay;
let teamId;

function ajax3(i){
    html = document.querySelector("#template").innerHTML;
    html2 = document.querySelector("#template2").innerHTML;
    $.ajax({
        type: "get",
        url:`https://asia.api.riotgames.com/lol/match/v5/matches/${game[i]}?api_key=${api_key}`,
        dataType:"json",
        async: false,
        success: function(data){
            team1 ="";
            team2 = "";
    
            min = parseInt((data.info.gameDuration)/60);
            sec = parseInt((data.info.gameDuration)%60);
    
            wlBlue = getWl(data.info.participants[0].win);
            wlRed = getWl(data.info.participants[5].win); 
            gamemode = getgamemode((data.info.queueId));
    
            date = new Date(data.info.gameStartTimestamp);
            btDay = date2(data.info.gameStartTimestamp);
    
            date = `${date.getFullYear()}년${date.getMonth()+1}월${date.getDate()}일`;
            if(btDay<10){
                $(".con").append(
                    html.replace(`id ="game"`, `id ="game${i+1}"`)
                         .replace(`{time}`,`${min}:${sec}`)
                         .replace(`{gamemode}`,gamemode)
                         .replace(`{date}`,btDay+"일전")
                         .replace(`{Wl}`,)
                         .replace(`id ="teamPlusBtn"`,`id ="teamPlusBtn${i+1}"`)
                );
            }else{
                $(".con").append(
                    html.replace(`id ="game"`, `id ="game${i+1}"`)
                         .replace(`{time}`,`${min}:${sec}`)
                         .replace(`{gamemode}`,gamemode)
                         .replace(`{date}`,date)
                         .replace(`class ="teamPlusBtn"`,`class ="teamPlusBtn${i+1}"`)
                );
            }
            for(let n = 0; n<10; n++){
                if(nickname == (data.info.participants[n].summonerName).replace(/(\s*)/g, "").toUpperCase()){
                    teamId = (data.info.participants[n].teamId);
                    teamOne = getTeam(teamId);
                    teamTwo = getTeam2(teamId);
                    if(data.info.participants[n].win){
                        $(`#game${i+1} > .head > #WL`).text("승리");
                        $(`#game${i+1} > .div2 > .team1 > .flex >.wl`).text(`승리(${teamOne})`);
                        $(`#game${i+1} > .div2 > .team2 > .flex >.wl`).text(`패배(${teamTwo})`);
                        $(`#game${i+1} > .head > #WL`).addClass(`winColor`);
                        $(`#game${i+1} > .div2 > .team1`).addClass(`WIN`);
                        $(`#game${i+1} > .div2 > .team2`).addClass(`LOSE`);
                        $(`#game${i+1} > .head`).addClass(`WIN`);
                    }else{
                        $(`#game${i+1} > .head > #WL`).text("패배");
                        $(`#game${i+1} > .div2 > .team1 > .flex >.wl`).text(`패배(${teamOne})`);
                        $(`#game${i+1} > .div2 > .team2 > .flex >.wl`).text(`승리(${teamTwo})`);
                        $(`#game${i+1} > .head > #WL`).addClass(`loseColor`);
                        $(`#game${i+1} > .div2 > .team1`).addClass(`LOSE`);
                        $(`#game${i+1} > .div2 > .team2`).addClass(`WIN`);
                        $(`#game${i+1} > .head`).addClass(`LOSE`);
                    }
                }
                spel1 = getSpell(data.info.participants[n].summoner1Id);
                spel2 = getSpell(data.info.participants[n].summoner2Id);
    
                item1 = getitem(data.info.participants[n].item0);
                item2 = getitem(data.info.participants[n].item1);
                item3 = getitem(data.info.participants[n].item2);
                item4 = getitem(data.info.participants[n].item3);
                item5 = getitem(data.info.participants[n].item4);
                item6 = getitem(data.info.participants[n].item5);
                ward = getitem(data.info.participants[n].item6);
    
                if(n<5){
                    team1 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                       .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                       .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                       .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                       .replace(`{userName}`,data.info.participants[n].summonerName)
                                       .replace(`{item1}`,item1)
                                       .replace(`{item2}`,item2)
                                       .replace(`{item3}`,item3)
                                       .replace(`{item4}`,item4)
                                       .replace(`{item5}`,item5)
                                       .replace(`{item6}`,item6)
                                       .replace(`{ward}`,ward)
                                       .replace(`{k}`,data.info.participants[n].kills+"/")
                                       .replace(`{d}`,data.info.participants[n].deaths+"/")
                                       .replace(`{a}`,data.info.participants[n].assists)
                                       .replace(`{cs}`,(data.info.participants[n].totalMinionsKilled) + (data.info.participants[n].neutralMinionsKilled))
                                       .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                       .replace(`{gold}`,data.info.participants[n].goldEarned);
                }else{
                    team2 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                      .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                      .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                      .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                      .replace(`{userName}`,data.info.participants[n].summonerName)
                                      .replace(`{item1}`,item1)
                                      .replace(`{item2}`,item2)
                                      .replace(`{item3}`,item3)
                                      .replace(`{item4}`,item4)
                                      .replace(`{item5}`,item5)
                                      .replace(`{item6}`,item6)
                                      .replace(`{ward}`,ward)
                                      .replace(`{k}`,data.info.participants[n].kills+"/")
                                      .replace(`{d}`,data.info.participants[n].deaths+"/")
                                      .replace(`{a}`,data.info.participants[n].assists)
                                      .replace(`{cs}`,data.info.participants[n].totalMinionsKilled + (data.info.participants[n].neutralMinionsKilled))
                                      .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                      .replace(`{gold}`,data.info.participants[n].goldEarned);
               }
            }
            if(teamId == 100){
                document.querySelector(`#game${i+1} .team1_2`).innerHTML = team1;
                document.querySelector(`#game${i+1} .team2_2`).innerHTML = team2; 
            }
            if(teamId == 200){
                document.querySelector(`#game${i+1} .team1_2`).innerHTML = team2;
                document.querySelector(`#game${i+1} .team2_2`).innerHTML = team1; 
            }
        }
    })
}


function getgamemode(data){
    switch(data){
        case 420 :
            data = "솔로랭크";
            break;
        case 430 :
            data = "일반";
            break;
        case 440 :
            data = "자유랭크";
            break;
        case 450 :
            data = "킬바람";
            break;
        case 700 :
            data = "격전";
            break;
        case 900 :
            data = "URF";
            break;
        case 1020 :
            data = "단일모드";
    };
    return data;
;}

function getWl(data){
    switch(data){
        case true :
            data = "승리";
            break;
        case false :
            data = "패배";
            break;
    }
    return data;
};

function getSpell(data){
    switch(data){
        case 1 :
            data = "Boost"
        break;
        case 3 :
            data = "Exhaust"
        break;
        case 4 :
            data = "Flash"
        break;
        case 6 :
            data = "Haste"
        break;
        case 7 :
            data = "heal"
        break;
        case 11 :
            data = "smite"
        break;
        case 12 :
            data = "Teleport"
        break;
        case 13 :
            data = "Mana"
        break;
        case 14 :
            data = "dot"
        break;
        case 21 :
            data = "barrier"
        break;
        case 32 :
            data = "snowball"
        break;
    }
    return data;
}

function getitem(data){
    if(data == 0){
        return `<img src="assets/image/item0.png" class="size"/>`;
    }else{
        return `<img src="https://opgg-static.akamaized.net/meta/images/lol/item/${data}.png?image=q_auto,f_webp,w_44&v=1669025525721" class="size"/>`;
    };
};

function date2(data){
    date = new Date(data);
    now = new Date();

    year = now.getFullYear();
    month = now.getMonth()+1;
    day = now.getDate();

    stDate  = new Date(date.getFullYear(),date.getMonth()+1,date.getDate());
    endDate = new Date(year, month, day);

    btMs = endDate.getTime() - stDate.getTime();
    btDay = btMs / (1000*60*60*24);
    return btDay;
}

function getTeam(data){
    if(data == 100){
        return "블루팀"
    }else{
        return "레드팀"
    }
}
function getTeam2(data){
    if(data == 200){
        return "블루팀"
    }else{
        return "레드팀"
    }
}
function getjosn3(i){
    html = document.querySelector("#template").innerHTML;
    html2 = document.querySelector("#template2").innerHTML;
    $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/${game[i]}?api_key=${api_key}`,function(data){
        team1 ="";
        team2 = "";

        min = parseInt((data.info.gameDuration)/60);
        sec = parseInt((data.info.gameDuration)%60);

        wlBlue = getWl(data.info.participants[0].win);
        wlRed = getWl(data.info.participants[5].win); 
        gamemode = getgamemode((data.info.queueId));

        date = new Date(data.info.gameStartTimestamp);
        btDay = date2(data.info.gameStartTimestamp);

        date = `${date.getFullYear()}년${date.getMonth()+1}월${date.getDate()}일`;
        if(btDay<10){
            $(".con").append(
                html.replace(`id ="game"`, `id ="game${i+1}"`)
                     .replace(`{time}`,`${min}:${sec}`)
                     .replace(`{gamemode}`,gamemode)
                     .replace(`{date}`,btDay+"일전")
                     .replace(`{Wl}`,)
                     .replace(`id ="teamPlusBtn"`,`id ="teamPlusBtn${i+1}"`)
            );
        }else{
            $(".con").append(
                html.replace(`id ="game"`, `id ="game${i+1}"`)
                     .replace(`{time}`,`${min}:${sec}`)
                     .replace(`{gamemode}`,gamemode)
                     .replace(`{date}`,date)
                     .replace(`class ="teamPlusBtn"`,`class ="teamPlusBtn${i+1}"`)
            );
        }
        for(let n = 0; n<10; n++){
            if(nickname == (data.info.participants[n].summonerName).replace(/(\s*)/g, "").toUpperCase()){
                teamId = (data.info.participants[n].teamId);
                teamOne = getTeam(teamId);
                teamTwo = getTeam2(teamId);
                if(data.info.participants[n].win){
                    $(`#game${i+1} > .head > #WL`).text("승리");
                    $(`#game${i+1} > .div2 > .team1 > .flex >.wl`).text(`승리(${teamOne})`);
                    $(`#game${i+1} > .div2 > .team2 > .flex >.wl`).text(`패배(${teamTwo})`);
                    $(`#game${i+1} > .head > #WL`).addClass(`winColor`);
                    $(`#game${i+1} > .div2 > .team1`).addClass(`WIN`);
                    $(`#game${i+1} > .div2 > .team2`).addClass(`LOSE`);
                    $(`#game${i+1} > .head`).addClass(`WIN`);
                }else{
                    $(`#game${i+1} > .head > #WL`).text("패배");
                    $(`#game${i+1} > .div2 > .team1 > .flex >.wl`).text(`패배(${teamOne})`);
                    $(`#game${i+1} > .div2 > .team2 > .flex >.wl`).text(`승리(${teamTwo})`);
                    $(`#game${i+1} > .head > #WL`).addClass(`loseColor`);
                    $(`#game${i+1} > .div2 > .team1`).addClass(`LOSE`);
                    $(`#game${i+1} > .div2 > .team2`).addClass(`WIN`);
                    $(`#game${i+1} > .head`).addClass(`LOSE`);
                }
            }
            spel1 = getSpell(data.info.participants[n].summoner1Id);
            spel2 = getSpell(data.info.participants[n].summoner2Id);

            item1 = getitem(data.info.participants[n].item0);
            item2 = getitem(data.info.participants[n].item1);
            item3 = getitem(data.info.participants[n].item2);
            item4 = getitem(data.info.participants[n].item3);
            item5 = getitem(data.info.participants[n].item4);
            item6 = getitem(data.info.participants[n].item5);
            ward = getitem(data.info.participants[n].item6);

            if(n<5){
                team1 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                   .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                   .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                   .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                   .replace(`{userName}`,data.info.participants[n].summonerName)
                                   .replace(`{item1}`,item1)
                                   .replace(`{item2}`,item2)
                                   .replace(`{item3}`,item3)
                                   .replace(`{item4}`,item4)
                                   .replace(`{item5}`,item5)
                                   .replace(`{item6}`,item6)
                                   .replace(`{ward}`,ward)
                                   .replace(`{k}`,data.info.participants[n].kills+"/")
                                   .replace(`{d}`,data.info.participants[n].deaths+"/")
                                   .replace(`{a}`,data.info.participants[n].assists)
                                   .replace(`{cs}`,(data.info.participants[n].totalMinionsKilled) + (data.info.participants[n].neutralMinionsKilled))
                                   .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                   .replace(`{gold}`,data.info.participants[n].goldEarned);
            }else{
                team2 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size"/>`)
                                  .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                  .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                  .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size"/>`)
                                  .replace(`{userName}`,data.info.participants[n].summonerName)
                                  .replace(`{item1}`,item1)
                                  .replace(`{item2}`,item2)
                                  .replace(`{item3}`,item3)
                                  .replace(`{item4}`,item4)
                                  .replace(`{item5}`,item5)
                                  .replace(`{item6}`,item6)
                                  .replace(`{ward}`,ward)
                                  .replace(`{k}`,data.info.participants[n].kills+"/")
                                  .replace(`{d}`,data.info.participants[n].deaths+"/")
                                  .replace(`{a}`,data.info.participants[n].assists)
                                  .replace(`{cs}`,data.info.participants[n].totalMinionsKilled + (data.info.participants[n].neutralMinionsKilled))
                                  .replace(`{damage}`,data.info.participants[n].totalDamageDealtToChampions)
                                  .replace(`{gold}`,data.info.participants[n].goldEarned);
           }
        }
        if(teamId == 100){
            document.querySelector(`#game${i+1} .team1_2`).innerHTML = team1;
            document.querySelector(`#game${i+1} .team2_2`).innerHTML = team2; 
        }
        if(teamId == 200){
            document.querySelector(`#game${i+1} .team1_2`).innerHTML = team2;
            document.querySelector(`#game${i+1} .team2_2`).innerHTML = team1; 
        }
    })
}

$(document).ready(function(){
        let html = document.querySelector("#template").innerHTML;
        let html2 = document.querySelector("#template2").innerHTML;

    $("header").css("height",$("#opgg").height());
    $("#form").submit(function(event){
        nickname = $("#nickname").val();
        nickname =nickname.replace(/(\s*)/g, "").toUpperCase();
        a = 0;
        $('div.game').remove();
        if(nickname === ""){
            return false;
        };
        event.preventDefault();
        $(".loading").css("display", 'inline-block');
        setTimeout(function(){
        $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
            puuid = (data.puuid);
            $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`, function(data){
                game = (data);
                for(let i =0; i<5; i++){
                    ajax3(i);
                }

            })
        })
        $(".loading").css("display", 'none');
        $("#plusBtn").css("display", "block");
        },500)
    })


    $("#plusBtn").click(function(){
        a +=5;
        $(".loading").css("display", 'inline-block');
        setTimeout(function(){
            for(let i = 0+a ; i < 5+a ; i++){
                ajax3(i);
            }
            $(".loading").css("display", 'none');
            $(".bot").insertAfter(".con");
        },500)

    })
    // $("#game1 > .div2 > .team2_2").toggle();
    $("#teamPlusBtn").click(function(){
        console.log("wpqkf");
    })
    
    $("#btn").click(function(){
        console.log(game[0])
    })
})
$(document).on("click","#teamPlusBtn1",function(){
    $("#game1 > .div2 > .team2").toggle();
})
$(document).on("click","#teamPlusBtn2",function(){
    $("#game2 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn3",function(){
    $("#game3 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn4",function(){
    $("#game4 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn5",function(){
    $("#game5 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn6",function(){
    $("#game6 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn7",function(){
    $("#game7 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn8",function(){
    $("#game8 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn9",function(){
    $("#game9 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn10",function(){
    $("#game10 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn11",function(){
    $("#game11 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn12",function(){
    $("#game12 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn13",function(){
    $("#game13 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn14",function(){
    $("#game14 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn15",function(){
    $("#game15 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn16",function(){
    $("#game16 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn17",function(){
    $("#game17 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn18",function(){
    $("#game18 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn19",function(){
    $("#game19 > .div2 > .team2").toggle();
})

$(document).on("click","#teamPlusBtn20",function(){
    $("#game20 > .div2 > .team2").toggle();
})

