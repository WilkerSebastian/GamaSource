import GamaSource from "../../GamaSource"
import atomic from "./img64/atomic"
import source from "./img64/source"

export default () => {

    const loader =  document.createElement("div")

    loader.style.position = "absolute"
    loader.style.backgroundColor = "#0D1117"
    loader.style.top = "0"
    loader.style.bottom = "0"
    loader.style.left = "0"
    loader.style.right = "0"
    loader.style.display = "flex"
    loader.style.flexDirection = "column"
    loader.style.justifyContent = "center"

    loader.innerHTML = `

        <img id="logo-game" style="height:40vh;margin:auto;margin-bottom:0;margin-top:10vh;" src="${atomic}">

        <img id="text-game" style="width:50vw;height:10vh;margin:auto;margin-top:2.5vh;" src="${source}">

        <div style="width:50vw;height:10vh;margin:auto;margin-top:2.5vh;background-color:gray;">
        
            <div id="bar-game" style="height:100%;width:0%;background-color:purple;"><div>

        </div>

    `
    document.body.append(loader)

    let degress = 0

    const rotate = () => {

        degress++

        const img = document.querySelector<HTMLImageElement>("#logo-game") as HTMLImageElement
        img.style.transform = `rotate(${degress}deg)`

        if(degress >= 360) 
            degress = 0

    }

    const id = setInterval(() => {

        const bar = document.querySelector<HTMLDivElement>("#bar-game") as HTMLDivElement
        
        bar.style.width = `${(GamaSource.LOAD * 100) / GamaSource.ASSETS.size}%`

        if(GamaSource.ASSETS.size == GamaSource.LOAD) {
 
            loader.style.display = "none"
            clearInterval(id)

        } else {
            
            rotate()

        }

    }, 32)

}