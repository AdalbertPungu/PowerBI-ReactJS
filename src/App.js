import React from "react";
import './App.css';
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function App() {
  return (
    <section className="App">
      <h1>Constoso Sales Manager Power BI (Business Intelligence)</h1>
      <section id="bi-report">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Since we are reporting a BI report, set the type to report
            id: "<Report Id>", // Add the report Id here
            embedUrl: "<Embed Url>", // Add the embed url here
            accessToken: "<Access Token>", // Add the access token here
            tokenType: models.TokenType.Aad, // Since we are using an Azure Active Directory access token, set the token type to Aad
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
              ["visualClicked", () => console.log("visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName={"bi-embedded"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport; // save report in window object
          }}
        />
      </section>
    </section>
  );
}

export default App;
