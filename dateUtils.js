/**
 * utils/dateUtils.js
 *
 * @nikpoklitar
 */

   exports.getNiceDate = function () {
     var d = new Date();

     var month = d.getMonth()+1;
     var day = d.getDate();

     return output = d.getFullYear() + '_' +
       (month<10 ? '0' : '') + month + '_' +
       (day<10 ? '0' : '') + day;
   };

exports.getDateString = function () {
  var d = new Date();
  return (d.getMonth()+1) + '/'+ d.getDate() + '/' + String(d.getFullYear()).substring(2,4)
      + '-' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds(); 
};
