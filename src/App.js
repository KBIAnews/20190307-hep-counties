import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>The Headline For This Locator Map</h1>
        <h2>
          <strong>
            <a
              href="https://github.com/nprapps/dailygraphics#creating-locator-maps"
              target="_blank"
            >
              Configure this map for your project.
            </a>
          </strong>{" "}
          Meanwhile, this is default text in the copytext spreadsheet for this
          graphic.{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1ICqV9QxH114EOWT_obc8tYzzm2h0sA2EmxPuGkSAGFk/edit"
            target="_blank"
          >
            Edit this spreadsheet
          </a>{" "}
          (created when you added the graphic) to update the data and text.
          Delete any rows you don&#8217;t need, and add others as needed.
          Don&#8217;t forget to{" "}
          <code>fab update_copy:hep-a-cases-20190306</code> to update the text
          or visit{" "}
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
          <ComposableMap
            // projection={"mercator"}
            projectionConfig={{
              scale: 4500,
              rotation: [10, 0, 0],
              xOffset: 2625,
              yOffset: 660
            }}
            width={720}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#fff"
            }}
          >
            <ZoomableGroup center={[0, 20]} disablePanning>
              <Geographies geography="https://s3.amazonaws.com/apps.kbia.org/js/gadm36_USA_2.json">
                {(geographies, projection) =>
                  geographies.map(
                    (geography, i) =>
                      geography.id !== "ATA" && (
                        <Geography
                          key={i}
                          geography={geography}
                          projection={projection}
                          style={{
                            default: {
                              fill: "#fafafa",
                              stroke: "#ddd",
                              strokeWidth: 1,
                              outline: "none"
                            }
                          }}
                        />
                      )
                  )
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div className="footer">
          <p>Credit: Nathan Lawrence / KBIA</p>
          <p>Data Source: Missouri Department of Health and Senior Services</p>
        </div>
      </div>
    );
  }
}

export default App;
