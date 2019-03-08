import React, { Component } from "react";
import { HepChloropleth } from "./components/map";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./components/GoogleSheetsContext";
import GoogleSheetsFetcher from "./components/GoogleSheetsFetcher";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleSheetsContextProvider>
          <GoogleSheetsFetcher
            sheetURL={
              "https://docs.google.com/spreadsheets/d/1ICqV9QxH114EOWT_obc8tYzzm2h0sA2EmxPuGkSAGFk/"
            }
          />
          <GoogleSheetsContextConsumer>
            {context =>
              !context.pageMustSuspend && (
                <>
                  <h1>The Headline For This Locator Map</h1>
                  <h2>
                    <strong>
                      <a href="https://github.com/nprapps/dailygraphics#creating-locator-maps">
                        Configure this map for your project.
                      </a>
                    </strong>{" "}
                    Meanwhile, this is default text in the copytext spreadsheet
                    for this graphic.{" "}
                    <a href="https://docs.google.com/spreadsheets/d/1ICqV9QxH114EOWT_obc8tYzzm2h0sA2EmxPuGkSAGFk/edit">
                      Edit this spreadsheet
                    </a>{" "}
                    (created when you added the graphic) to update the data and
                    text. Delete any rows you don&#8217;t need, and add others
                    as needed. Don&#8217;t forget to{" "}
                    <code>fab update_copy:hep-a-cases-20190306</code> to update
                    the text or visit{" "}
                    <a
                      href="http://127.0.0.1:8000/graphics/hep-a-cases-20190306/?refresh=1"
                      target="_top"
                    >
                      <code>
                        http://127.0.0.1:8000/graphics/hep-a-cases-20190306/?refresh=1
                      </code>
                    </a>{" "}
                    to refresh the data every time you reload the page!
                  </h2>

                  <div id="locator-map" className="graphic">
                    <HepChloropleth />
                  </div>

                  <div className="footer">
                    <p>Credit: Nathan Lawrence / KBIA</p>
                    <p>
                      Data Source: Missouri Department of Health and Senior
                      Services
                    </p>
                  </div>
                </>
              )
            }
          </GoogleSheetsContextConsumer>
        </GoogleSheetsContextProvider>
      </div>
    );
  }
}

export default App;
