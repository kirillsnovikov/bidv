// import { SOAPClientParameters } from "./lib/soapclient";
// import { SOAPClient } from "./lib/soapclient";
import { xml2js } from 'xml-js';
import style from './assets/scss/main.css';
// import { getCookie, random } from './helpers/helper';
// import { waterChart } from './lib/charts';

// waterChart(random(0, 100));

// let sessionID = getCookie('JSESSIONID')
//   ? sessionID
//   : '6igrejiq0pho3srrpamlq2q6eq4ln1c224aprl3lr1co9eu6';
console.log(style);
$('body').append($('<div/>', { class: style.test }));

var sr = `<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v12=\"urn://oracle.bi.webservices/v12\">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <v12:impersonate>\r\n         <v12:name>SoapUser</v12:name>\r\n         <v12:password>SoapUser1</v12:password>\r\n         <v12:impersonateID>test_DRPK</v12:impersonateID>\r\n      </v12:impersonate>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

// document.addEventListener('DOMContentLoaded', mappedParams);
// function mappedParams() {
//   var CUSTOM_VARIABLES = [
//     { col: 'zakr_date_format', value: '@{zakr_date_format}{null}' }
//     { col: "zakr_prev_date_format", value: "@{zakr_prev_date_format}{null}" },
//     { col: "var_zakr_ud", value: "@{var_zakr_ud}{null}" },
//     { col: "var_zakr_branch", value: "@{var_zakr_branch}{null}" },
//     { col: "var_zakr_ud_region", value: "@{var_zakr_ud_region}{null}" },
//     { col: "var_zakr_region", value: "@{var_zakr_region}{null}" },
//     { col: "var_zakr_tp", value: "@{var_zakr_tp}{null}" },
//     { col: "var_zakr_emp", value: "@{var_zakr_emp}{null}" }
//   ];

//   var mappedCUSTOM_VARIABLES = CUSTOM_VARIABLES.filter(function(item) {
//     return item.value !== 'null';
//   }).map(function(item) {
//     return [item.col, item.value];
//   });

//   console.log('mappedCUSTOM_VARIABLES', mappedCUSTOM_VARIABLES);
// }

// var data =
//   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v12="urn://oracle.bi.webservices/v12">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <v12:impersonate>\r\n         <v12:name>SoapUser</v12:name>\r\n         <v12:password>SoapUser1</v12:password>\r\n         <v12:impersonateID>test_DRPK</v12:impersonateID>\r\n      </v12:impersonate>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener('readystatechange', function() {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open(
//   'POST',
//   'http://bcvm693.tsc.ts:9502/analytics-ws/saw.dll?SoapImpl=nQSessionService'
// );
// xhr.setRequestHeader('content-type', 'application/xml');
// xhr.setRequestHeader('cache-control', 'no-cache');
// xhr.setRequestHeader('postman-token', '98f87140-ef56-88d2-3fb4-c6230b0009e0');

// xhr.send(data);

export function soap() {
  fetch(
    'http://bcvm693.tsc.ts:9502/analytics-ws/saw.dll?SoapImpl=nQSessionService',
    {
      body: sr,
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/xml',
        'cache-control': 'no-cache'
      }
    }
  )
    .then(res => res.text())
    .then(data => {
      let res = xml2js(data, { compact: true });
      console.log(res);
      // console.log(
      //   xml2js(
      //     res['soap:Envelope']['soap:Body']['sawsoap:executeSQLQueryResult'][
      //       'sawsoap:return'
      //     ]['sawsoap:rowset']._text,
      //     { compact: true }
      //   )
      // );
    });
}
