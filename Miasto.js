
const colors = [ 0xFF0000, 0x00FF00, 0x0000FF, 0xFF6347, 0x228B22, 0x1E90FF,
 0xDDDDDD, 0x000000, 0x993300, 0x33cc33, 0x009933, 0x993333, 0x4C4E4F, 0xA9A9A9, 0x7F7E7E ];
 var container;
 var key = [];
 var animationRunning = true;
 var div = document.getElementById("info");
 var div2 = document.getElementById("Interior");
 var div3 = document.getElementById("Dom");
 var div4 = document.getElementById("Human");
 var audio = new Audio();
 var audio2 = new Audio();
 audio.src = 'music/music.mp3';
 audio2.src = 'music/music2.mp3';
const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x000000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 36;
var gui = new dat.GUI({name: 'My GUI', width: 280});

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.setClearColor( new THREE.Color( 0xcceecc ) );
document.getElementsByTagName('body')[0].appendChild( renderer.domElement );
container = document.getElementById( 'ThreeJS' );
//renderer.physicallyCorrectLights = true;
//obsluga klawiatury
document.addEventListener("keydown", function(event) {key[event.keyCode] = true;});
document.addEventListener("keyup", function(event) {key[event.keyCode] = false;});


parameters = 
{
Ambient_light: true,
Point_light_srodek: false,
Point_light_boczne: false,
Point_light_domek: false,
Point_light_auta: true,
Interior: false,
Dom: false,
Human: false,
Dron: false, 
Auto: false
}
var folder1 = gui.addFolder('Lights');
folder1.open();

var Ambient_light = folder1.add ( parameters, 'Ambient_light').name('Ambient_light').listen();
    Ambient_light.onChange(function(value){
        if(value)
            {
              audio2.play();
              ambientLight.intensity=1;
            }
        else
            {
              audio2.play();
              ambientLight.intensity=0;
            }
    });

var Point_light_srodek = folder1.add ( parameters, 'Point_light_srodek').name('Point_light_środek').listen();
    Point_light_srodek.onChange(function(value){
        //console.log(value);
        if(value)
        {
          audio2.play();
          pointLight.intensity=1;
        }
        else
        {
          audio2.play();
          pointLight.intensity=0;
        }
    });
	
var Point_light_boczne = folder1.add ( parameters, 'Point_light_boczne').name('Point_light_boczne').listen();
    Point_light_boczne.onChange(function(value){
        //console.log(value);
        if(value)
		{
      audio2.play();
      pointLight3.intensity=1;
			pointLight4.intensity=1;
			pointLight5.intensity=1;
		pointLight6.intensity=1;}
        else
		{
      audio2.play();
      pointLight3.intensity=0;
			pointLight4.intensity=0;
			pointLight5.intensity=0;
		pointLight6.intensity=0;}
    });
	
var Point_light_domek = folder1.add ( parameters, 'Point_light_domek').name('Point_light_domek').listen();
    Point_light_domek.onChange(function(value){
        //console.log(value);
        if(value)
		{
      audio2.play();
      pointLight2.intensity=1;
			pointLight2_2.intensity=1;
			pointLight2_3.intensity=1;
		pointLight2_4.intensity=1;}
        else
		{
      audio2.play();
      pointLight2.intensity=0;
			pointLight2_2.intensity=0;
			pointLight2_3.intensity=0;
		pointLight2_4.intensity=0;}
    });

    var Point_light_auta = folder1.add ( parameters, 'Point_light_auta').name('Point_light_auta').listen();
    Point_light_auta.onChange(function(value){
        //console.log(value);
        if(value)
		{
      audio2.play();
      pointLight8.intensity=1;
			pointLight9.intensity=1;
			pointLight10.intensity=1;
		}
        else
		{
      audio2.play();
      pointLight8.intensity=0;
			pointLight9.intensity=0;
			pointLight10.intensity=0;
    }
    });
	
var folder2 = gui.addFolder('Camera');
folder2.open();

var Interior = folder2.add ( parameters, 'Interior').name('Camera_Interior').listen();
    Interior.onChange(function(value){
        //console.log(value);
        if(value)
		{
      Dom.setValue(false);
      Human.setValue(false);
      Dron.setValue(false);
      Auto.setValue(false);
      animationRunning = false;
			camera.position.set(-9, -8.7, 6.2 );
		controls.target = srodek.position.clone();
		controls.enabled = false;
    camera.zoom = 1;
    pointLight7.intensity=1;
    div.style.visibility = "hidden";
    div2.style.visibility = "visible";
    audio.play();
		}
        else
		{
      audio.load();
      div.style.visibility = "visible";
      div2.style.visibility = "hidden";
      animationRunning = false;
			camera.position.set(0, 0, 36 );
		controls.target = scene.position.clone();
		controls.enabled = true;
    camera.zoom = 1;
    pointLight7.intensity=0;
		}
    });
	
