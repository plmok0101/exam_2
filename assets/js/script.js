const api_key = "RGAPI-96d3ad7d-972a-463c-ba12-336dc9208f0c";
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
let kda;
let minCs;
let gold;
let damage;
let po;


function setItemTime(keyName, keyValue, ms){
    let obj = {
        value : keyValue,
        expire : Date.now() + ms
    }

    let objStr = JSON.stringify(obj)+`/`;

    localStorage.setItem(keyName,objStr);
}

function setItemTime2(keyValue, ms){
    let obj = {
        value : keyValue,
        expire : Date.now() + ms
    }

    let objStr = obj
    return objStr;
}


function getItemTime(keyName){
    let objStr = localStorage.getItem(keyName);

    if(!objStr){
        return null;
    }

    let obj = JSON.parse(objStr);

    if(Date.now() > obj.expire){
        localStorage.removeItem(keyName);
        return null;
    }
    return obj;
}

function KDA(k,d,a){
    return (k+a)/d.toFixed(2);
}

function getdt(data){
    if(data < 1){
        return 1;
    }else{
        return data;
    }
}

function ajax3(i,a){
    html = document.querySelector("#template").innerHTML;
    html2 = document.querySelector("#template2").innerHTML;
    $.ajax({
        type: "get",
        url:`https://asia.api.riotgames.com/lol/match/v5/matches/${game[i+a]}?api_key=${api_key}`,
        dataType:"json",
        async: false,
        success: function(data){
            team1 ="";
            team2 = "";

            min = parseInt((data.info.gameDuration)/60);
            sec = parseInt((data.info.gameDuration)%60);
            console
            wlBlue = getWl(data.info.participants[0].win);
            wlRed = getWl(data.info.participants[5].win);
            gamemode = getgamemode((data.info.queueId));

            date = new Date(data.info.gameStartTimestamp);
            btDay = date2(data.info.gameStartTimestamp);

            date = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
            if(btDay<10){
                $(".con").append(
                    html.replace(`id ="game"`, `id ="game${i+1+a}"`)
                        .replace(`{time}`,`${min}:${sec}`)
                        .replace(`{gamemode}`,gamemode)
                        .replace(`{date}`,btDay+"??????")
                        .replace(`{Wl}`,)
                        .replace(`class ="teamPlusBtn"`,`class ="teamPlusBtn${i+1+a}"`)
                );
            }else{
                $(".con").append(
                    html.replace(`id ="game"`, `id ="game${i+1+a}"`)
                        .replace(`{time}`,`${min}:${sec}`)
                        .replace(`{gamemode}`,gamemode)
                        .replace(`{date}`,date)
                        .replace(`class ="teamPlusBtn"`,`class ="teamPlusBtn${i+1+a}"`)
                );
            }
            for(let n = 0; n<10; n++){
                spel1 = getSpell(data.info.participants[n].summoner1Id);
                spel2 = getSpell(data.info.participants[n].summoner2Id);

                item1 = getitem(data.info.participants[n].item0);
                item2 = getitem(data.info.participants[n].item1);
                item3 = getitem(data.info.participants[n].item2);
                item4 = getitem(data.info.participants[n].item3);
                item5 = getitem(data.info.participants[n].item4);
                item6 = getitem(data.info.participants[n].item5);
                ward = getward(data.info.participants[n].item6);
                kda = ((data.info.participants[n].kills + data.info.participants[n].assists)/getdt(data.info.participants[n].deaths)).toFixed(2);
                minCs = ((data.info.participants[n].totalMinionsKilled + data.info.participants[n].neutralMinionsKilled)/min).toFixed(1);
                gold  = (data.info.participants[n].goldEarned/1000).toFixed(1);
                damage = (data.info.participants[n].totalDamageDealtToChampions/1000).toFixed(1);

                if(nickname == (data.info.participants[n].summonerName).replace(/(\s*)/g, "").toUpperCase()){
                    teamId = (data.info.participants[n].teamId);
                    teamOne = getTeam(teamId);
                    teamTwo = getTeam2(teamId);
                    $(`#game${i+1+a}`).find(".champion").html(`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size border30"/>`);
                    $(`#game${i+1+a}`).find(".KDA").html(`<div> ${data.info.participants[n].kills} / ${data.info.participants[n].deaths} / ${data.info.participants[n].assists} </div>`);
                    $(`#game${i+1+a}`).find(".spell").html(`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/><img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/>`);
                    $(`#game${i+1+a}`).find(".perk").html(`<img src="https://opgg-static.akamaized.net/meta/images/lol/perk/${data.info.participants[n].perks.styles[0].selections[0].perk}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/><img src="https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${data.info.participants[n].perks.styles[1].style}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/>`);
                    $(`#game${i+1+a}`).find(".item1").html(item1);
                    $(`#game${i+1+a}`).find(".item2").html(item2);
                    $(`#game${i+1+a}`).find(".item3").html(item3);
                    $(`#game${i+1+a}`).find(".item4").html(item4);
                    $(`#game${i+1+a}`).find(".item5").html(item5);
                    $(`#game${i+1+a}`).find(".item6").html(item6);
                    $(`#game${i+1+a}`).find(".ward").html(ward);
                    $(`#game${i+1+a}`).find(".CS").html(`${data.info.participants[n].totalMinionsKilled + data.info.participants[n].neutralMinionsKilled}    (${minCs})`);
                    $(`#game${i+1+a}`).find(".damage").html(`${damage}K`)
                    $(`#game${i+1+a}`).find(".gold").html(`${gold}K`)
                    if(data.info.participants[n].win){
                        $(`#game${i+1+a} > .flex > .head > .WL`).text("???");
                        $(`#game${i+1+a} > .flex > .head`).addClass(`WIN`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl`).text(`???`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl`).addClass(`winColor`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl2`).text(`(${teamOne})`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl`).text(`???`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl`).addClass(`loseColor`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl2`).text(`(${teamTwo})`);
                        $(`#game${i+1+a} > .head > .WL`).addClass(`winColor`);
                        $(`#game${i+1+a} > .div2 > .team1`).addClass(`WINborder`);
                        $(`#game${i+1+a} > .div2 > .team2`).addClass(`LOSEborder`);
                        $(`#game${i+1+a} > .head`).addClass(`WIN`);
                    }else{
                        $(`#game${i+1+a} > .flex > .head > .WL`).text("???");
                        $(`#game${i+1+a} > .flex > .head`).addClass(`LOSE`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl`).text(`???`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl`).addClass(`loseColor`);
                        $(`#game${i+1+a} > .div2 > .team1 > .flex >.wl2`).text(`(${teamOne})`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl`).text(`???`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl`).addClass(`winColor`);
                        $(`#game${i+1+a} > .div2 > .team2 > .flex >.wl2`).text(`(${teamTwo})`);
                        $(`#game${i+1+a} > .head > .WL`).addClass(`loseColor`);
                        $(`#game${i+1+a} > .div2 > .team1`).addClass(`LOSEborder`);
                        $(`#game${i+1+a} > .div2 > .team2`).addClass(`WINborder`);
                        $(`#game${i+1+a} > .head`).addClass(`LOSE`);
                    }
                }

                if(n<5){
                    team1 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size border30"/>`)
                                       .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                       .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/>`)
                                       .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/>`)
                                       .replace(`{perk}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/perk/${data.info.participants[n].perks.styles[0].selections[0].perk}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/>`)
                                       .replace(`{perkStyle}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${data.info.participants[n].perks.styles[1].style}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/>`)
                                       .replace(`{userName}`,data.info.participants[n].summonerName)
                                       .replace(`{item1}`,item1)
                                       .replace(`{item2}`,item2)
                                       .replace(`{item3}`,item3)
                                       .replace(`{item4}`,item4)
                                       .replace(`{item5}`,item5)
                                       .replace(`{item6}`,item6)
                                       .replace(`{ward}`,ward)
                                       .replace(`{k}`,data.info.participants[n].kills)
                                       .replace(`{d}`,data.info.participants[n].deaths)
                                       .replace(`{a}`,data.info.participants[n].assists)
                                       .replace(`{kda}`,`${kda}:1`)
                                       .replace(`{cs}`,(data.info.participants[n].totalMinionsKilled) + (data.info.participants[n].neutralMinionsKilled))
                                       .replace(`{minCs}`,`(${minCs})`)
                                       .replace(`{damage}`,`${damage}K`,)
                                       .replace(`{gold}`,`${gold}K`);
                }else{
                    team2 += html2.replace(`{champion}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/champion/${data.info.participants[n].championName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_92&v=1668492741460" class="size border30"/>`)
                                      .replace(`{champLevel}`,data.info.participants[n].champLevel)
                                      .replace(`{spell1}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel1}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/>`)
                                      .replace(`{spell2}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/spell/Summoner${spel2}.png?image=q_auto,f_webp,w_auto&v=1668492741460" class="size border30"/>`)
                                      .replace(`{perk}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/perk/${data.info.participants[n].perks.styles[0].selections[0].perk}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/>`)
                                      .replace(`{perkStyle}`,`<img src="https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${data.info.participants[n].perks.styles[1].style}.png?image=q_auto,f_webp,w_44&v=1669108845942" class="size"/>`)
                                      .replace(`{userName}`,data.info.participants[n].summonerName)
                                      .replace(`{item1}`,item1)
                                      .replace(`{item2}`,item2)
                                      .replace(`{item3}`,item3)
                                      .replace(`{item4}`,item4)
                                      .replace(`{item5}`,item5)
                                      .replace(`{item6}`,item6)
                                      .replace(`{ward}`,ward)
                                      .replace(`{k}`,data.info.participants[n].kills)
                                      .replace(`{d}`,data.info.participants[n].deaths)
                                      .replace(`{a}`,data.info.participants[n].assists)
                                      .replace(`{kda}`,`${kda}:1`)
                                      .replace(`{cs}`,(data.info.participants[n].totalMinionsKilled) + (data.info.participants[n].neutralMinionsKilled))
                                      .replace(`{minCs}`,`(${minCs})`)
                                      .replace(`{damage}`,`${damage}K`,)
                                      .replace(`{gold}`,`${gold}K`);
               }
            }
            if(teamId == 100){
                document.querySelector(`#game${i+1+a} .team1_2`).innerHTML = team1;
                document.querySelector(`#game${i+1+a} .team2_2`).innerHTML = team2;
            }
            if(teamId == 200){
                document.querySelector(`#game${i+1+a} .team1_2`).innerHTML = team2;
                document.querySelector(`#game${i+1+a} .team2_2`).innerHTML = team1;
            }
            if(i == 4){
                $("#plusBtn").css("display", "block");
                po = $(`#plusBtn`).offset().top;
                $("html").scrollTop(po);
            }
            if(i+a+1 == 20){
                $("#plusBtn").css("display","none");
            }
        }
    })
}

