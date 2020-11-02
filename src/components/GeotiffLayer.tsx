import React from "react";
import * as Leaflet from "leaflet";
import { withLeaflet, MapLayer, MapLayerProps } from "react-leaflet";

import * as geotiff from "leaflet-geotiff/leaflet-geotiff";
import "leaflet-geotiff";
import "leaflet-geotiff/leaflet-geotiff-plotty";
import "leaflet-geotiff/leaflet-geotiff-vector-arrows";

export type GeotiffOptions = {
  arrowSize?: number;
  band?: number;
  image?: number;
  name?: string;
  pane?: string;
  rendererOptions: {
    opacity?: number;
    colorScale?: string;
    displayMin?: number;
    displayMax?: number;
  };
  renderer?: Leaflet.Renderer;
};

export type GeotiffProps = MapLayerProps & {
  url: string;
  options: GeotiffOptions;
  layerRef: React.RefObject<GeotiffLayer>;
};

export class GeotiffLayer extends MapLayer<GeotiffProps> {
  createLeafletElement(props: GeotiffProps) {
    const { url, options } = props;
    return geotiff.leafletGeotiff(url, options);
  }

  componentDidMount() {
    if (this.props.leaflet) {
      const { map } = this.props.leaflet;
      map?.addLayer(this.leafletElement);
    }
  }

  componentDidUpdate(prevProps: GeotiffProps) {
    const isSameLayer = this.props.url === prevProps.url;
    if (this.props.leaflet && !isSameLayer) {
      console.log(this.props, prevProps);
      const { map } = this.props.leaflet;
      map?.removeLayer(this.leafletElement);
      this.leafletElement = this.createLeafletElement(this.props);
      map?.addLayer(this.leafletElement);
    }
  }
}

export const PlottyGeotiffLayer = withLeaflet((props: GeotiffProps) => {
  const { options, layerRef } = props;
  options.renderer = new geotiff.LeafletGeotiff.Plotty(options.rendererOptions);
  return <GeotiffLayer ref={layerRef} {...props} />;
});

export const VectorGeotiffLayer = withLeaflet((props: GeotiffProps) => {
  const { options, layerRef } = props;

  options.renderer = new geotiff.LeafletGeotiff.VectorArrows(
    options.rendererOptions
  );
  return <GeotiffLayer ref={layerRef} {...props} />;
});
