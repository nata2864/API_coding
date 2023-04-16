export function getFormattedDate() {
    let myDate = new Date();
    let year = myDate.getFullYear().toString().slice(-2);
    let month = (myDate.getMonth() + 1);
    let day = myDate.getDate();
  
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();
  
  
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
  
    let fullDate = day + "." + month + "." + year + " " + hour + ":" + minute;
    return fullDate;
  }
  
  let myFormattedDate = getFormattedDate();
