export default {
    makeId,
    dateToDay,
    formatDate
}

function makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function dateToDay(date) {

  switch (new Date(date).getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
       return  "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default: 
      return "";
  }

}

function formatDate(date) {
  const day = new Date(date).getDate()
  const month = new Date(date).getMonth()+1
  return day +'/'+month
}