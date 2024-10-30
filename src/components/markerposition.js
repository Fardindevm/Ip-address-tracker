import React, {useEffect} from "react"
import { Marker, Popup, useMap} from "react-leaflet"
import Icon from '../components/Icon'

export default function MarkerPosition ({address}) {
  // eslint-disable-next-line
  const position = [address.location.lat, address.location.lng]
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true
    })
  }, [map, position])

  return (
  <>
  <Marker icon={Icon} position={position}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  </>
  )
}