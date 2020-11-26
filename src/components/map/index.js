import React, { useEffect } from 'react'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapboxGl, { Source } from 'react-mapbox-gl'

const url = 'https://4b07b86e66fb.ngrok.io/'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
})

const RASTER_SOURCE_OPTIONS = {
  type: 'geojson',
  data: url,
  // cluster: true,
  // clusterMaxZoom: 14, // Max zoom to cluster points on
  // clusterRadius: 50,
}

const load = (map) => {
  map.addLayer({
    id: 'population',
    type: 'circle',
    source: 'data',
    paint: {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        base: 1.75,
        stops: [
          [12, 2],
          [22, 180],
        ],
      },
      // color circles by ethnicity, using a match expression
      // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
      'circle-color': [
        'match',
        ['get', 'clusterid'],
        -1,
        '#FF0000',
        0,
        '#FF7F00',
        1,
        '#FFFF00',
        2,
        '#00FF00',
        3,
        '#0000FF',
        4,
        '#2E2B5F',
        /* other */ '#8B00FF',
      ],
    },
  })

  window.setInterval(async () => {
    const result = await axios.get(url)
    if (result.status === 200) {
      const json = result.data
      map.getSource('data').setData(json)
    }
  }, 2000)
}

const MapBox = () => {
  return (
    <Map
      style="mapbox://styles/mapbox/light-v10"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      center={[-87.6451618298, 41.7941646462]}
      zoom={[12]}
      onStyleLoad={(map, _) => load(map)}
    >
      <Source id="data" geoJsonSource={RASTER_SOURCE_OPTIONS} />
    </Map>
  )
}

export default MapBox
