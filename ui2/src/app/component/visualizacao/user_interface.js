import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { __await } from "tslib";
import Maze from "./maze.js";
import { merge } from "./merge.js";
import { VisualizacaoComponent } from "./visualizacao.component.ts";

export const mazeData = {
    url: "../../assets/mazes/Loquitas.json",
    //credits: "Maze designed by Cecília Fernandes and Nikita.",
    //scale: new THREE.Vector3(1.0, 1.0, 1.0)
}

export default class UserInteraction {


    constructor(scene, renderer, lights, fog, object, animations,maze) {

        function colorCallback(object, color) {
            object.color.set(color);
        }



        function shadowsCallback(enabled) {
            scene.traverseVisible(function (child) { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        }

        function createEmoteCallback(animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        }

        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });
        /*let obj = { edificio: '', piso: '' };
        const campusFolder = this.gui.addFolder("Campus");

        const edificiosFolder = campusFolder.addFolder("Edificio");
        const pisosFolder = campusFolder.addFolder("Piso");
        let edificiosTeste =[];
        

        async function fetchEdificios() {
            try {
                let response = await fetch('http://localhost:3000/api/edificio/listEdificios');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let jsonResponse = await response.json();
                edificiosTeste = jsonResponse.map(function (edificio) {
                    return edificio.codigoEdificio;
                });
                return edificiosTeste;

            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function fetchPisos(edificio) {
            try {
                let response = await fetch('http://localhost:3000/api/piso/listPisos/'+edificio);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let jsonResponse = await response.json();
                var pisos = jsonResponse.map(function (piso) {
                    return piso.designacao;
                });
                return pisos;

            } catch (error) {
                console.error('Error:', error);
            }
        }

        let edificios = fetchEdificios();
        edificios.then(resultEdificio => edificiosFolder.add(obj, 'edificio', resultEdificio).name('Selecionar edificio').onChange(edificio => {
            let pisos = fetchPisos(edificio);
            pisos.then(resultPiso => pisosFolder.add(obj, 'piso', resultPiso).name('Selecionar piso').onChange(piso => {
                mazeData.url = 'http://localhost:3000/api/mapaPiso/listMapaPiso/'+piso;
            }));
        }));
        
        const bg = {
            display: function display() {
                const vis = new VisualizacaoComponent();
                vis.initialize(); 
                vis.animate = vis.animate.bind(vis);
			    vis.animate();
            },
            add: function add(){
                scene.add(maze);
            }
        }

        const displayFolder = this.gui.addFolder("Display");
        displayFolder.add(bg, 'display');
        displayFolder.add(bg, 'add');

        

        /*fetchEdificios(function (edificios) {
            const controls = {
                selectedEdificio: edificios[0] || '' // Set default value
            };
            edificiosFolder.add(controls, 'selectedEdificio', edificios).name('Selecionar edificio');

            edificiosFolder.onChange(function (valorEdificio) {
                edificio = valorEdificio.value;
                fetchPisos(edificio, function (pisos) {
                    selectPisos.selectedPiso = '';
                    selectPisos.options = pisos;
                    pisosFolder.__controllers[0].updateDisplay();
                    pisosFolder.onChange(function (value) {
                        //console.log('Selected Piso:', value);
                    });
                    //console.log("teste");
                });
            });
        });*/
        //pisosFolder.add(selectPisos, 'selectedPiso').name('Selecionar piso');*/



        // Create the lights folder
        const lightsFolder = this.gui.addFolder("Lights");

        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create point light #1 folder
        const pointLight1Folder = lightsFolder.addFolder("Point light #1");
        const pointLight1 = lights.object.pointLight1;
        const pointColor1 = { color: "#" + new THREE.Color(pointLight1.color).getHexString() };
        pointLight1Folder.addColor(pointColor1, "color").onChange(color => colorCallback(pointLight1, color));
        pointLight1Folder.add(lights.object.pointLight1, "intensity", 0.0, 100.0, 1.0);
        pointLight1Folder.add(lights.object.pointLight1, "distance", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "x", -10.0, 10.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "y", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "z", -10.0, 10.0, 0.01);

        // Create point light #2 folder
        const pointLight2Folder = lightsFolder.addFolder("Point light #2");
        const pointLight2 = lights.object.pointLight2;
        const pointColor2 = { color: "#" + new THREE.Color(pointLight2.color).getHexString() };
        pointLight2Folder.addColor(pointColor2, "color").onChange(color => colorCallback(pointLight2, color));
        pointLight2Folder.add(lights.object.pointLight2, "intensity", 0.0, 100.0, 1.0);
        pointLight2Folder.add(lights.object.pointLight2, "distance", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "x", -10.0, 10.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "y", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "z", -10.0, 10.0, 0.01);

        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Create the fog folder
        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Create the character folder
        const characterFolder = this.gui.addFolder("Character");

        // Create the emotes folder and add emotes
        const emotesFolder = characterFolder.addFolder("Emotes");
        const callbacks = [];
        for (let i = 0; i < animations.emotes.length; i++) {
            createEmoteCallback(animations, animations.emotes[i]);
        }

        // Create the expressions folder and add expressions
        const expressionsFolder = characterFolder.addFolder("Expressions");
        const face = object.getObjectByName("Head_4");
        const expressions = Object.keys(face.morphTargetDictionary);
        for (let i = 0; i < expressions.length; i++) {
            expressionsFolder.add(face.morphTargetInfluences, i, 0.0, 1.0, 0.01).name(expressions[i]);
        }
    }

    setVisibility(visible) {
        if (visible) {
            this.gui.show();
        }
        else {
            this.gui.hide();
        }
    }
}

