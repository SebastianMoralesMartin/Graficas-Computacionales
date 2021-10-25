import * as THREE from '../../libs/three.js/r131/three.module.js'
import { TransformControls } from '../../libs/three.js/r131/controls/TransformControls.js'
import { GLTFLoader } from '../../libs/three.js/r131/loaders/GLTFLoader.js';
import { FBXLoader } from '../../libs/three.js/r131/loaders/FBXLoader.js';
import { Game, Utils } from './common.js';

function loadGame() {
    const game = new Game();

    game.init = function () {

        this.scene.background = new THREE.Color(0x0)

        this.light = new THREE.AmbientLight(0xffffff)
        this.scene.add(this.light)

        //Circle enemy
        this.circleTest = new THREE.CircleGeometry(0.25, 32);
        this.edges = new THREE.EdgesGeometry(this.circleTest);
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

        //circle enemy END

        //Square enemy

        this.square = new THREE.PlaneGeometry(0.5, 0.5);
        this.squareEdges = new THREE.EdgesGeometry(this.square);
        this.squareLine = new THREE.LineSegments(this.squareEdges,
            new THREE.LineBasicMaterial({ color: 0xff00ff }));
        this.squareLine.position.x = -3
        this.squareLine.position.y = 2
        this.squareLine.position.z = 0


        this.squareLine2 = new THREE.LineSegments(this.squareEdges,
            new THREE.LineBasicMaterial({ color: 0xff00ff }));
        this.squareLine2.position.x = -3
        this.squareLine2.position.y = 2
        this.squareLine2.position.z = 0

        this.squareLine3 = new THREE.LineSegments(this.squareEdges,
            new THREE.LineBasicMaterial({ color: 0xff00ff }));
        this.squareLine3.position.x = -3
        this.squareLine3.position.y = 2
        this.squareLine3.position.z = 0



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

        this.diamondLine.position.x = dX
        this.diamondLine.position.y = dY
        this.diamondLine.position.z = dZ
        this.diamondLine.rotation.z = rtZ

        this.diamondLine2.position.x = dX
        this.diamondLine2.position.y = dY
        this.diamondLine2.position.z = dZ
        this.diamondLine2.rotation.z = rtZ

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
        const loader = new FBXLoader();


        loader.load('ship/Ship1.fbx', (object) => {
            object.scale.set(.1, .1, .1)
            object.position.set(-2, -3, 1)


            this.scene.add(object);


        });

        //Octahedron power

        this.octahedron = new THREE.OctahedronGeometry(.5)
        this.polyEdges = new THREE.EdgesGeometry(this.octahedron)
        this.polyDrawable = new THREE.LineSegments(this.polyEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.polyDrawable.position.set(2, -1, 3.9)

        //Icosaedro

        
        this.icosaedro= new THREE.IcosahedronGeometry(.5)
        this.icoEdges = new THREE.EdgesGeometry(this.icosaedro)
        this.icoDrawable = new THREE.LineSegments(this.icoEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.icoDrawable.position.set(3.8, -1, 3.9)

        //Tetrahedron

        this.tetraedro= new THREE.TetrahedronGeometry(.5)
        this.tetraEdges = new THREE.EdgesGeometry(this.tetraedro)
        this.tetDrawable = new THREE.LineSegments(this.tetraEdges, new THREE.LineBasicMaterial({ color: 0xffffff }))
        this.tetDrawable.position.set(3.8, -3, 3.9)







        this.debug = false;
        this.scene.add(this.line);
        this.scene.add(this.line2)
        this.scene.add(this.line3)
        this.scene.add(this.squareLine)
        this.scene.add(this.squareLine2)
        this.scene.add(this.squareLine3)
        this.scene.add(this.diamondLine)
        this.scene.add(this.diamondLine2)
        this.scene.add(this.drawable)
        this.scene.add(this.polyDrawable)
        this.scene.add(this.icoDrawable)
        this.scene.add(this.tetDrawable)
        this.scene.add(this.hexDrawable)
        this.scene.add(this.hexDraw2)
        this.scene.add(this.hexDraw3)
        this.scene.add(this.hexDraw4)

    };

    game.update = function (delta) {
        //Custom Add
        this.line.rotation.x += (Math.PI / 2) * delta;
        this.line.rotation.y -= (Math.PI / 2) * delta
        this.line3.rotation.y -= (Math.PI / 2) * delta

        this.squareLine2.rotation.x -= (Math.PI / 3) * delta
        this.squareLine3.rotation.y -= (Math.PI / 3) * delta

        this.diamondLine2.rotation.y -= (Math.PI / 3) * delta

        this.drawable.rotation.x -= (Math.PI / 3) * delta
        this.drawable.rotation.y += (Math.PI / 3) * delta
        this.drawable.rotation.z += (Math.PI / 3) * delta

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
                   
        this.icoDrawable.rotation.x += (Math.PI / 3) * delta
        this.icoDrawable.rotation.y += (Math.PI / 3) * delta
        this.icoDrawable.rotation.z -= (Math.PI / 3) * delta

        this.tetDrawable.rotation.x -= (Math.PI / 3) * delta
        this.tetDrawable.rotation.y += (Math.PI / 3) * delta
        this.tetDrawable.rotation.z -= (Math.PI / 3) * delta

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