var Dom = folder2.add ( parameters, 'Dom').name('Camera_Dom').listen();
    Dom.onChange(function(value){
        //console.log(value);
        if(value)
		{
      Interior.setValue(false);
      Human.setValue(false);
      Dron.setValue(false);
      Auto.setValue(false);
      animationRunning = false;
			camera.position.set(18, -3, -1.5 );
			camera.zoom = 1.5;
			controls.target = dom.position.clone();
      controls.enabled = true;
      pointLight7.intensity=0;
      div.style.visibility = "hidden";
      div3.style.visibility = "visible";
      audio.play();
		}
        else
		{
      audio.load();
      div.style.visibility = "visible";
      div3.style.visibility = "hidden";
      animationRunning = false;
			camera.position.set(0, 0, 36 );
			camera.zoom = 1;
			controls.target = scene.position.clone();
      controls.enabled = true;
		}
    });

    var Human = folder2.add ( parameters, 'Human').name('Camera_Human').listen();
    Human.onChange(function(value){
        //console.log(value);
        if(value)
		{
      Dom.setValue(false);
      Interior.setValue(false);
      Dron.setValue(false);
      Auto.setValue(false);
      animationRunning = false;
			camera.position.set(12, -9, -1.5 );
      controls.target.set(0,-10,0);
      controls.enabled = false;
      camera.zoom = 1;
      pointLight7.intensity=0;
      div.style.visibility = "hidden";
      div4.style.visibility = "visible";
      audio.play();
		}
        else
		{
      audio.load();
      div.style.visibility = "visible";
      div4.style.visibility = "hidden";
      animationRunning = false;
			camera.position.set(0, 0, 36 );
      controls.target = scene.position.clone();
      controls.enabled = true;
      camera.zoom = 1;
		}
    });

    var Dron = folder2.add ( parameters, 'Dron').name('Camera_Dron').listen();
    Dron.onChange(function(value){
        //console.log(value);
        if(value)
		{
      Dom.setValue(false);
      Human.setValue(false);
      Interior.setValue(false);
      Auto.setValue(false);
      animationRunning = true;
      function animate() {
        if (animationRunning){
        requestAnimationFrame( animate );
        
        camera.position.x = auto.position.x;
        camera.position.y = auto.position.y;
        camera.position.z = auto.position.z;
        
        renderer.render( scene, camera );
        }
      }
      
      animate();
      controls.target.set(0,-10,0);
      controls.enabled = false;
      camera.zoom = 1;
      pointLight7.intensity=0;
      div.style.visibility = "hidden";
      audio.play();
		}
        else
		{
      audio.load();
      div.style.visibility = "visible";
      animationRunning = false;
			camera.position.set(0, 0, 36 );
      controls.target = scene.position.clone();
      controls.enabled = true;
      camera.zoom = 1;
		}
    });

    var Auto = folder2.add ( parameters, 'Auto').name('Camera_Auto').listen();
    Auto.onChange(function(value){
        //console.log(value);
        if(value)
		{
      Dom.setValue(false);
      Human.setValue(false);
      Dron.setValue(false);
      Interior.setValue(false);
      animationRunning = true;
      function animate() {
        if (animationRunning){
        requestAnimationFrame( animate );
        
        camera.position.x = auto.position.x;
        camera.position.y = auto.position.y-8.2;
        camera.position.z = auto.position.z;
        
        renderer.render( scene, camera );
        }
      }
      
      animate();
      controls.target.set(0,-10,0);
      controls.enabled = false;
      camera.zoom = 1;
      pointLight7.intensity=0;
      div.style.visibility = "hidden";
      audio.play();
		}
        else
		{
      audio.load();
      div.style.visibility = "visible";
      animationRunning = false;
			camera.position.set(0, 0, 36 );
      controls.target = scene.position.clone();
      controls.enabled = true;
      camera.zoom = 1;
		}
    });

const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

const texture = new THREE.TextureLoader().load( 'textures/BlueSkySkybox.jpg' );
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = texture;

//tekstury
const cubeTexture1 = new THREE.TextureLoader().load( 'textures/chodnik.jpg' );
  cubeTexture1.wrapS = THREE.RepeatWrapping;
  cubeTexture1.wrapT = THREE.RepeatWrapping;
  cubeTexture1.repeat.set( 11, 11 );

const cubeTexture2 = new THREE.TextureLoader().load( 'textures/grass.jpg' );
  cubeTexture2.wrapS = THREE.RepeatWrapping;
  cubeTexture2.wrapT = THREE.RepeatWrapping;
  cubeTexture2.repeat.set( 4, 4 );
  
const cubeTexture3 = new THREE.TextureLoader().load( 'textures/plyta.jpg' );
  cubeTexture3.wrapS = THREE.RepeatWrapping;
  cubeTexture3.wrapT = THREE.RepeatWrapping;
  cubeTexture3.repeat.set( 4, 4 );
  
  const cubeTexture4 = new THREE.TextureLoader().load( 'textures/skyscraper.jpg' );
  cubeTexture4.wrapS = THREE.RepeatWrapping;
  cubeTexture4.wrapT = THREE.RepeatWrapping;
  cubeTexture4.repeat.set( 2, 2 );
  
const cubeTexture5 = new THREE.TextureLoader().load( 'textures/skyscraper2.jpg' );
  cubeTexture5.wrapS = THREE.RepeatWrapping;
  cubeTexture5.wrapT = THREE.RepeatWrapping;
  cubeTexture5.repeat.set( 1, 2 );
 
 const cubeTexture6 = new THREE.TextureLoader().load( 'textures/skyscraper4.jpg' );
  cubeTexture6.wrapS = THREE.RepeatWrapping;
  cubeTexture6.wrapT = THREE.RepeatWrapping;
  cubeTexture6.repeat.set( 6, 3 );

const cubeTexture7 = new THREE.TextureLoader().load( 'textures/street.webp' );
  cubeTexture7.wrapS = THREE.RepeatWrapping;
  cubeTexture7.wrapT = THREE.RepeatWrapping;
  cubeTexture7.repeat.set( 30, 30 );

const tloader = new THREE.TextureLoader();
const cubeTexture7_2 = [
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/side4.png")} ),
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/side4.png")} ),
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/side6.png")} ),
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/side6.png")} ),
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/top2.png")} ),
  new THREE.MeshStandardMaterial( {map: tloader.load("../textures/top2.png")} )
		
	] ;
  
const cubeTexture8 = new THREE.TextureLoader().load( 'textures/rock.jpg' );
  cubeTexture8.wrapS = THREE.RepeatWrapping;
  cubeTexture8.wrapT = THREE.RepeatWrapping;
  cubeTexture8.repeat.set( 1, 1 );