// ????????????
function getgamemode(data){
    switch(data){
        case 420 :
            data = "????????????";
            break;
        case 430 :
            data = "??????";
            break;
        case 440 :
            data = "????????????";
            break;
        case 450 :
            data = "?????????";
            break;
        case 700 :
            data = "??????";
            break;
        case 900 :
            data = "URF";
            break;
        case 1020 :
            data = "????????????";
    };
    return data;
;}
// ??????
function getWl(data){
    switch(data){
        case true :
            data = "??????";
            break;
        case false :
            data = "??????";
            break;
    }
    return data;
};
// ??????
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
// ?????????
function getitem(data){
    if(data == 0){
        return ``;
    }else{
        return `<img src="https://opgg-static.akamaized.net/meta/images/lol/item/${data}.png?image=q_auto,f_webp,w_44&v=1669025525721" class="size border30"/>`;
    };
};
// ??????
function getward(data){
    if(data == 0){
        return ``;
    }else{
        return `<img src="https://opgg-static.akamaized.net/meta/images/lol/item/${data}.png?image=q_auto,f_webp,w_44&v=1669025525721" class="size border50"/>`;
    };
};
// ???????????? 
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
// ???
function getTeam(data){
    if(data == 100){
        return "?????????"
    }else{
        return "?????????"
    }
}
function getTeam2(data){
    if(data == 200){
        return "?????????"
    }else{
        return "?????????"
    }
}
// ?????? ??????
$(document).ready(function(){
    let html = document.querySelector("#template").innerHTML;
    let html2 = document.querySelector("#template2").innerHTML;

    let aaa = [];
    let bbb = [];
    let abc123 = [];

    if(localStorage.getItem(`history`)){
        aaa = localStorage.getItem(`history`).split("/")
        aaa.pop();
    }
    if(aaa.length > 0){
        bbb = aaa.filter((v,i) => {
            let nV = JSON.parse(v)
            return Date.now() <= nV.expire
        })
        for(let i =0; i<bbb.length; i++){
            abc123 = JSON.parse(bbb[i])
            $(`.rec${i+1}`).html(`<span class="REC wdMax">${abc123.value}</span><i class="fas fa-times del"></i>`);
        }
        let ddd = "";
        for(let i = 0; i<bbb.length; i++){
            ddd += `${bbb[i]}`+`/`;
        }
        localStorage.setItem(`history`,ddd)
    }

//?????? ??????
$(document).on("click", ".del", function(event){

    let aaa = [];
    let bbb = [];
    let abc123 = [];

    if(localStorage.getItem(`history`)){
        aaa = localStorage.getItem(`history`).split("/")
        aaa.pop();
    }
    bbb = aaa.filter((v,i) => {
    let nV = JSON.parse(v)
        return Date.now() <= nV.expire && $(this).closest(".rec").text() != nV.value
    })
    if(bbb.length == 4){
        bbb.shift();
    }
    for(let i = 0; i<3; i++){
        $(`.rec${i+1}`).empty();
    }
    for(let i =0; i<bbb.length; i++){
        abc123 = JSON.parse(bbb[i])
        $(`.rec${i+1}`).html(`<span class="REC wdMax">${abc123.value}</span><i class="fas fa-times del"></i>`);
    }
    let ddd = "";
    for(let i = 0; i<bbb.length; i++){
        ddd += `${bbb[i]}`+`/`;
    }
    localStorage.setItem(`history`,ddd)
})    


// ????????????
    $(document).on("click", ".REC", function(event){
        if(nickname === ""){
            return false;
        };
        $("#nickname").val($(this).text());
        nickname = $("#nickname").val().replace(/(\s*)/g, "").toUpperCase();

        let aaa = [];
        let bbb = [];
        let abc123 = [];
    
        if(localStorage.getItem(`history`)){
            aaa = localStorage.getItem(`history`).split("/")
            aaa.pop();
        }
        if(aaa.length > 0){
            bbb = aaa.filter((v,i) => {
                let nV = JSON.parse(v)
                return Date.now() <= nV.expire &&  $("#nickname").val() != nV.value
            })
            let ccc = `{"value":"${$('#nickname').val()}","expire":${Date.now() + 30000}}`
            bbb.push(ccc)
            if(bbb.length == 4){
                bbb.shift();
            }
            for(let i = 0; i<3; i++){
                $(`.rec${i+1}`).empty();
            }
            for(let i =0; i<bbb.length; i++){
                abc123 = JSON.parse(bbb[i])
                $(`.rec${i+1}`).html(`<span class="REC wdMax">${abc123.value}</span><i class="fas fa-times del"></i>`);
            }
            let ddd = "";
            for(let i = 0; i<bbb.length; i++){
                ddd += `${bbb[i]}`+`/`;
            }
            localStorage.setItem(`history`,ddd)
        }
        a = 0;
        $('div.game').remove();
        event.preventDefault();
        $(".loading").css("display", 'inline-block');
        $("#plusBtn").css("display","none");
        setTimeout(function(){
        $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
            puuid = (data.puuid);
            $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`, function(data){
                game = (data);
                for(let i =0; i<5; i++){
                    ajax3(i,a);
                }

            })
        })
        $(".loading").css("display", 'none');
        },500)
    })

    // ????????????
    $("#form").submit(function(event){
        event.preventDefault();
        nickname = $("#nickname").val().replace(/(\s*)/g, "").toUpperCase();
        if(nickname === ""){
            return false;
        };
        
        let aaa = [];
        let bbb = [];
        let abc123 = [];

        if(localStorage.getItem(`history`)){
            aaa = localStorage.getItem(`history`).split("/")
            aaa.pop();
        }
        if(aaa.length > 0){
            bbb = aaa.filter((v,i) => {
                let nV = JSON.parse(v)
                return Date.now() <= nV.expire &&  $("#nickname").val() != nV.value
            })
            let ccc = `{"value":"${$('#nickname').val()}","expire":${Date.now() + 600000}}`
            bbb.push(ccc)
            if(bbb.length == 4){
                bbb.shift();
            }
            for(let i = 0; i<3; i++){
                $(`.rec${i+1}`).empty();
            }
            for(let i =0; i<bbb.length; i++){
                abc123 = JSON.parse(bbb[i])
                $(`.rec${i+1}`).html(`<span class="REC wdMax">${abc123.value}</span><i class="fas fa-times del"></i>`);
            }
            let ddd = "";
            for(let i = 0; i<bbb.length; i++){
                ddd += `${bbb[i]}`+`/`;
            }
            localStorage.setItem(`history`,ddd)
        }else{
            setItemTime(`history`, $("#nickname").val(), 600000)
            if(localStorage.getItem(`history`)){
                aaa = localStorage.getItem(`history`).split("/")
                aaa.pop();
            }
            bbb = aaa.filter((v,i) => {
            let nV = JSON.parse(v)
                return Date.now() <= nV.expire
            })
            if(bbb.length == 4){
                bbb.shift();
            }
            for(let i =0; i<bbb.length; i++){
                abc123 = JSON.parse(bbb[i])
                $(`.rec${i+1}`).html(`<span class="REC wdMax">${abc123.value}</span><i class="fas fa-times del"></i>`);
            }
            let ddd = "";
            for(let i = 0; i<bbb.length; i++){
                ddd += `${bbb[i]}`+`/`;
            }
            localStorage.setItem(`history`,ddd)
        }

        a = 0;
        $('div.game').remove();
        $(".loading").css("display", 'inline-block');
        $("#plusBtn").css("display","none");
        setTimeout(function(){
        $.getJSON(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`, function(data){
            puuid = (data.puuid);
            $.getJSON(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`, function(data){
                game = (data);
                for(let i =0; i<5; i++){
                    ajax3(i,a);
                }

            })
        })
        $(".loading").css("display", 'none');
        },500)
    })

    // ????????? ??????
    $("#plusBtn").click(function(){
        a +=5;
        $(".loading").css("display", 'inline-block');
        $("#plusBtn").css("display", "none");
        setTimeout( function() {
            for( let i = 0 ; i < 5 ; i++ ){
                ajax3(i,a);
            }
            $(".loading").css("display", 'none');
            $(".bot").insertAfter(".con");
        },500)

    })

    // ????????? ????????????
    $("#test").click(function(){
        localStorage.removeItem($("#nickname").val());
    })

})

// ????????? ?????? ??????
$(document).on("click",".abcd",function(event){
    if( $(this).find(".PlusBtn").html().trim() == `<img src="assets/image/open.svg" class="size">` ){
        $(this).find(".PlusBtn").css(`transform`,`rotate(180deg)`);
        $(this).find(".PlusBtn").html(`<img src="assets/image/close.svg" class="size">`);
    } else {
        $(this).find(".PlusBtn").css(`transform`,`rotate(0deg)`);
        $(this).find(".PlusBtn").html(`<img src="assets/image/open.svg" class="size">`);
    }
    $(this).closest(".game").find(".div2").slideToggle();
})