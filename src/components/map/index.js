import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round',
}

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12,
}

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
})

const MapBox = () => {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      center={[4.8575, 52.328]}
    >
      <Layer type="line" lineLayout={lineLayout} linePaint={linePaint}>
        <Feature coordinates={[4.8575, 52.328]} />
      </Layer>
    </Map>
  )
}

export default MapBox