const cubeTexture9 = new THREE.TextureLoader().load( 'textures/leaves.jpg' );
  cubeTexture9.wrapS = THREE.RepeatWrapping;
  cubeTexture9.wrapT = THREE.RepeatWrapping;
  cubeTexture9.repeat.set( 4, 4 );
  
const cubeTexture10 = new THREE.TextureLoader().load( 'textures/tree.jpg' );
  cubeTexture10.wrapS = THREE.RepeatWrapping;
  cubeTexture10.wrapT = THREE.RepeatWrapping;
  cubeTexture10.repeat.set( 1, 1 );
  
const cubeTexture11 = new THREE.TextureLoader().load( 'textures/water.jpg' );
  cubeTexture11.wrapS = THREE.MirroredRepeatWrapping;
  cubeTexture11.wrapT = THREE.MirroredRepeatWrapping;
  cubeTexture11.repeat.set( 1, 1 );
  
const cubeTexture12 = new THREE.TextureLoader().load( 'textures/house.jpg' );
  cubeTexture12.wrapS = THREE.MirroredRepeatWrapping;
  cubeTexture12.wrapT = THREE.MirroredRepeatWrapping;
  cubeTexture12.repeat.set( 1, 1 );

const cubeTexture13 = new THREE.TextureLoader().load( 'textures/roof.jpg' );
  cubeTexture13.wrapS = THREE.MirroredRepeatWrapping;
  cubeTexture13.wrapT = THREE.MirroredRepeatWrapping;
  cubeTexture13.repeat.set( 4, 4 );
  
const cubeTexture14 = new THREE.TextureLoader().load( 'textures/tire.jpg' );
  cubeTexture14.wrapS = THREE.MirroredRepeatWrapping;
  cubeTexture14.wrapT = THREE.MirroredRepeatWrapping;
  cubeTexture14.repeat.set( 1, 1 );

  const cubeTexture15 = new THREE.TextureLoader().load( 'textures/wall.jpg' );
  cubeTexture15.wrapS = THREE.RepeatWrapping;
  cubeTexture15.wrapT = THREE.RepeatWrapping;
  cubeTexture15.repeat.set( 1, 1 );

  const cubeTexture16 = new THREE.TextureLoader().load( 'textures/dywan.jpg' );
  cubeTexture16.wrapS = THREE.RepeatWrapping;
  cubeTexture16.wrapT = THREE.RepeatWrapping;
  cubeTexture16.repeat.set( 1, 1 );

  const cubeTexture17 = new THREE.TextureLoader().load( 'textures/door.jpg' );
  cubeTexture17.wrapS = THREE.RepeatWrapping;
  cubeTexture17.wrapT = THREE.RepeatWrapping;
  cubeTexture17.repeat.set( 1, 1 );



const geometry = new THREE.BoxGeometry( 10, 10, 0.1 );
const mieszkanie = new THREE.BoxGeometry(0.9, 0.9, 0.9)
const dywan = new THREE.BoxGeometry(0.5, 0.5, 0.01);
const geometry2 = new THREE.BoxGeometry( 30, 30, 0.1 );
const geometry2_2 = new THREE.BoxGeometry( 30, 30, 0.5 );
const geometry3 = new THREE.BoxGeometry( 2, 2, 6 );
const geometry4 = new THREE.CylinderGeometry( 1, 1, 6, 32 );
const geometry5 = new THREE.CylinderGeometry( 0.1, 0.1, 1, 32 );
const geometry6 = new THREE.SphereGeometry( 0.6, 9, 7 );
const geometry8 = new THREE.BoxGeometry( 8, 4, 0.2 );
const geometry9 = new THREE.BoxGeometry( 12, 12, 0.1 );
const geometry10 = new THREE.BoxGeometry( 9.5, 0.1, 0.01 );
const geometry11 = new THREE.BoxGeometry( 0.8, 0.1, 0.01 );
const geometry12 = new THREE.SphereGeometry( 0.3, 9, 4 );
const geometry13 = new THREE.CircleGeometry( 2, 32 );
const geometry14 = new THREE.CylinderGeometry( 0.04, 0.04, 1, 32 );
const geometry15 = new THREE.BoxGeometry( 1.8, 1.8, 1.8 );
const geometry16 = new THREE.ConeGeometry( 1.3, 1.3, 4 );
const geometry17 = new THREE.TorusGeometry( 0.1, 0.05, 4, 25 );
const geometry18 = new THREE.CylinderGeometry( 0.05, 0.05, 0.6, 32 );
const geometry19 = new THREE.BoxGeometry( 1.4, 0.6, 0.1 );
const geometry20 = new THREE.BoxGeometry( 0.95, 0.4, 0.5 );
const geometry21 = new THREE.BoxGeometry( 0.45, 0.2, 0.5 );
const geometry22 = new THREE.BoxGeometry( 0.01, 0.01, 0.01 );
const geometry23 = new THREE.PlaneGeometry( 0.2, 0.4 );

