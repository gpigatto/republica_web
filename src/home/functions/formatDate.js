export function formatDate(date){
  var day  = date.getDate().toString();
  var dayF = (day.length === 1) ? '0' + day : day;
  
  var month  = (date.getMonth() + 1).toString();
  var monthF = (month.length === 1) ? '0' + month : month;
  
  var yearF = date.getFullYear();
  
  return dayF + "/" + monthF + "/" + yearF;
}