const CanvasElement = document.querySelector('#board')

const CanvasSize = 600
CanvasElement.width = CanvasSize
CanvasElement.height = CanvasSize

const Canvas = CanvasElement.getContext('2d')
const CanvasCenter = {
    x: CanvasElement.width / 2,
    y: CanvasElement.height / 2
}

CanvasElement.style.border = '1px solid black'

let shipPos = { x: CanvasCenter.x, y: CanvasCenter.y }
let mousePos = { x: 0, y: 0 }

let shipSpeed = 0
let shipTopSpeed = 4

const shipMove = () => {
    if (shipPos.x < mousePos.x) shipPos.x += shipSpeed
    if (shipPos.x > mousePos.x) shipPos.x -= shipSpeed
    if (shipPos.y < mousePos.y) shipPos.y += shipSpeed
    if (shipPos.y > mousePos.y) shipPos.y -= shipSpeed
}

const DrawShip = () => {
    let shipW = 30
    let shipH = 40

    Canvas.beginPath()
    Canvas.moveTo(shipPos.x, shipPos.y)
    Canvas.lineTo(shipPos.x - (shipW / 2), shipPos.y + shipH)
    Canvas.lineTo(shipPos.x, shipPos.y + (shipH / 1.5))
    Canvas.lineTo(shipPos.x + (shipW / 2), shipPos.y + shipH)
    Canvas.lineTo(shipPos.x, shipPos.y)
    Canvas.stroke()
    Canvas.closePath()

    shipMove()
    shipSpeed = (Math.sqrt(
        Math.pow(shipPos.x - mousePos.x, 2) +
        Math.pow(shipPos.y - mousePos.y, 2)
    ) / CanvasSize) * shipTopSpeed
}

const Draw = () => {
    Canvas.clearRect(0, 0, CanvasElement.width, CanvasElement.height)
    DrawShip()
}

const redraw = setInterval(Draw, 10)
CanvasElement.addEventListener('mousemove', (event) => {
    mousePos.x = event.offsetX
    mousePos.y = event.offsetY
})