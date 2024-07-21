import { useEffect, useState } from "react"
import { Actions } from "../../actions/actions"
import { AddPhotos } from "./addphotos"
import { ShowPhotos } from "./showphotos"

export const Gallery = () => {
    const [data, setData] = useState([])
    const Teamcodes = async () => {
        await Actions.TeamsCodes()
            .then((res) => setData(res?.data))
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        Teamcodes()
    }, [])

    return (
        <>
            <AddPhotos teams={data} />
            <ShowPhotos teams={data}/>
        </>
    )
}