const material = new THREE.MeshStandardMaterial( {color: colors[6]} );
const material2 = new THREE.MeshStandardMaterial( {color: colors[14], map: cubeTexture6} );
const material3 = new THREE.MeshStandardMaterial( {color: colors[8], map: cubeTexture10} );
const material4 = new THREE.MeshStandardMaterial( {color: colors[9] , map: cubeTexture9} );
const material5 = new THREE.MeshStandardMaterial( {color: 0x26C755, map: cubeTexture2} );
const material6 = new THREE.MeshStandardMaterial( {color: 0xBDB0A0, map: cubeTexture1} );
const material7 = new THREE.MeshStandardMaterial( {color: 0x787871, map: cubeTexture5} );
const material8 = new THREE.MeshStandardMaterial( {color: colors[14], map: cubeTexture4, side: THREE.DoubleSide} );
const material9 = new THREE.MeshStandardMaterial( {color: colors[14], map: cubeTexture3} );
const material10 = new THREE.MeshStandardMaterial( {color: 0x3A3F43, map: cubeTexture7} );
const material11 = new THREE.MeshStandardMaterial( {color: 0xFAE9D5, map: cubeTexture8} );
const material12 = new THREE.MeshStandardMaterial( { color: 0x3487FF, map: cubeTexture11 } );
const material13 = new THREE.MeshStandardMaterial( { color: 0x4D3920, map: cubeTexture12 } );
const material14 = new THREE.MeshStandardMaterial( { color: 0x4D3920, map: cubeTexture13 } );
const material15 = new THREE.MeshStandardMaterial( { color: 0x313536, map: cubeTexture14 } );
const material15_2 = new THREE.MeshStandardMaterial( { color: 0x313536 } );
const material16 = new THREE.MeshStandardMaterial( { color: 0x464B4D } );
const material17 = new THREE.MeshStandardMaterial( { color: 0x22F021 } );
const material18 = new THREE.MeshStandardMaterial( { color: 0xED1C24 } );
const material19 = new THREE.MeshStandardMaterial( { color: 0x32F0D6 } );
const material20 = new THREE.MeshStandardMaterial( { color: 0xE8DFCF, map: cubeTexture15, side: THREE.DoubleSide } );
const material21 = new THREE.MeshStandardMaterial( { color: 0xE8DFCF, map: cubeTexture16, side: THREE.DoubleSide } );
const material22 = new THREE.MeshStandardMaterial( { color: 0x995522, map: cubeTexture17, side: THREE.DoubleSide } );


const room = new THREE.Mesh( mieszkanie, material20 );
room.position.set( -9, -8.9, 6 );
scene.add( room );

const dywanik = new THREE.Mesh( dywan, material21 );
dywanik.position.set( -9, -9.34, 6 );
dywanik.rotation.x+=Math.PI/2.0;
scene.add( dywanik );

const door = new THREE.Mesh( geometry23, material22 );
door.position.set( -9, -9.14, 5.56 );
scene.add( door );


const gleba = new THREE.Mesh( geometry2_2, cubeTexture7_2 );
gleba.position.set( 0, -10.3, 0 );
gleba.rotation.x+=Math.PI/2.0;


const jezioro = new THREE.Mesh( geometry13, material12 );
jezioro.position.set(5, -9.72, -9.5);
jezioro.rotation.x-=Math.PI/2.0;
jezioro.receiveShadow = true;

const srodek = new THREE.Mesh( geometry22, material15 );
srodek.position.set(-9, -9.5, 6 );
srodek.visible = false;

const os = new THREE.Mesh ( geometry18, material16 );
os.position.set(0, -9, 0.3);
os.rotation.x-=Math.PI/2.0;

var os2 = os.clone();
os2.position.x+=1;

const os3 = new THREE.Mesh ( geometry18, material16 );
os3.position.set(0, -9, 0.3);
os3.rotation.x-=Math.PI/2.0;

var os4 = os3.clone();
os4.position.x+=1;

const os5 = new THREE.Mesh ( geometry18, material16 );
os5.position.set(0, -9, 0.3);
os5.rotation.x-=Math.PI/2.0;

var os6 = os5.clone();
os6.position.x+=1;

const podwozie = new THREE.Mesh ( geometry19, material15_2 );
podwozie.position.set(0.5, -8.9, 0.3);
podwozie.rotation.x-=Math.PI/2.0;

const podwozie2 = new THREE.Mesh ( geometry19, material15_2 );
podwozie2.position.set(0.5, -8.9, 0.3);
podwozie2.rotation.x-=Math.PI/2.0;

const podwozie3 = new THREE.Mesh ( geometry19, material15_2 );
podwozie3.position.set(0.5, -8.9, 0.3);
podwozie3.rotation.x-=Math.PI/2.0;

const nadwozie = new THREE.Mesh ( geometry20, material17 );
nadwozie.position.set(0.3, -8.7, 0.3);
nadwozie.receiveShadow = true;
nadwozie.castShadow = true;

const nadwozie2 = new THREE.Mesh ( geometry21, material17 );
nadwozie2.position.set(1, -8.8, 0.3);
nadwozie2.receiveShadow = true;
nadwozie2.castShadow = true;

const nadwozie3 = new THREE.Mesh ( geometry20, material18 );
nadwozie3.position.set(0.3, -8.7, 0.3);
nadwozie3.receiveShadow = true;
nadwozie3.castShadow = true;

const nadwozie4 = new THREE.Mesh ( geometry21, material18 );
nadwozie4.position.set(1, -8.8, 0.3);
nadwozie4.receiveShadow = true;
nadwozie4.castShadow = true;

const nadwozie5 = new THREE.Mesh ( geometry20, material19 );
nadwozie5.position.set(0.3, -8.7, 0.3);
nadwozie5.receiveShadow = true;
nadwozie5.castShadow = true;

const nadwozie6 = new THREE.Mesh ( geometry21, material19 );
nadwozie6.position.set(1, -8.8, 0.3);
nadwozie6.receiveShadow = true;
nadwozie6.castShadow = true;

const kolo = new THREE.Mesh ( geometry17, material15 );
kolo.position.set(0, -9, 0);
// kolo.rotation.x-=Math.PI/2.0;

var kolo2 = kolo.clone();
kolo2.position.x+=1;

var kolo3 = kolo.clone();
kolo3.position.z+=0.6;

var kolo4 = kolo2.clone();
kolo4.position.z+=0.6;

