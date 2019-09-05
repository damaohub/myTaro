
function formatNum(n) {  
    n = n.toString()  
    return n[1] ? n : '0' + n  
} 
export function mathAccount(m:number, n:number) {
    if (m < 0 || n < 0 || m < n) {
        return 0;
    }
    n = n < (m - n) ? n : m - n;
    if (n == 0) {
        return 1;
    }
    var result = m;
    for (var i = 2, j = result - 1; i <= n; i++, j--) {
        result = result * j / i;
    }
    return result;
}

export function formatTime(time?:number){
    let myDate = time ? new Date(time) : new Date(),
        year=myDate.getFullYear(),
        month=myDate.getMonth()+1,
        date=myDate.getDate(),
        hour=myDate.getHours(),
        minute=myDate.getMinutes(),
        second=myDate.getSeconds();
   return year+'-' + formatNum(month)+'-'+ formatNum(date)+ ' ' + formatNum(hour)+':'+formatNum(minute)+":"+formatNum(second);
}

export function getUUID() {
   return  new Date().getTime() + Math.random().toString(36).substr(2)
}

export function getNextEvent(event:number, time:number) {
    let oldDate = new Date(time), 
    oldYear = oldDate.getFullYear(),
    day = oldDate.getDay(),
    nextTime = day === 3? time +257400000: time +171000000,
    nextDateObj = new Date(nextTime),
    nextYear = nextDateObj.getFullYear();
    if(nextYear - oldYear === 1) {
        const yearStr = nextYear+'';
        const eventStr = yearStr.slice(-2) + '001'
        return parseInt(eventStr, 10)
    }
    return (event + 1)
}

export function getNextOpenTime(time:number) {
    let oldDate = new Date(time),
        day = oldDate.getDay();
    const dayArr:string[] = ['日', '一', '二', '三', '四', '五', '六'];
    const nextTime = day === 3? time +257400000: time +171000000 ;  // 2*24*60*60*1000-30*60*1000 = 171000000; 3*24*60*60*1000-30*60*1000 = 257400000
    let nextDateObj = new Date(nextTime),
        nextMonth = nextDateObj.getMonth() + 1,
        nextDate = nextDateObj.getDate(),
        nextDay = nextDateObj.getDay();
    return formatNum(nextMonth)+'-'+ formatNum(nextDate) + ' (周' + dayArr[nextDay] +')';
}
