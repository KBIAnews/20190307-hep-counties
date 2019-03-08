import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import React from "react";
import { GoogleSheetsContext } from "./GoogleSheetsContext";
import { scaleLinear } from "d3-scale";

export class HepChloropleth extends React.Component {
  constructor(props) {
    super(props);
    this.getCountyFillColor = this.getCountyFillColor.bind(this);
  }

  static contextType = GoogleSheetsContext;

  getCountyFillColor(countyName) {
    let data = this.context.rawSheetsData.data.rows.map(row => ({
      countyName: row.countyname,
      cases: parseInt(row.cases)
    }));

    let relevant = data.filter(row => {
      return row.countyName.includes(countyName);
    });
    if (relevant.length > 0) {
      let domain = [
        data.reduce((min, p) => (p.cases < min ? p.cases : min), data[0].cases),
        data.reduce((max, p) => (p.cases > max ? p.cases : max), data[0].cases)
      ];
      let scale = scaleLinear()
        .domain(domain)
        .range(["#e6a199", "#D8472B"]);
      let totalCountyCases = relevant.reduce(
        (total, row) => total + row.cases,
        0
      );
      return scale(totalCountyCases);
    }

    return "#fafafa";
  }

  render() {
    console.log(this.context.getLabel("headline"));

    return (
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
                          fill: this.getCountyFillColor(
                            geography.properties.NAME_2
                          ),
                          stroke: "#ddd",
                          strokeWidth: 1,
                          outline: "none"
                        },
                        hover: {
                          fill: "#fafafa",
                          stroke: "#ddd",
                          strokeWidth: 1,
                          outline: "none"
                        },
                        click: {
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
    );
  }
}