const kolo5 = new THREE.Mesh ( geometry17, material15 );
kolo5.position.set(0, -9, 0);
// kolo.rotation.x-=Math.PI/2.0;

var kolo6 = kolo5.clone();
kolo6.position.x+=1;

var kolo7 = kolo5.clone();
kolo7.position.z+=0.6;

var kolo8 = kolo6.clone();
kolo8.position.z+=0.6;

const kolo9 = new THREE.Mesh ( geometry17, material15 );
kolo9.position.set(0, -9, 0);
// kolo.rotation.x-=Math.PI/2.0;

var kolo10 = kolo9.clone();
kolo10.position.x+=1;

var kolo11 = kolo9.clone();
kolo11.position.z+=0.6;

var kolo12 = kolo10.clone();
kolo12.position.z+=0.6;

const cubeA = new THREE.Mesh( geometry, material9 );
cubeA.position.set( 7, -9.8, 7 );
cubeA.rotation.x+=Math.PI/2.0;
cubeA.receiveShadow = true;
const cubeB = new THREE.Mesh( geometry, material9 );
cubeB.position.set( -7, -9.8, 7 );
cubeB.rotation.x+=Math.PI/2.0;
cubeB.receiveShadow = true;
const cubeC = new THREE.Mesh( geometry, material5 );
cubeC.position.set( 7, -9.8, -7 );
cubeC.rotation.x+=Math.PI/2.0;
cubeC.receiveShadow = true;
const cubeD = new THREE.Mesh( geometry, material9 );
cubeD.position.set( -7, -9.8, -7 );
cubeD.rotation.x+=Math.PI/2.0;
cubeD.receiveShadow = true;
const cubeA2 = new THREE.Mesh( geometry9, material6 );
cubeA2.position.set( 7, -9.9, 7 );
cubeA2.rotation.x+=Math.PI/2.0;
cubeA2.receiveShadow = true;
const cubeB2 = new THREE.Mesh( geometry9, material6 );
cubeB2.position.set( -7, -9.9, 7 );
cubeB2.rotation.x+=Math.PI/2.0;
cubeB2.receiveShadow = true;
const cubeC2 = new THREE.Mesh( geometry9, material6 );
cubeC2.position.set( 7, -9.9, -7 );
cubeC2.rotation.x+=Math.PI/2.0;
cubeC2.receiveShadow = true;
const cubeD2 = new THREE.Mesh( geometry9, material6 );
cubeD2.position.set( -7, -9.9, -7 );
cubeD2.rotation.x+=Math.PI/2.0;
cubeD2.receiveShadow = true;
const cubeA3 = new THREE.Mesh( geometry10, material );
cubeA3.position.set( 7, -9.94, 0 );
cubeA3.rotation.x+=Math.PI/2.0;
cubeA3.receiveShadow = true;

const linia1 = new THREE.Group();
linia1.add( cubeA3 );

var linia1_1 = linia1.clone();
linia1_1.position.z+=14;
scene.add( linia1_1 );

var linia1_2 = linia1.clone();
linia1_2.position.z-=14;
scene.add( linia1_2 );

const cubeB3 = new THREE.Mesh( geometry10, material );
cubeB3.position.set( -7, -9.94, 0 );
cubeB3.rotation.x+=Math.PI/2.0;
cubeB3.receiveShadow = true;

const linia2 = new THREE.Group();
linia2.add( cubeB3 );

var linia2_1 = linia2.clone();
linia2_1.position.z+=14;
scene.add( linia2_1 );

var linia2_2 = linia2.clone();
linia2_2.position.z-=14;
scene.add( linia2_2 );

const cubeC3 = new THREE.Mesh( geometry10, material );
cubeC3.position.set( 0, -9.94, 7 );
cubeC3.rotation.x+=Math.PI/2.0;
cubeC3.rotation.z+=Math.PI/2.0;
cubeC3.receiveShadow = true;

const linia3 = new THREE.Group();
linia3.add( cubeC3 );

var linia3_1 = linia3.clone();
linia3_1.position.x+=14;
scene.add( linia3_1 );

var linia3_2 = linia3.clone();
linia3_2.position.x-=14;
scene.add( linia3_2 );


const cubeD3 = new THREE.Mesh( geometry10, material );
cubeD3.position.set( 0, -9.94, -7 );
cubeD3.rotation.x+=Math.PI/2.0;
cubeD3.rotation.z+=Math.PI/2.0;
cubeD3.receiveShadow = true;

const linia4 = new THREE.Group();
linia4.add( cubeD3 );

var linia4_1 = linia4.clone();
linia4_1.position.x+=14;
scene.add( linia4_1 );

var linia4_2 = linia4.clone();
linia4_2.position.x-=14;
scene.add( linia4_2 );

const cubeA4 = new THREE.Mesh( geometry11, material );
cubeA4.position.set( 6, -9.94, 0.33 );
cubeA4.rotation.x+=Math.PI/2.0;
cubeA4.receiveShadow = true;
const cubeB4 = new THREE.Mesh( geometry11, material );
cubeB4.position.set( 6, -9.94, 0.66 );
cubeB4.rotation.x+=Math.PI/2.0;
cubeB4.receiveShadow = true;
const cubeC4 = new THREE.Mesh( geometry11, material );
cubeC4.position.set( 6, -9.94, -0.33 );
cubeC4.rotation.x+=Math.PI/2.0;
cubeC4.receiveShadow = true;
const cubeD4 = new THREE.Mesh( geometry11, material );
cubeD4.position.set( 6, -9.94, -0.66 );
cubeD4.rotation.x+=Math.PI/2.0;
cubeD4.receiveShadow = true;
const kamien = new THREE.Mesh( geometry12, material11 );
kamien.position.set( 2.5, -9.6, -2.66 );
kamien.castShadow = true;
kamien.receiveShadow = true;

