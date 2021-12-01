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
    var circleList = []
    var squareList = []
    var diamondList = []
    var grades = 0
    var gradesReverse = 360
    var isoDegrees = 30
    var offCenter = 0
    var diamondDegrees = 75
    let nave = new THREE.Group()
    let naveCargada = false
    var coneList = []
    var disparando = false

    //

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
        let geometry, material, cone
        geometry = new THREE.ConeGeometry(0.1, 0.5, 32)
        material = new THREE.MeshBasicMaterial({ color: "0xffffff" })
        cone = new THREE.Mesh(geometry, material)
        cone.rotation.z = 1.65
        cone.position.set(cords[0], cords[1], 0)
        return cone

    }



    game.init = function () {
        this.scene.background = new THREE.Color(0x0)

        this.light = new THREE.AmbientLight(0xffffff)
        this.scene.add(this.light)

        //Circle enemy
        //var circle = crearCirculo(this.scene)
        this.circleTest = new THREE.CircleGeometry(0.25, 32);
        this.square = new THREE.PlaneGeometry(0.5, 0.5);

        for (let i = 0; i < 2; i++) {
            circleList.push(CircleMaker(this.circleTest, [-2 + 1, 2 + i, 0], 0x63ff63))
        }

        for (let i = 0; i <= 3; i++) {
            squareList.push(Square(this.square, [-3, 2, 0], 0xff00ff))
        }




        //this.isoText = new THREE.TextGeometry("5", )



        /*this.edges = new THREE.EdgesGeometry(this.circleTest);
        this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x63ff63 }));
        this.line.position.x = -2
        this.line.position.y = 2
        this.line.position.z = 0

        this.line.rotation.x = 1

        this.line2 = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x63ff63 }));
        this.line2.position.x = -2
        this.line2.position.y = 2
        this.line2.position.z = 0

        this.line3 = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({ color: 0x63ff63 }));
        this.line3.position.x = -2
        this.line3.position.y = 2
        this.line3.position.z = 0

        this.scene.add(this.line)
        this.scene.add(this.line2)
        this.scene.add(this.line3)*/


        //circle enemy END

        //Square enemy




        //Square Enemy END

        //Duodecahedron power

        this.dodecahedron = new THREE.DodecahedronGeometry(.5)
        this.dodeEdges = new THREE.EdgesGeometry(this.dodecahedron)
        this.drawable = new THREE.LineSegments(this.dodecahedron, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.drawable.position.set(2, -3, 3.9)

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

        // Hexaogno END


        // model

        this.loader = new FBXLoader();


        this.loader.load('ship/Ship1.fbx', (object) => {
            object.scale.set(.05, .05, .1)
            object.position.set(6.5, 0, 0)

            object.rotation.z = 4.8


            nave = object

            // nave.scale.set(.05, .05,.1)
            // nave.position.set(6.5, 0, 0)

            this.scene.add(object)

            document.addEventListener("keydown", onKeyDown, false)
            function onKeyDown(event) {
                var code = event.which
                if (code == 37) { // Left arrow
                    if (nave.position.x >= 3) {
                        nave.position.x -= 0.25
                    }

                } if (code == 39) { // Right arrow
                    if (nave.position.x < 7) {
                        //console.log("X antes de sumar: " + nave.position.x)
                        nave.position.x += 0.25
                        //console.log("X despues de sumar: " + nave.position.x)
                    }

                } if (code == 32) { // Spacebar (fire)++

                    if (coneList.length < 1) {
                        let cone
                        cone = disparo([nave.position.x, nave.position.y])
                        coneList.push(cone)
                        console.log(coneList)
                        console.log(code)
                    }  


                }

            }
            naveCargada = true
        });

        if (naveCargada) {
            this.scene.add(nave)

        }








        //this.scene.add(this.nave)


        //this.scene.add(this.nave);
        //Octahedron power

        this.octahedron = new THREE.OctahedronGeometry(.5)
        this.polyEdges = new THREE.EdgesGeometry(this.octahedron)
        this.polyDrawable = new THREE.LineSegments(this.polyEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.polyDrawable.position.set(2, -1, 3.9)


        //Icosaedro


        this.icosaedro = new THREE.IcosahedronGeometry(.5)
        // this.icoEdges = new THREE.EdgesGeometry(this.icosaedro)
        // this.icoDrawable = new THREE.LineSegments(this.icoEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        // this.icoDrawable.position.set(3.8, -1, 3.9)


        for (let i = 0; i < 3; i++) {
            isoList.push(isocaedro(this.icosaedro, [1.8 + i, -1, 3.9 + i]))
        }
        //isocaedro(this.scene, this.icosaedro, [3.8, -1, 3.9])

        //Tetrahedron

        this.tetraedro = new THREE.TetrahedronGeometry(.5)
        this.tetraEdges = new THREE.EdgesGeometry(this.tetraedro)
        this.tetDrawable = new THREE.LineSegments(this.tetraEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.tetDrawable.position.set(3.8, -3, 3.9)

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




        this.debug = false;

        //scene.add( spriteText );

        this.scene.add(this.polyDrawable)
        this.scene.add(this.tetDrawable)
        this.scene.add(this.drawable)
        this.scene.add(this.hexDrawable)
        this.scene.add(this.hexDraw2)
        this.scene.add(this.hexDraw3)
        this.scene.add(this.hexDraw4)

    };

    game.update = function (delta) {
        //Custom Add
        //this.line.rotation.x += (Math.PI / 2) * delta;
        //this.line.rotation.y -= (Math.PI / 2) * delta
        //this.line3.rotation.y -= (Math.PI / 2) * delta

        // this.squareLine2.rotation.x -= (Math.PI / 3) * delta
        // this.squareLine3.rotation.y -= (Math.PI / 3) * delta

        // this.diamondLine2.rotation.y -= (Math.PI / 3) * delta

        this.drawable.rotation.x -= (Math.PI / 3) * delta
        this.drawable.rotation.y += (Math.PI / 3) * delta
        this.drawable.rotation.z += (Math.PI / 3) * delta
        this.drawable.position.set(((offCenter + 3) * (Math.cos(gradesReverse / (180 / Math.PI)))), ((offCenter - 2) * (Math.sin(gradesReverse / (180 / Math.PI)))), 0)

        this.hexDrawable.rotation.x -= (Math.PI / 3) * delta
        this.hexDrawable.rotation.y += (Math.PI / 3) * delta
        this.hexDrawable.rotation.z += (Math.PI / 3) * delta

        this.hexDraw2.rotation.x += (Math.PI / 76) * delta
        this.hexDraw2.rotation.y -= (Math.PI / 3) * delta
        this.hexDraw2.rotation.z -= (Math.PI / 3) * delta

        this.hexDraw4.rotation.x += (Math.PI / 76) * delta
        this.hexDraw4.rotation.y += (Math.PI / 2) * delta
        this.hexDraw4.rotation.z -= (Math.PI / 3) * delta

        this.polyDrawable.rotation.x -= (Math.PI / 3) * delta
        this.polyDrawable.rotation.y -= (Math.PI / 3) * delta
        this.polyDrawable.rotation.z += (Math.PI / 3) * delta

        if (naveCargada) {



        }
        if (coneList.length > 0) {
            coneList.forEach(cone => {
                this.scene.add(cone)
                
            })
        }
        coneList.forEach(cone =>{
            cone.position.x -= 0.2
            if(cone.position.x <= 0){
                coneList.pop()
            }
        })
        /*coneList.forEach((cone)=>{
            this.scene.add(cone)
        })*/


        isoList.forEach(ico => {
            ico.rotation.x += (Math.PI / 3) * delta
            ico.rotation.y += (Math.PI / 3) * delta
            ico.rotation.z -= (Math.PI / 3) * delta
        });

        var circlePosFlag = []
        circleList.forEach((circle, index) => {

            var randomNum = Math.random()
            circle.rotation.x += (Math.PI / 2 * randomNum) * delta;
            circle.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            circle.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            circle.position.y = (offCenter + 2) * (Math.sin(grades / (180 / Math.PI)))
            circle.position.x = (offCenter + 2) * (Math.cos(grades / (180 / Math.PI)))
            if (circle.position.x > 8.5 || circle.position.x < -8.5
                || circle.position.y > 8.5 || circle.position.y < -8.5) {
                circleList.splice(index, 2)

                //circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))
                for (let i = 0; i < 2; i++) {
                    circleList.push(CircleMaker(this.circleTest, [0, 0, 0], 0x63ff63))


                }
                circleList.forEach(circle => this.scene.add(circle))

                offCenter = 0

            }


        })

        isoList.forEach((iso, index) => {
            iso.position.set((((offCenter + 2) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(isoDegrees / (180 / Math.PI)))), ((offCenter + 2) * (Math.sin(isoDegrees / (180 / Math.PI)))), 0)
            this.tetDrawable.position.set(iso.position.x + ((1) * (Math.cos(isoDegrees / (180 / Math.PI)))), iso.position.y + ((1) * (Math.sin(isoDegrees / (180 / Math.PI)))), 0)
        })

        this.polyDrawable.position.set((((offCenter - 1) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(grades / (180 / Math.PI)))), ((offCenter + 4) * (Math.sin(isoDegrees / (180 / Math.PI)))), 0)

        diamondList.forEach((diamond, index) => {
            var randomNum = Math.random()
            diamond.rotation.x += (Math.PI / 2 * randomNum) * delta;
            diamond.rotation.y -= (Math.PI / (2 * randomNum)) * delta;



            diamond.position.set(
                ((offCenter + 3) + ((Math.cos(grades / (180 / Math.PI))))) * (Math.cos(diamondDegrees / (180 / Math.PI))),
                ((offCenter + 3) + ((Math.sin(grades / (180 / Math.PI))))) * (Math.sin(diamondDegrees / (180 / Math.PI))),
                0)
        })
        //                         ((offCenter + 2) * (Math.cos(gradesReverse / (180 / Math.PI)))), 
        //                         ((offCenter + 2) * (Math.sin(gradesReverse / (180 / Math.PI)))),
        //                          0)
        //

        squareList.forEach((square, index) => {
            var randomNum = Math.random()
            square.rotation.x += (Math.PI / 2 * randomNum) * delta;
            square.rotation.y -= (Math.PI / (2 * randomNum)) * delta
            square.position.set(((offCenter - 3) * (Math.cos(gradesReverse / (180 / Math.PI)))), ((offCenter + 2) * (Math.sin(gradesReverse / (180 / Math.PI)))), 0)
        })





        // this.icoDrawable.rotation.x += (Math.PI / 3) * delta
        // this.icoDrawable.rotation.y += (Math.PI / 3) * delta
        // this.icoDrawable.rotation.z -= (Math.PI / 3) * delta

        this.tetDrawable.rotation.x -= (Math.PI / 3) * delta
        this.tetDrawable.rotation.y += (Math.PI / 3) * delta
        this.tetDrawable.rotation.z -= (Math.PI / 3) * delta

        grades += 1.8;
        isoDegrees += 0.5
        gradesReverse -= 1.8
        offCenter += 0.004
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


    };

    game.toggleDebug = function () {
        this.debug = !this.debug;
    };

    game.init();
    game.tick();
}

window.onload = function () {
    loadGame();
};
