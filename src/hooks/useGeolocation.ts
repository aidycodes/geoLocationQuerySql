import { useEffect, useState } from "react"

interface LocationData {
    lat: number,
    lng: number
}

export const useGeolocation = () => {
   const [location, setLocation] = useState<LocationData | null>(null)
    useEffect(() => {
        if (navigator.geolocation) {
        const watch = navigator.geolocation.watchPosition(position => {
                //console.log(position)
                setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
            }, (error) => {
                console.log({error, message: 'geolocation error'})
                setLocation({lat: 51.5074, lng: 0.1278})
            },{enableHighAccuracy: true, timeout: 50000, maximumAge: 5000}
            )
            return () => {
                navigator.geolocation.clearWatch(watch)
            }
        }
    }, [])

    return location
}