const dom = new THREE.Mesh( geometry15, material13 );
dom.position.set( 11, -8.9, -4 );
dom.castShadow = true;
dom.receiveShadow = true;

const dach1 = new THREE.Mesh( geometry16, material14 );
dach1.position.set( 11, -7.35, -4 );
dach1.castShadow = true;
dach1.receiveShadow = true;
dach1.rotation.y +=Math.PI/4.0 ;

const lampa = new THREE.Mesh( geometry14, material10 );
lampa.position.set( 7, -9.45, -1.2 );
lampa.castShadow = true;
lampa.receiveShadow = true;

const pointLight2 = new THREE.PointLight( 0xF8F8FF, 0, 3 );
  pointLight2.position.set( 11, -8.5, -2.8 );
  pointLight2.castShadow = true;
  scene.add( pointLight2 );

const pointLight2_2 = new THREE.PointLight( 0xF8F8FF, 0, 3 );
  pointLight2_2.position.set( 11, -8.5, -5.8 );
  pointLight2_2.castShadow = true;
  scene.add( pointLight2_2 );

const pointLight2_3 = new THREE.PointLight( 0xF8F8FF, 0, 3 );
  pointLight2_3.position.set( 13, -8.5, -4.3 );
  pointLight2_3.castShadow = true;
  scene.add( pointLight2_3 );

const pointLight2_4 = new THREE.PointLight( 0xF8F8FF, 0, 3 );
  pointLight2_4.position.set( 9, -8.5, -4.3 );
  pointLight2_4.castShadow = true;
  scene.add( pointLight2_4 );
  
const pointLight3 = new THREE.PointLight( 0xF8F8FF, 0, 14 );
  pointLight3.position.set( 10, -7, 14 );
  pointLight3.castShadow = true;
  scene.add( pointLight3 );
  
const pointLight4 = new THREE.PointLight( 0xF8F8FF, 0, 14 );
  pointLight4.position.set( -10, -7, 14 );
  pointLight4.castShadow = true;
  scene.add( pointLight4 );
  
const pointLight5 = new THREE.PointLight( 0xF8F8FF, 0, 14 );
  pointLight5.position.set( 10, -7, -14 );
  pointLight5.castShadow = true;
  scene.add( pointLight5 );
  
const pointLight6 = new THREE.PointLight( 0xF8F8FF, 0, 14 );
  pointLight6.position.set( -10, -7, -14 );
  pointLight6.castShadow = true;
  scene.add( pointLight6 );
  
const pointLight7 = new THREE.PointLight( 0xF8F8FF, 0, 10 );
  pointLight7.position.set( -9, -7, 6 );
  pointLight7.castShadow = true;
  scene.add( pointLight7 );
  
const pointLight8 = new THREE.PointLight( 0x135DD8, 2, 2 );
 pointLight8.position.set(1.2, -8.9, 0.3 );
  pointLight8.castShadow = true;
  scene.add( pointLight8 );
  
const pointLight9 = new THREE.PointLight( 0xF8F8FF, 2, 2 );
pointLight9.castShadow = true;
pointLight9.position.set(0.3, -8.7, 0.3);
scene.add( pointLight9 );

const pointLight10 = new THREE.PointLight( 0xF8F8FF, 2, 2 );
pointLight10.castShadow = true;
pointLight10.position.set(0.3, -8.7, 0.3);

var lampa1 = lampa.clone();
lampa1.position.x-=12;

var lampa1_1 = lampa.clone();
lampa1_1.position.set(-3.3, -9.45, 9.5);

var lampa1_2 = lampa.clone();
lampa1_2.position.set(-9.5, -9.45, -2.5);

var lampa2 = lampa.clone();
lampa2.position.z+=2.4;
lampa2.position.x-=2;

var lampa3 = lampa1.clone();
lampa3.position.z+=2.4;
lampa3.position.x-=2;

var lampa4 = lampa.clone();
lampa4.position.x=1.3;
lampa4.position.z=-5;

var lampa5 = lampa4.clone();
lampa5.position.z+=12;

var lampa6 = lampa4.clone();
lampa6.position.z-=2;
lampa6.position.x-=2.4;

var lampa7 = lampa5.clone();
lampa7.position.z-=2;
lampa7.position.x-=2.4;

var kamien1 = kamien.clone();
kamien1.position.x+=1;

var kamien2 = kamien.clone();
kamien2.position.x+=2.7;
kamien2.position.z-=4.1;

var kamien3 = kamien.clone();
kamien3.position.x+=5.5;
kamien3.position.z-=5.9;

const group5 = new THREE.Group();
group5.add( cubeA4 );
group5.add( cubeB4 );
group5.add( cubeC4 );
group5.add( cubeD4 );
var pasy = group5.clone();
pasy.position.x-=12;
var pasy2 = group5.clone();
pasy2.position.x=0;
pasy2.rotation.y+=Math.PI/2.0;
var pasy3 = group5.clone();
pasy3.position.x=0;
pasy3.position.z+=12;
pasy3.rotation.y+=Math.PI/2.0;

const cubeE = new THREE.Mesh( geometry2, material10 );
cubeE.position.set( 0, -10, 0 );
cubeE.rotation.x+=Math.PI/2.0;
cubeE.receiveShadow = true;
const budynek = new THREE.Mesh( geometry3, material7 );
budynek.position.set( 7, -6.8, 6 );
budynek.rotation.x+=Math.PI/2.0;
budynek.receiveShadow = true;
budynek.castShadow = true;
var budynek2 = budynek.clone();
budynek2.position.set( -7, -7.8, -3.5 );
budynek2.scale.set(0.85,0.9,0.7);
var budynek3 = budynek.clone();
budynek3.position.set( -7, -6.8, 9 );
var budynek4 = budynek.clone();
budynek4.position.set( -4.1, -7.3, -9 );
budynek4.scale.set(0.9,0.9,0.9);
var budynek5 = budynek.clone();
budynek5.position.set( -9.2, -6.7, -7.2 );
budynek5.scale.set(0.8,0.8,1);

