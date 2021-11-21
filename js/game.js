import * as THREE from '../../libs/three.js/r131/three.module.js'


			let camera, scene, renderer, dodecahedron, dodeEdges, drawable;

			init();

			function init() {
                
                let WIDTH, HEIGHT = 512
                const canvas = document.getElementById('canvas');
                
                renderer = new THREE.WebGLRenderer({canvas: canvas});
                canvas.width = WIDTH
                canvas.height = HEIGHT;
                renderer.setViewport(0, 0, WIDTH, HEIGHT);
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(-5, 5, 5, -5, -1, 100);
				camera.position.set(0,0,5)
                camera.lookAt(scene.position)

                

				
				scene.background = new THREE.Color( 0, 0, 0 );



				//Dodecaedo
                dodecahedron = new THREE.DodecahedronGeometry(.5)
                dodeEdges = new THREE.EdgesGeometry(dodecahedron)
                drawable = new THREE.LineSegments(dodecahedron, new THREE.LineBasicMaterial({ color: 0xffffff }))
                drawable.position.set(2, -3, 0)
                scene.add(drawable)

                renderer.render(scene,camera)

				


				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}