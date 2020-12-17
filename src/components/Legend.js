import {MapControl, MapControlProps, withLeaflet} from "react-leaflet";
import L, {Control} from "leaflet";

class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    // get color depending on population density value
    const getColor = (d, i) => {
      if (d === '0') return '#FFF';
      if (d === '\u2160') return '#66D060';
      if (d === '\u2161') return i === 3 ? '#8B4513' : '#E9EA6F';
      if (d === '\u2162') return '#C4B2A2';
      // if (d === '\u2163') return '#800026';
    };

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = ['0', '\u2160', '\u2161', '\u2161', '\u2162'];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
          getColor(from, i) +
          '"></i> ' +
          from +
          (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const map = this.props.leaflet?.map;
    map && legend.addTo(map);
  }
}

export default withLeaflet(Legend);