const budynek6 = new THREE.Mesh( geometry4, material2 );
budynek6.position.set( 9, -6.8, 10 );
budynek6.receiveShadow = true;
budynek6.castShadow = true;
const budynek7 = new THREE.Mesh( geometry4, material8 );
budynek7.position.set( -9, -6.8, 6 );
budynek7.receiveShadow = true;
budynek7.castShadow = true;
const group4 = new THREE.Group();
group4.add( budynek6 );
var budynek8 = group4.clone();
budynek8.position.x-=3;
budynek8.position.z-=1;
budynek8.scale.set(0.8,1,0.8);

var budynek9 = group4.clone();
budynek9.position.x-=13;
budynek9.position.z-=2;
budynek9.scale.set(0.9,1,1);

const trzon = new THREE.Mesh( geometry5, material3 );
trzon.position.set( 7, -9.5, -4 );
trzon.receiveShadow = true;
const liscie = new THREE.Mesh( geometry6, material4 );
liscie.position.set( 7, -8.7, -4 );
liscie.receiveShadow = true;
const group2 = new THREE.Group();
group2.add( trzon );
group2.add( liscie );
var l1 = group2.clone();
l1.position.x+=1.8;
var l2 = group2.clone();
l2.position.x-=1.8;
var l3 = group2.clone();
l3.position.x+=2.8;
var l4 = group2.clone();
l4.position.x-=2.8;

var l5 = group2.clone();
l5.position.x+=0.8;
l5.position.z+=1.4;
var l6 = group2.clone();
l6.position.x-=0.8;
l6.position.z+=1.4;
var l7 = group2.clone();
l7.position.x+=1.8;
l7.position.z+=1.4;
var l8 = group2.clone();
l8.position.x-=1.8;
l8.position.z+=1.4;
const group3 = new THREE.Group();
group3.add( l1 );
group3.add( l2 );
group3.add( l3 );
group3.add( l4 );
group3.add( l5 );
group3.add( l6 );
group3.add( l7 );
group3.add( l8 );
group3.position.x-=0.5;
var las2 = group3.clone();
var las3 = group3.clone();
las2.position.z-=2.8;
las2.position.x-=1.5;
las3.rotation.y+=Math.PI/2.0;
las3.position.z-=1.7;
las3.position.x+=13.2;

const auto = new THREE.Group();
auto.add( kolo5 );
auto.add( kolo6 );
auto.add( kolo7 );
auto.add( kolo8 );
auto.add( os3 );
auto.add( os4 );
auto.add( podwozie2 );
auto.add( nadwozie3 );
auto.add( nadwozie4 );
auto.add( pointLight10 );

auto.position.x-=6.4;
auto.position.y-=0.8;
auto.position.z+=0.2;

const auto2 = new THREE.Group();
auto2.add( kolo9 );
auto2.add( kolo10 );
auto2.add( kolo11 );
auto2.add( kolo12 );
auto2.add( os5 );
auto2.add( os6 );
auto2.add( podwozie3 );
auto2.add( nadwozie );
auto2.add( nadwozie2 );
auto2.add( pointLight9 );
auto2.rotation.y+=Math.PI/2;

auto2.position.x=0.3;
auto2.position.y-=0.8;
auto2.position.z+=10;

const auto3 = new THREE.Group();
auto3.add( kolo );
auto3.add( kolo2 );
auto3.add( kolo3 );
auto3.add( kolo4 );
auto3.add( os );
auto3.add( os2 );
auto3.add( podwozie );
auto3.add( nadwozie5 );
auto3.add( nadwozie6 );

auto3.position.x-=11.5;
auto3.position.y-=0.8;
auto3.position.z+=0.2;

var auto4 = auto.clone();
auto4.position.z-=1.3;
auto4.position.x-=3.3;
auto4.position.y+=0.1;
auto4.rotation.y+=Math.PI;

var auto5 = auto2.clone();
auto5.position.z-=1.3;
auto5.position.x-=3.3;
auto5.position.y+=0.2;
// auto5.rotation.y+=Math.PI;

var auto6 = auto3.clone();
auto6.position.z-=1.3;
auto6.position.x+=4.3;
auto6.position.y+=0.1;
auto6.rotation.y+=Math.PI;

var auto7 = auto3.clone();
auto7.add(pointLight8);
auto7.position.z-=0.4;
auto7.position.x+=19.3;
//auto7.position.y+=0.1;
auto7.rotation.y+=Math.PI;

const group = new THREE.Group();

group.add( cubeA2 );
group.add( cubeB2 );
group.add( cubeC2 );
group.add( cubeD2 );
group.add( cubeA3 );
group.add( cubeB3 );
group.add( cubeC3 );
group.add( cubeD3 );
group.add( cubeA4 );
group.add( cubeB4 );
group.add( cubeC4 );
group.add( cubeD4 );
group.add( jezioro );
group.add( kamien );
group.add( dom );
group.add( dach1 );
group.add( lampa );
group.add( lampa1 );
group.add( lampa1_1 );
group.add( lampa1_2 );
group.add( lampa2 );
group.add( lampa3 );
group.add( lampa4 );
group.add( lampa5 );
group.add( lampa6 );
group.add( lampa7 );
group.add( kamien1 );
group.add( kamien2 );
group.add( kamien3 );
group.add( cubeA );
group.add( cubeB );
group.add( cubeC );
group.add( cubeD );
group.add( cubeE );
group.add( gleba );
group.add( budynek );
group.add( budynek2 );
group.add( budynek3 );
group.add( budynek4 );
group.add( budynek5 );
group.add( budynek6 );
group.add( budynek7 );
group.add( budynek8 );
group.add( budynek9 );
group.add( pasy );
group.add( pasy2 );
group.add( pasy3 );
group.add( srodek );

