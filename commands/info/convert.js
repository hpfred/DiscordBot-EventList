module.exports = {
    name: "convert",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        //let  [c1, c2, c3, c4, ...rest] = input.split (" ");
        //let msg = rest.join (" ");
        var elements = message.content.split(" ", 5)
        //elments [0] = prefix
        //elments [1] = date
        //elments [2] = time
        //elments [3] = timezone
        //elments [4] = duration
        //elments [5] = title
        date = elements[1].split("-")
        //date [0] = day
        //date [1] = month
        //date [2] = year
        time = elements[2].split(":")
        //time [0] = hour
        //time [1] = minute

        var title = message.content.slice(message.content.indexOf("\"")+1,-1)

        var d = new Date(date[2],date[1]-1,date[0],time[0],time[1])   //(year, month, day, hours, minutes)
        var epoch = Math.floor(d/1000)

        var timezoneOffset = d.getTimezoneOffset()
        if(elements[3]=="PT" || elements[3]=="PDT" || elements[3]=="PST"){
            timezone = (-8 * 3600) + (timezoneOffset*60)
            //O problema que tá dando é que tu quer converter do GMT-8 pra GMT e não o contrário, então tem que somar 8 na verdade
        }
        else if(elements[3]=="ET" || elements[3]=="EDT" || elements[3]=="EST"){
            timezone = (-5 * 3600) + (timezoneOffset*60)
        }
        else if(elements[3]=="BRT"){
            timezone = (-3 * 3600) + (timezoneOffset*60)
        }
        else{
            timezone = 0    //Aqui fazer com a pessoa passando como "GMT+X" ou "GMT-Y"
        }

        utc_time = epoch - (timezone)
        utc_endtime = utc_time + (elements[4]*60)

        message.reply("**"+title+"** (<t:"+utc_time+":d> | <t:"+utc_time+":t> - <t:"+utc_endtime+":t>)\nStarts: <t:"+utc_time+":R>")
        message.reply("``**"+title+"** (<t:"+utc_time+":d> | <t:"+utc_time+":t> - <t:"+utc_endtime+":t>)\nStarts: <t:"+utc_time+":R>``")
    }
}