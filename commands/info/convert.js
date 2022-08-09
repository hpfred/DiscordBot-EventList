module.exports = {
    name: "convert",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
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

        //function seconds_since_epoch(d){ 
        //    return Math.floor( d / 1000 ); 
        //}
        var d = new Date(date[2],date[1],date[0],time[0],time[1],0,0)   //(year, month, day, hours, minutes, seconds, milliseconds)
        //var epoch = seconds_since_epoch(d)
        var epoch = Math.floor(d/1000)

        if(elements[3]=="PT" || elements[3]=="PDT" || elements[3]=="PST"){
            timezone = -8
        }
        else if(elements[3]=="ET" || elements[3]=="EDT" || elements[3]=="EST"){
            timezone = -5
        }
        else if(elements[3]=="BRT"){
            timezone = -3
        }
        else{
            elements = 0 //Aqui fazer com a pessoa passando como "GMT+X" ou "GMT-Y"
        }

        utc_time = epoch + (timezone*60*60)
        utc_endtime = utc_time + (elements[4]*60)

        message.reply("``**"+elements[5]+"** (<t:"+utc_time+":d> | <t:"+utc_time+":t> - <t:"+utc_endtime+":t>\nStarts: <t:"+utc_time+":R>``")
    }
}