//封装时间库

function Time(year, month, ...rest) {
    if(!(this instanceof Time)){ 
        return new Time(year, month, ...rest)
    }
    if (arguments.length === 0) {
        this.date = new Date()
    } else if (arguments.length === 1) {
        this.date = new Date(year)
    } else if (arguments.length >= 2) {
        this.date = new Date(year, month - 1, ...rest)
    } else {
        throw new Error('参数错误')
    }
}
Time.prototype = {
    constructor: Time,
    clone() {
        return new Time(this.date)
    },
    year(value) {
        if(arguments.length === 0){
            return this.date.getFullYear()
        }else{
            this.date.setFullYear(value)
            return this
        }
    },
    month(value) {
        if(arguments.length === 0){
            return this.date.getMonth() + 1
        }else{
            this.date.setMonth(value-1)
            return this
        }
    },
    day(value) {
        if(arguments.length === 0){
            return this.date.getDate()
        }else{
            this.date.setDate(value)
            return this
        }
    },
    hours(value) {
        if(arguments.length === 0){
            return this.date.getHours()
        }else{
            this.date.setHours(value)
            return this
        }
    },
    minutes(value) {
        if(arguments.length === 0){
            return this.date.getMinutes()
        }else{
            this.date.setMinutes(value)
            return this
        }
    },
    seconds(value) {
        if(arguments.length === 0){
            return this.date.getSeconds()
        }else{
            this.date.setSeconds(value)
            return this
        }
    },
    ms(value) {
        if(arguments.length === 0){
            return this.date.getMilliseconds()
        }else{
            this.date.setMilliseconds(value)
            return this
        }
    },
    add(n, unit) {
        const copy = this.clone()
        //console.log(copy.date)
        if (unit.endsWith('s')) {
            unit = unit.slice(0, -1)
        }
        const name = map[unit]
        if(name === undefined){
            throw new Error('invalid unit 无效的单位:'+unit)
        }
        copy.date['set' + name](copy.date['get' + name]() + n)
        return copy
    },
    sub(n,unit){
       return this.add(-n,unit)
        
    },
    isLeapYear() {
        return this.clone().month(2).day(29).day() === 29
    },
    LastDayOfMonth() {
        return this.clone().day(1).add(1,'month').sub(1,'day')
        
    },
    /**
     * 格式化输出日期字符串
     * 目前只支持 yyyy MM dd  HH mm ss 格式
     * @param {*} 格式化模板 如'yyyy-MM-dd HH:mm:ss'
     */
    format(str){
       return  str.replace(/yyyy/g,this.year())
       .replace(/MM/g,this.month().toString().padStart(2,'0'))//padStar(2,'0')补零，最多2位
       .replace(/dd/g,this.day().toString().padStart(2,'0'))
       .replace(/HH/g,this.hours())
       .replace(/mm/g,this.minutes())
       .replace(/ss/g,this.seconds())
    },
    timestamp() {
        return this.date.getTime()
    }
}
//表驱动
const map = {
    year: 'FullYear',
    month: 'Month',
    day: 'Date',
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds',
    milliseconds: 'Milliseconds'
}

