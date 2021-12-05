import * as THREE from '../../libs/three.js/r131/three.module.js'
//import { FontLoader } from '../../libs/jsm/loaders/FontLoader.js';
import { TransformControls } from '../../libs/three.js/r131/controls/TransformControls.js'
import { GLTFLoader } from '../../libs/three.js/r131/loaders/GLTFLoader.js';
import { FBXLoader } from '../../libs/three.js/r131/loaders/FBXLoader.js';
import { Game } from './common.js';
//import SpriteText from 'three-spritetext';


function loadGame() {
    const game = new Game();
    var isoList = []
    var dodList = []
    var tetList = []
    var polyList = []


    var circleList = []
    var squareList = []
    var diamondList = []
    var grades = 0
    var gradesReverse = 360
    var gradosNave = 1
    var isoDegrees = 30
    var offCenter = 0
    var offCenterDiamond = 0
    var offCenterSquare = 0
    var radioNave = 6.5
    var radioShot = 6.5
    var creciendoCirculo = true
    var creciendoSquare = true
    var creciendoDiamond = true
    const score = document.getElementById('score')
    const polyScore = document.getElementById('centerScore')
    var newScore = 0
    var newPolyScore = 4
    const lives = document.getElementById('vida')
    var newLives = 3
    const gameOVER = document.getElementById('title')


    var diamondDegrees = 75
    let nave = new THREE.Group()
    let naveCargada = false
    var coneList = []
    var disparando = false
    var trayectoriaBala
    const listener = new THREE.AudioListener()
    game.camera.add(listener)
    const disparoSonido = new THREE.Audio(listener)
    const colisionSonido = new THREE.Audio(listener)
    const naveSonido = new THREE.Audio(listener)
    const fondo = new THREE.Audio(listener)
    const colisionPoly = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()
    const phone = new THREE.Audio(listener)
    const menu = new THREE.Audio(listener)
    const finalScore = document.getElementById('finalScore')


    // nave fue atacada
    audioLoader.load('./assets/soundEffects/damage.wav', function (buffer) {
        naveSonido.setBuffer(buffer)
        naveSonido.setVolume(0.5)
        naveSonido.setLoop(false)
    })

    // sonido para poligonos

    audioLoader.load('./assets/soundEffects/polygon.wav', function (buffer) {
        colisionPoly.setBuffer(buffer)
        colisionPoly.setVolume(0.5)
        colisionPoly.setLoop(false)
    })
    audioLoader.load('./assets/soundEffects/fondoFINAL.wav', function (buffer) {
        fondo.setBuffer(buffer)
        fondo.setVolume(0.1)
        fondo.setLoop(true)
        fondo.play()
    })
    









    //

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function isocaedro(thing, cords) {
        let icoEdges, icoDrawable
        icoEdges = new THREE.EdgesGeometry(thing)
        icoDrawable = new THREE.LineSegments(icoEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        icoDrawable.position.set(cords[0], cords[1], cords[2])
        return icoDrawable
    }

    function CircleMaker(shape, cords, colorHex, scene) {
        let circle, edges
        edges = new THREE.EdgesGeometry(shape)
        circle = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: colorHex }))
        circle.position.set(cords[0], cords[1], cords[2])
        return circle
    }

    function Square(shape, cords, colorHex) {
        let square, edges
        edges = new THREE.EdgesGeometry(shape)
        square = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: colorHex }))
        square.position.set(cords[0], cords[1], cords[2])
        return square
    }

    function HexCenter(shape, cords, colorHex) {
        let hexCenter, edges
        edges = new THREE.BufferGeometry().setFromPoints(shape)
        hexCenter = new THREE.Line(edges, new THREE.LineBasicMaterial({ color: colorHex }))
        hexCenter.position.set(cords[0], cords[1], cords[2])
        return hexCenter

    }

    function disparo(cords) {
        let geometry, material, shot
        radioShot = radioNave
        geometry = new THREE.CircleGeometry(0.1, 32)
        material = new THREE.MeshBasicMaterial({ color: "0xffffff" })
        shot = new THREE.Mesh(geometry, material)
        shot.position.set(cords[0], cords[1], 0)
        return shot

    }



    game.init = function () {

        this.scene.background = new THREE.Color(0x0)

        this.light = new THREE.AmbientLight(0xffffff)
        this.scene.add(this.light)

        this.circleTest = new THREE.CircleGeometry(0.25, 32);
        this.square = new THREE.PlaneGeometry(0.5, 0.5);

        for (let i = 0; i < 2; i++) {
            circleList.push(CircleMaker(this.circleTest, [2, 0, 0], 0x63ff63))
        }

        for (let i = 0; i <= 3; i++) {
            squareList.push(Square(this.square, [-3, 2, 0], 0xff00ff))
        }

        //Duodecahedron power

        this.dodecahedron = new THREE.DodecahedronGeometry(.5)
        this.dodeEdges = new THREE.EdgesGeometry(this.dodecahedron)
        this.drawable = new THREE.LineSegments(this.dodecahedron, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.drawable.position.set(2, -3, 3.9)
        dodList.push(this.drawable)

        //Diamond Enemy
        //position constants and rotation
        const dX = -2
        const dY = 3
        const dZ = 0
        const rtZ = 1
        this.diamondEdges = new THREE.EdgesGeometry(this.square)
        this.diamondLine = new THREE.LineSegments(this.diamondEdges, new THREE.LineBasicMaterial({ color: 0xffc763 }))
        this.diamondLine2 = new THREE.LineSegments(this.diamondEdges, new THREE.LineBasicMaterial({ color: 0xffc763 }))


        for (let i = 0; i < 3; i++) {
            diamondList.push(Square(this.square, [dX + 3, dY, 0], 0xffc763))
        }

        // Diamond enemy END

        //Hexagono  Main Objective

        const A = [Math.cos(0 / (180 / Math.PI)), Math.sin(0 / (180 / Math.PI))]
        const B = [Math.cos(60 / (180 / Math.PI)), Math.sin(60 / (180 / Math.PI))]
        const C = [Math.cos(120 / (180 / Math.PI)), Math.sin(120 / (180 / Math.PI))]
        const D = [Math.cos(180 / (180 / Math.PI)), Math.sin(180 / (180 / Math.PI))]
        const E = [Math.cos(240 / (180 / Math.PI)), Math.sin(240 / (180 / Math.PI))]
        const F = [Math.cos(300 / (180 / Math.PI)), Math.sin(300 / (180 / Math.PI))]

        this.hexagon = new THREE.Path()
        this.hexagon.currentPoint
        //this.hexagon.moveTo(0,0)
        this.hexagon.moveTo(A[0], A[1])
        this.hexagon.lineTo(B[0], B[1])
        this.hexagon.lineTo(C[0], C[1])
        this.hexagon.lineTo(D[0], D[1])
        this.hexagon.lineTo(E[0], E[1])
        this.hexagon.lineTo(F[0], F[1])
        this.hexagon.lineTo(A[0], A[1])
        this.hexagon.lineTo(C[0], C[1])
        this.hexagon.lineTo(F[0], F[1])
        this.hexagon.lineTo(B[0], B[1])
        this.hexagon.lineTo(E[0], E[1])
        this.hexagon.lineTo(C[0], C[1])
        this.hexagon.lineTo(D[0], D[1])
        this.hexagon.lineTo(B[0], B[1])
        this.hexagon.lineTo(F[0], F[1])
        this.hexagon.lineTo(D[0], D[1])
        this.hexagon.lineTo(A[0], A[1])
        this.hexagon.lineTo(E[0], E[1])



        this.hexPoints = this.hexagon.getPoints();


        this.hexGeometry = new THREE.BufferGeometry().setFromPoints(this.hexPoints)
        //this.hexEdges = new THREE.EdgesGeometry(this.hexGeometry)
        this.hexDrawable = new THREE.Line(this.hexGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.hexDrawable.position.set(0, 0, 0)

        this.hexDraw2 = new THREE.Line(this.hexGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.hexDraw2.position.set(0, 0, 0)

        this.hexDraw3 = new THREE.Line(this.hexGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.hexDraw3.position.set(0, 0, 0)

        this.hexDraw4 = new THREE.Line(this.hexGeometry, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.hexDraw4.position.set(0, 0, 0)

        audioLoader.load('./js/disparo.wav', function (buffer) {
            disparoSonido.setBuffer(buffer);
            disparoSonido.setLoop(false);
            disparoSonido.setVolume(0.2)
        })

        audioLoader.load('./assets/soundEffects/hit.wav', function (buffer) {
            colisionSonido.setBuffer(buffer)
            colisionSonido.setLoop(false)
            colisionSonido.setVolume(0.5)
        })


        // Hexaogno END


        // model

        this.loader = new FBXLoader();


        this.loader.load('ship/Ship1.fbx', (object) => {
            object.scale.set(.05, .05, .1)
            object.position.set(6.5, 0, 0)

            object.rotation.z = 4.8

            object.traverse((child) => {
                if (child.isMesh) {
                    child.material.wireframe = true
                }
            })
            nave = object

            // nave.scale.set(.05, .05,.1)
            // nave.position.set(6.5, 0, 0)

            this.scene.add(object)

            document.addEventListener("keydown", onKeyDown, false)
            function onKeyDown(event) {

                var code = event.which
                if (code == 37) { // Left arrow
                    if (radioNave >= 3) {
                        radioNave -= 0.25
                        nave.position.x = radioNave * (Math.cos(gradosNave / (180 / Math.PI)))
                        nave.position.y = radioNave * (Math.sin(gradosNave / (180 / Math.PI)))

                    }

                } if (code == 39) { // Right arrow
                    if (radioNave < 7) {
                        radioNave += 0.25
                        nave.position.x += 0.25
                        nave.position.x = radioNave * (Math.cos(gradosNave / (180 / Math.PI)))
                        nave.position.y = radioNave * (Math.sin(gradosNave / (180 / Math.PI)))

                    }

                } if (code == 32) { // Spacebar (fire)++
                    if(!(newLives > 0 ^ newPolyScore > 0)){
                        if (coneList.length < 1) {
                        disparoSonido.play()
                        let shot
                        shot = disparo([nave.position.x, nave.position.y])
                        disparando = true
                        coneList.push(shot)
                    }
                    }
                    
                } if (code == 40) { // Arrow Down
                    //Queremos reducir los grados; la camara gira counter-clockwise.
                    // x = cx + r * cos(a)
                    // grados * (Math.PI / 180)
                    // y = cy + r * sin(a)
                    gradosNave += 2.275
                    nave.position.x = radioNave * (Math.cos(gradosNave / (180 / Math.PI)))
                    nave.position.y = radioNave * (Math.sin(gradosNave / (180 / Math.PI)))

                    nave.rotation.z += 0.04
                    game.camera.rotation.z += 0.04


                } if (code == 38) { // Arrow Up
                    //Queremos aumentar los grados; la camara gira clockwise.
                    game.camera.rotation.z -= 0.04
                    gradosNave -= 2.275

                    nave.position.x = radioNave * (Math.cos(gradosNave / (180 / Math.PI)))
                    nave.position.y = radioNave * (Math.sin(gradosNave / (180 / Math.PI)))
                    nave.rotation.z -= 0.04

                }
                if (gradosNave < 0) {
                    gradosNave = 360
                } if (gradosNave > 360) {
                    gradosNave = 0
                }

            }
            naveCargada = true
        });

        if (naveCargada) {
            this.scene.add(nave)

        }


        //Octahedron power

        this.octahedron = new THREE.OctahedronGeometry(.5)
        this.polyEdges = new THREE.EdgesGeometry(this.octahedron)
        this.polyDrawable = new THREE.LineSegments(this.polyEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.polyDrawable.position.set(2, -1, 3.9)
        polyList.push(this.polyDrawable)


        //Icosaedro


        this.icosaedro = new THREE.IcosahedronGeometry(.5)
        // this.icoEdges = new THREE.EdgesGeometry(this.icosaedro)
        // this.icoDrawable = new THREE.LineSegments(this.icoEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        // this.icoDrawable.position.set(3.8, -1, 3.9)

        isoList.push(isocaedro(this.icosaedro, [1.8, -1, 3.9]))

        //isocaedro(this.scene, this.icosaedro, [3.8, -1, 3.9])

        //Tetrahedron

        this.tetraedro = new THREE.TetrahedronGeometry(.5)
        this.tetraEdges = new THREE.EdgesGeometry(this.tetraedro)
        this.tetDrawable = new THREE.LineSegments(this.tetraEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.tetDrawable.position.set(3.8, -3, 3.9)
        tetList.push(this.tetDrawable)

        dodList.forEach(dod => {
            this.scene.add(dod)
        });

        polyList.forEach(poly => {
            this.scene.add(poly)
        });

        tetList.forEach(tet => {
            this.scene.add(tet)
        });

        isoList.forEach(ico => {
            this.scene.add(ico)
        });

        circleList.forEach(circle => {
            this.scene.add(circle)
        })

        squareList.forEach(square => [
            this.scene.add(square)
        ])

        // diamond is unbreackable
        diamondList.forEach(diamond => {
            diamond.rotation.z = rtZ
            this.scene.add(diamond)

        })





        // var spriteText = new THREE.SpriteText({ text: 'Hello world!' });



        this.scene.add(this.hexDrawable)
        this.scene.add(this.hexDraw2)
        this.scene.add(this.hexDraw3)
        this.scene.add(this.hexDraw4)

    };


    game.update = function (delta) {

        //-------------------- WIN STATE

        if (newPolyScore == 0) {
            nave.position.x = -100
            fondo.stop()
            audioLoader.load('./assets/soundEffects/menu.wav', function(buffer){
                menu.setBuffer(buffer)
                menu.setVolume(0.1)
                menu.setLoop(true)
                menu.play()
            })
            gameOVER.innerHTML = 'YOU WIN'
            finalScore.innerHTML = 'Final Score: ' + newScore

        }

        //---------------------LOSE STATE

        if (newLives <= 0) {
            //console.log('BRUH')
            nave.position.x = -100
            game.scene.remove(nave)
            fondo.stop()
            audioLoader.load('./assets/soundEffects/creepyPhone.wav', function (buffer) {
                phone.setBuffer(buffer)
                phone.setVolume(0.5)
                phone.setLoop(true)
                phone.play()

            })
            gameOVER.innerHTML = "GAME OVER"
            finalScore.innerHTML = 'Final Score: ' + newScore

            
        }




        //---------------------HEX CENTER PIECE
        this.hexDrawable.rotation.x -= (Math.PI / 3) * delta
        this.hexDrawable.rotation.y += (Math.PI / 3) * delta
        this.hexDrawable.rotation.z += (Math.PI / 3) * delta

        this.hexDraw2.rotation.x += (Math.PI / 76) * delta
        this.hexDraw2.rotation.y -= (Math.PI / 3) * delta
        this.hexDraw2.rotation.z -= (Math.PI / 3) * delta

        //HEX3 ES LA FIGURA ESTATICA DE BASE

        this.hexDraw4.rotation.x += (Math.PI / 76) * delta
        this.hexDraw4.rotation.y += (Math.PI / 2) * delta
        this.hexDraw4.rotation.z -= (Math.PI / 3) * delta






        if (coneList.length > 0) {
            coneList.forEach(shot => {
                this.scene.add(shot)

            })
        }
        //-------------------------------------SHOT---------------------------
        coneList.forEach((shot) => {
            // nave.position.x = radio * (Math.cos(gradosNave / (180 / Math.PI)))
            // nave.position.y = radio * (Math.sin(gradosNave / (180 / Math.PI)))
            // nave.rotation.z -=0.04
            radioShot -= 0.2
            shot.position.x = (radioShot) * (Math.cos(gradosNave / (180 / Math.PI)))
            shot.position.y = (radioShot) * (Math.sin(gradosNave / (180 / Math.PI)))


            //shot.position.x -= 0.2

            trayectoriaBala = shot.position.x
            if (radioShot <= 0.5) {
                coneList.pop()
                game.scene.remove(shot)
                disparando = false
            }
        })
        /*coneList.forEach((shot)=>{
            this.scene.add(shot)
        })*/
        //-----------------------POLYGONS----------------------------------

        dodList.forEach(drawable => {
            drawable.rotation.x -= (Math.PI / 3) * delta
            drawable.rotation.y += (Math.PI / 3) * delta
            drawable.rotation.z += (Math.PI / 3) * delta
            drawable.position.set(((offCenter + 3) * (Math.cos(gradesReverse / (180 / Math.PI)))),
                ((offCenter - 2) * (Math.sin(gradesReverse / (180 / Math.PI)))),
                0)

            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((drawable.position.x + .5 > balaX && drawable.position.x - .5 < balaX) &&
                    (drawable.position.y - .5 < balaY && drawable.position.y + .5 > balaY)) {
                    colisionPoly.play()
                    newPolyScore -= 1
                    polyScore.innerHTML = newPolyScore

                    for (let i = 0; i < dodList.length; i++) {
                        dodList.pop()
                        game.scene.remove(drawable)
                    }

                    console.log("LE DI A ALGUN POLYGONO SPONGO...")





                }
            }

        })


        polyList.forEach(poly => {
            poly.rotation.x -= (Math.PI / 3) * delta
            poly.rotation.y -= (Math.PI / 3) * delta
            poly.rotation.z += (Math.PI / 3) * delta
            poly.position.set((((offCenter - 1) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(grades / (180 / Math.PI)))),
                ((offCenter + 4) * (Math.sin(isoDegrees / (180 / Math.PI)))),
                0)
            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((poly.position.x + .5 > balaX && poly.position.x - .5 < balaX) &&
                    (poly.position.y - .5 < balaY && poly.position.y + .5 > balaY)) {
                    colisionPoly.play()
                    newPolyScore -= 1
                    polyScore.innerHTML = newPolyScore

                    for (let i = 0; i < polyList.length; i++) {
                        polyList.pop()
                        game.scene.remove(poly)
                    }




                }
            }
        })




        isoList.forEach(iso => {
            iso.rotation.x += (Math.PI / 3) * delta
            iso.rotation.y += (Math.PI / 3) * delta
            iso.rotation.z -= (Math.PI / 3) * delta
            iso.position.set((((offCenter + 2) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(isoDegrees / (180 / Math.PI)))),
                ((offCenter + 2) * (Math.sin(isoDegrees / (180 / Math.PI)))),
                0)

            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((isoList[0].position.x + .5 > balaX && isoList[0].position.x - .5 < balaX) &&
                    (isoList[0].position.y - .5 < balaY && isoList[0].position.y + .5 > balaY)) {
                    colisionPoly.play()
                    newPolyScore -= 1
                    polyScore.innerHTML = newPolyScore

                    for (let i = 0; i < isoList.length; i++) {
                        isoList.pop()
                        game.scene.remove(iso)
                    }


                }
            }
        });



        tetList.forEach(tet => {
            tet.rotation.x -= (Math.PI / 3) * delta
            tet.rotation.y += (Math.PI / 3) * delta
            tet.rotation.z -= (Math.PI / 3) * delta
            tet.position.set(offCenter + ((1) * (Math.cos(isoDegrees / (180 / Math.PI)))),
                offCenter + ((1) * (Math.sin(isoDegrees / (180 / Math.PI)))),
                0)

            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((tet.position.x + .5 > balaX && tet.position.x - .5 < balaX) &&
                    (tet.position.y - .5 < balaY && tet.position.y + .5 > balaY)) {
                    colisionPoly.play()
                    newPolyScore -= 1
                    polyScore.innerHTML = newPolyScore

                    for (let i = 0; i < tetList.length; i++) {
                        tetList.pop()
                        game.scene.remove(tet)
                    }

                    console.log("LE DI AL ISO")

                    // for (let i = 0; i < 2; i++) {
                    //     game.scene.remove(circleList[i])
                    // }

                    // circleList.splice(index, 2)


                    // //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    // for (let i = 0; i < 2; i++) {
                    //     circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))


                    // }
                    // circleList.forEach(circle => this.scene.add(circle))





                }
            }


        })






        var circlePosFlag = []
        circleList.forEach((circle, index) => {
            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((circle.position.x + .25 > balaX && circle.position.x - .25 < balaX) &&
                    (circle.position.y - .25 < balaY && circle.position.y + .25 > balaY)) {
                    colisionSonido.play()
                    newScore += 250
                    score.innerHTML = newScore

                    for (let i = 0; i < 2; i++) {
                        game.scene.remove(circleList[i])
                    }
                    circleList.splice(index, 2)


                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i < 2; i++) {
                        circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))


                    }
                    circleList.forEach(circle => this.scene.add(circle))

                    offCenter = 0
                    grades = getRandomArbitrary(0, 360)



                }
            }
            if (naveCargada) {
                var naveX = nave.position.x
                var naveY = nave.position.y
                if ((naveX + 1 > circle.position.x + .25 && naveX - 1 < circle.position.x - .25) &&
                    (naveY - .375 < circle.position.y - .25 && naveY + .375 > circle.position.y)) {
                    naveSonido.play()

                    newLives -= 1
                    lives.innerHTML = newLives

                    for (let i = 0; i < 2; i++) {
                        game.scene.remove(circleList[i])
                    }
                    circleList.splice(index, 2)


                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i < 2; i++) {
                        circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))


                    }
                    circleList.forEach(circle => this.scene.add(circle))

                    offCenter = 0
                    grades = getRandomArbitrary(0, 360)
                }
            }




            var randomNum = Math.random()
            circle.rotation.x += (Math.PI / 2 * randomNum) * delta;
            circle.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            circle.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            circle.position.y = (offCenter + 2) * (Math.sin(grades / (180 / Math.PI)))
            circle.position.x = (offCenter + 2) * (Math.cos(grades / (180 / Math.PI)))
            if (circle.position.x > 8.5 || circle.position.x < -8.5
                || circle.position.y > 8.5 || circle.position.y < -8.5) {
                for (let i = 0; i < 2; i++) {
                    game.scene.remove(circleList[i])
                }
                circleList.splice(index, 2)

                //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                for (let i = 0; i < 2; i++) {
                    circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))


                }
                circleList.forEach(circle => this.scene.add(circle))

                offCenter = 0

            }


        })




        //---------------------------------------------------DIAMOND--------------------------------        
        diamondList.forEach((diamond, index) => {
            var randomNum = Math.random()
            diamond.rotation.x += (Math.PI / 2 * randomNum) * delta;
            diamond.rotation.y -= (Math.PI / (2 * randomNum)) * delta;



            diamond.position.set(
                ((offCenterDiamond + 3) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(diamondDegrees / (180 / Math.PI))),
                ((offCenterDiamond + 3) + ((Math.sin(grades / (180 / Math.PI))))) * (Math.sin(diamondDegrees / (180 / Math.PI))),
                0)
            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((diamond.position.x + .25 > trayectoriaBala && diamond.position.x - .25 < trayectoriaBala) &&
                    (diamond.position.y - .25 < balaY && diamond.position.y + .25 > balaY)) {
                    colisionSonido.play()
                    newScore += 500
                    score.innerHTML = newScore

                    for (let i = 0; i < diamondList.length; i++) {
                        game.scene.remove(diamondList[i])
                    }
                    diamondList.splice(0, 4)

                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i <= 3; i++) {
                        diamondList.push(Square(this.square, [0, 0, 0], 0xffc763))


                    }
                    diamondList.forEach(diamond => {

                        diamond.rotation.z = 1
                        this.scene.add(diamond)
                    }
                    )
                    offCenterDiamond = 0
                    grades = getRandomArbitrary(0, 360)

                }
            }

            if (naveCargada) {
                var naveX = nave.position.x
                var naveY = nave.position.y

                if ((naveX + 1 > diamond.position.x + .25 && naveX - 1 < diamond.position.x - .25) &&
                    (naveY - .375 < diamond.position.y - .25 && naveY + .375 > diamond.position.y)) {
                    naveSonido.play()
                    newLives -= 1
                    lives.innerHTML = newLives


                    for (let i = 0; i < diamondList.length; i++) {
                        game.scene.remove(diamondList[i])
                    }
                    diamondList.splice(0, 4)

                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i <= 3; i++) {
                        diamondList.push(Square(this.square, [0, 0, 0], 0xffc763))


                    }
                    diamondList.forEach(diamond => {

                        diamond.rotation.z = 1
                        this.scene.add(diamond)
                    }
                    )
                    offCenterDiamond = 0
                    grades = getRandomArbitrary(0, 360)


                }


            }
        })
        //                         ((offCenter + 2) * (Math.cos(gradesReverse / (180 / Math.PI)))), 
        //                         ((offCenter + 2) * (Math.sin(gradesReverse / (180 / Math.PI)))),
        //                          0)
        //

        //-----------------------SQUARE-------------------------------------
        squareList.forEach((square, index) => {
            var randomNum = Math.random()
            square.rotation.x += (Math.PI / 2 * randomNum) * delta;
            square.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            square.position.set(((offCenterSquare - 3) * (Math.cos(gradesReverse / (180 / Math.PI)))), ((offCenterSquare + 2) * (Math.sin(gradesReverse / (180 / Math.PI)))), 0)

            if (disparando) {
                let bala = coneList[0]
                var balaX = bala.position.x - 0.25
                let balaY = bala.position.y

                //impacto
                if ((square.position.x + .25 > trayectoriaBala && square.position.x - .25 < trayectoriaBala) &&
                    (square.position.y - .25 < balaY && square.position.y + .25 > balaY)) {
                    colisionSonido.play()
                    newScore += 1000
                    score.innerHTML = newScore

                    for (let i = 0; i <= 3; i++) {
                        game.scene.remove(squareList[i])
                    }
                    squareList.splice(0, 4)

                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i <= 3; i++) {
                        squareList.push(Square(this.square, [0, 0, 0], 0xff00ff))


                    }
                    squareList.forEach(square => this.scene.add(square))

                    offCenterSquare = 0
                    gradesReverse = getRandomArbitrary(0, 360)

                }
            }

            if (naveCargada) {
                var naveX = nave.position.x
                var naveY = nave.position.y

                if ((naveX + 1 > square.position.x + .25 && naveX - 1 < square.position.x - .25) &&
                    (naveY - .375 < square.position.y - .25 && naveY + .375 > square.position.y)) {
                    naveSonido.play()
                    newLives -= 1
                    lives.innerHTML = newLives


                    for (let i = 0; i <= 3; i++) {
                        game.scene.remove(squareList[i])
                    }
                    squareList.splice(0, 4)

                    //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                    for (let i = 0; i <= 3; i++) {
                        squareList.push(Square(this.square, [0, 0, 0], 0xff00ff))


                    }
                    squareList.forEach(square => this.scene.add(square))

                    offCenterSquare = 0
                    gradesReverse = getRandomArbitrary(0, 360)


                }


            }
        })





        // this.icoDrawable.rotation.x += (Math.PI / 3) * delta
        // this.icoDrawable.rotation.y += (Math.PI / 3) * delta
        // this.icoDrawable.rotation.z -= (Math.PI / 3) * delta



        grades += 1.8;
        isoDegrees += 0.5
        gradesReverse -= 1.8
        diamondDegrees += 1.8

        if (grades >= 360) {
            grades = 0
        }


        if (isoDegrees >= 360) {
            isoDegrees = 0
        }

        if (gradesReverse <= 0) {
            gradesReverse = 360
        }

        if (diamondDegrees >= 360) {
            diamondDegrees = 0
        }

        if (offCenterDiamond >= 5) {
            creciendoDiamond = false
        } if (offCenterDiamond <= 2) {
            creciendoDiamond = true
        } if (creciendoDiamond) {
            offCenterDiamond += 0.004
        } if (!creciendoDiamond) {
            offCenterDiamond -= 0.004
        }


        if (offCenter >= 5.5) {
            creciendoCirculo = false
        } if (offCenter <= 2) {
            creciendoCirculo = true
        } if (creciendoCirculo) {
            offCenter += 0.004
        } if (!creciendoCirculo) {
            offCenter -= 0.004
        }


        if (offCenterSquare >= 6) {
            creciendoSquare = false
        } if (offCenterSquare <= 2) {
            creciendoSquare = true
        } if (creciendoSquare) {
            offCenterSquare += 0.004
        } if (!creciendoSquare) {
            offCenterSquare -= 0.004
        }



    };





    game.init();
    game.tick();
    


}

window.onload = function () {
    loadGame();
};
