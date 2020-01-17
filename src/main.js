// import { SOAPClientParameters } from "./lib/soapclient";
// import { SOAPClient } from "./lib/soapclient";
import { xml2js } from "xml-js";
import { getCookie, random } from "./helpers/helper";
import { waterChart } from "./lib/charts";

waterChart(random(0, 100));

let sessionID = getCookie("JSESSIONID")
  ? sessionID
  : "jm3q7g1et77mlon7b5740ih2ie8pmsqm5kbl1ikg4s9vied7";
var sr = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v12="urn://oracle.bi.webservices/v12">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <v12:executeSQLQuery>\r\n         <v12:sql>SELECT\r\n   0 s_0,\r\n   "DRSK_KPI"."Organization.Compare Block"."РОО" s_1,\r\n   "DRSK_KPI"."Organization.Compare Block"."Количество сотрудников" s_2\r\nFROM "DRSK_KPI"\r\nWHERE\r\n("Calendar"."Отчетная дата REP78 для сравнения" = date \'2019-11-30\')\r\nORDER BY 2 ASC NULLS LAST\r\nFETCH FIRST 65001 ROWS ONLY</v12:sql>\r\n         <v12:outputFormat>SAWRowsetSchemaAndData</v12:outputFormat>\r\n         <v12:executionOptions>\r\n            <v12:async>false</v12:async>\r\n            <v12:maxRowsPerPage>500</v12:maxRowsPerPage>\r\n            <v12:refresh>true</v12:refresh>\r\n            <v12:presentationInfo>false</v12:presentationInfo>\r\n            <v12:type></v12:type>\r\n         </v12:executionOptions>\r\n         <v12:sessionID>${sessionID}</v12:sessionID>\r\n      </v12:executeSQLQuery>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`;

export function soap() {
  fetch(
    "http://bcvm693.tsc.ts:9502/analytics-ws/saw.dll?SoapImpl=xmlViewService",
    {
      body: sr,
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/xml",
        "cache-control": "no-cache"
      }
    }
  )
    .then(res => res.text())
    .then(data => {
      let res = xml2js(data, { compact: true });
      console.log(
        xml2js(
          res["soap:Envelope"]["soap:Body"]["sawsoap:executeSQLQueryResult"][
            "sawsoap:return"
          ]["sawsoap:rowset"]._text,
          { compact: true }
        )
      );
    });
}
