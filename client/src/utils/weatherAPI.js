// get date and time data 
export const getTime = () => {

    let time = new Date();

    function DateData (time, month, date, day, hour, min) {
        this.time = time;
        this.month = month;
        this.date = date;
        this.day = day;
        this.hour = hour;
        this.min = min;
    };

    let timeData = new DateData(
        time,
        time.getMonth(),
        time.getDate(),
        time.getDay(),
        time.getHours(),
        time.getMinutes()
    );

    return timeData;

};