scene.add( group );
scene.add( group2 );
scene.add( group3 );
scene.add( group4 );
scene.add( group5 );
scene.add( auto );
scene.add( auto2 );
scene.add( auto3 );
scene.add( auto4 );
scene.add( auto5 );
scene.add( auto6 );
scene.add( auto7 );
scene.add( las2 );
scene.add( las3 );

// Lights and helpers

  // add ambient light
  const ambientLight = new THREE.AmbientLight( 0x2a2a2a ) ;
  scene.add( ambientLight );

  // add pointlight for the shadows
  const pointLight = new THREE.PointLight( 0xffffff, 0, 30 );
  pointLight.position.set( 0, 1, 0 );
  pointLight.castShadow = true;
  scene.add( pointLight );
  
  const Sun = new THREE.HemisphereLight( 0xffffcc, 0x080820, 0.5 );
  scene.add( Sun );

//
renderer.render( scene, camera );

// aktualizacja OrbitControls.js
function animate() {
  requestAnimationFrame( animate );

  keyboard();

if(auto2.position.x < 14.1 && auto2.position.z > -14.1 && auto2.position.x > -14.1 && auto2.position.z < 14.1)	{
	auto2.position.z-=0.04;
}
if(auto2.position.x > 14.1){
	auto2.rotation.y=Math.PI/2;
	auto2.position.z-=0.04;
	Sun.intensity+=0.0005;
}
if(auto2.position.z < -14.1){
	auto2.rotation.y=Math.PI;
	auto2.position.x-=0.04;
	Sun.intensity+=0.0006;
  pointLight.intensity+=0.0003;
}
if(auto2.position.x < -14.1){
	auto2.rotation.y=-Math.PI/2;
	auto2.position.z+=0.04;
	Sun.intensity-=0.0005;
}
if(auto2.position.z > 14.1){
	auto2.rotation.y=2*Math.PI;
	auto2.position.x+=0.04;
	Sun.intensity-=0.0006;
  pointLight.intensity-=0.0003;
}


if(auto3.position.x < 14.1 && auto3.position.z > -14.1 && auto3.position.x > -14.1 && auto3.position.z < 14.1)	{
	auto3.position.x+=0.04;
}
if(auto3.position.x > 14.1 && auto3.position.z > -14.1){
	auto3.rotation.y=Math.PI/2;
	auto3.position.z-=0.04;
}
if(auto3.position.z < -14.1){
	auto3.rotation.y=Math.PI;
	auto3.position.x-=0.04;
}
if(auto3.position.x < -14.1){
	auto3.rotation.y=-Math.PI/2;
	auto3.position.z+=0.04;
}
if(auto3.position.z > 14.1){
	auto3.rotation.y=2*Math.PI;
	auto3.position.x+=0.04;
}



if(auto.position.x < 14.1 && auto.position.z > -14.1 && auto.position.x > -14.1 && auto.position.z < 14.1)	{
	auto.position.x+=0.04;
}
if(auto.position.x > 14.1 && auto.position.z > -14.1){
	auto.rotation.y=Math.PI/2;
	auto.position.z-=0.04;
}
if(auto.position.z < -14.1){
	auto.rotation.y=Math.PI;
	auto.position.x-=0.04;
}
if(auto.position.x < -14.1){
	auto.rotation.y=-Math.PI/2;
	auto.position.z+=0.04;
}
if(auto.position.z > 14.1){
	auto.rotation.y=2*Math.PI;
	auto.position.x+=0.04;
}
	
if(auto7.position.x < 13.6 && auto7.position.z > -13.6 && auto7.position.x > -13.6 && auto7.position.z < 13.6)	{
	auto7.position.x-=0.04;
}
if(auto7.position.x > 13.6) {
	auto7.rotation.y=-Math.PI/2;
	auto7.position.z+=0.04;
}
if(auto7.position.z < -13.6){
	auto7.rotation.y=2*Math.PI;
	auto7.position.x+=0.04;
}
if(auto7.position.x < -13.6){
	auto7.rotation.y=Math.PI/2;
	auto7.position.z-=0.04;
}
if(auto7.position.z > 13.6){
	auto7.rotation.y=Math.PI;
	auto7.position.x-=0.04;
}
	
	camera.updateProjectionMatrix();
	controls.update();

	renderer.render( scene, camera );
}

function animate2() {
  requestAnimationFrame( animate );
  camera.position.x-=0.1;
  camera.updateProjectionMatrix();
	controls.update();

	renderer.render( scene, camera );
}

animate();


function keyboard() {
if ( (key['w'.charCodeAt(0)] && controls.enabled == true) || (key['W'.charCodeAt(0)] && controls.enabled == true)) {
  camera.position.z-=0.02;      
} 
if ((key['s'.charCodeAt(0)] && controls.enabled == true) || (key['S'.charCodeAt(0)] && controls.enabled == true)) {
  camera.position.z+=0.02;
} 
if ((key['a'.charCodeAt(0)] && pointLight7.intensity == 0)  || (key['A'.charCodeAt(0)] && pointLight7.intensity == 0)) {
  camera.position.x-=0.02;
} 
if ((key['d'.charCodeAt(0)] && pointLight7.intensity == 0)  || (key['D'.charCodeAt(0)] && pointLight7.intensity == 0)) {
  camera.position.x+=0.02;
} 
else{return}
};

// zmiana rozmiaru okna
window.addEventListener(
  'resize',
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
  },
  false
);


