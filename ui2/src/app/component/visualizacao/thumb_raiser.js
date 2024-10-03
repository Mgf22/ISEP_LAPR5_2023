// Thumb Raiser - JPP 2021, 2022, 2023
// 3D modeling
// 3D models importing
// Perspective and orthographic projections
// Viewing
// Linear and affine transformations
// Lighting and materials
// Shadow projection
// Fog
// Texture mapping
// User interaction

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import Orientation from "./orientation.js";
import { generalData, playerData, lightsData, fogData, cameraData } from "./default_data.js";
import { mazeData } from "./user_interface.js"
import { merge } from "./merge.js";
import Maze from "./maze.js";
import Player from "./player.js";
import Lights from "./lights.js";
import Fog from "./fog.js";
import Camera from "./camera.js";
import Animations from "./animations.js";
import UserInterface from "./user_interface.js";
import { PassagemService } from "../../service/passagem/passagem.service.js";
import TWEEN from "@tweenjs/tween.js";
import cloneDeep from 'lodash/cloneDeep';
import { map } from 'rxjs/operators';


/*
 * generalParameters = {
 *  setDevicePixelRatio: Boolean
 * }
 *
 * mazeParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 *
 * playerParameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3,
 *  walkingSpeed: Float,
 *  initialDirection: Float,
 *  turningSpeed: Float,
 *  runningFactor: Float,
 *  keyCodes: { fixedView: String, firstPersonView: String, thirdPersonView: String, topView: String, viewMode: String, userInterface: String, miniMap: String, help: String, statistics: String, run: String, left: String, right: String, backward: String, forward: String, jump: String, yes: String, no: String, wave: String, punch: String, thumbsUp: String }
 * }
 *
 * lightsParameters = {
 *  ambientLight: { color: Integer, intensity: Float },
 *  pointLight1: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  pointLight2: { color: Integer, intensity: Float, range: Float, position: Vector3 },
 *  spotLight: { color: Integer, intensity: Float, range: Float, angle: Float, penumbra: Float, position: Vector3, direction: Float }
 * }
 *
 * fogParameters = {
 *  enabled: Boolean,
 *  color: Integer,
 *  near: Float,
 *  far: Float
 * }
 *
 * fixedViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * firstPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * thirdPersonViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * topViewCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  target: Vector3,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 *
 * miniMapCameraParameters = {
 *  view: String,
 *  multipleViewsViewport: Vector4,
 *  initialOrientation: Orientation,
 *  orientationMin: Orientation,
 *  orientationMax: Orientation,
 *  initialDistance: Float,
 *  distanceMin: Float,
 *  distanceMax: Float,
 *  initialZoom: Float,
 *  zoomMin: Float,
 *  zoomMax: Float,
 *  initialFov: Float,
 *  near: Float,
 *  far: Float
 * }
 */

export default class ThumbRaiser {
    constructor(pisoService, edificioService, mapaPisoService, elevadorService, passagemService, mapaPiso, canvas, generalParameters, mazeParameters, playerParameters, lightsParameters, fogParameters, fixedViewCameraParameters, firstPersonViewCameraParameters, thirdPersonViewCameraParameters, topViewCameraParameters, miniMapCameraParameters) {
        //const userInteractionInstance = new UserInterface();
        //this.mazeParameters = merge({}, userInteractionInstance.mazeData, mazeParameters);
        this.pisoService = pisoService;
        this.edificioService = edificioService;
        this.mapaPisoService = mapaPisoService;
        this.elevadorService = elevadorService;
        this.passagemService = passagemService;
        this.generalParameters = merge({}, generalData, generalParameters);
        this.mapaPiso = mapaPiso;
        this.mazeParameters = merge({}, mazeParameters);
        this.playerParameters = merge({}, playerData, playerParameters);
        this.lightsParameters = merge({}, lightsData, lightsParameters);
        this.fogParameters = merge({}, fogData, fogParameters);
        this.fixedViewCameraParameters = merge({}, cameraData, fixedViewCameraParameters);
        this.firstPersonViewCameraParameters = merge({}, cameraData, firstPersonViewCameraParameters);
        this.thirdPersonViewCameraParameters = merge({}, cameraData, thirdPersonViewCameraParameters);
        this.topViewCameraParameters = merge({}, cameraData, topViewCameraParameters);
        this.miniMapCameraParameters = merge({}, cameraData, miniMapCameraParameters);

        // Create a 2D scene (the viewports frames)
        this.scene2D = new THREE.Scene();

        // Create a square
        let points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(1.0, 1.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0)];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.square = new THREE.LineLoop(geometry, material);
        this.scene2D.add(this.square);

        // Create the camera corresponding to the 2D scene
        this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

        // Create a 3D scene (the game itself)
        this.scene3D = new THREE.Scene();

        // Create the maze
        this.maze = new Maze(this.mazeParameters);

        //this.mapPortas = this.maze.arrayPortas();

        // Create the player
        this.player = new Player(this.playerParameters);

        // Create the lights
        this.lights = new Lights(this.lightsParameters);

        // Create the fog
        this.fog = new Fog(this.fogParameters);

        // Create the cameras corresponding to the four different views: fixed view, first-person view, third-person view and top view
        this.fixedViewCamera = new Camera(this.fixedViewCameraParameters, window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera = new Camera(this.firstPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera = new Camera(this.thirdPersonViewCameraParameters, window.innerWidth, window.innerHeight);
        this.topViewCamera = new Camera(this.topViewCameraParameters, window.innerWidth, window.innerHeight);

        // Create the mini-map camera
        this.miniMapCamera = new Camera(this.miniMapCameraParameters, window.innerWidth, window.innerHeight);

        // Create the statistics and make its node invisible
        this.statistics = new Stats();
        this.statistics.dom.style.visibility = "hidden";
        document.body.appendChild(this.statistics.dom);

        // Create a renderer and turn on shadows in the renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
        if (this.generalParameters.setDevicePixelRatio) {
            this.renderer.setPixelRatio(window.devicePixelRatio);
        }
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Set the mouse move action (none)
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;

        // Set the game state
        this.gameRunning = false;

        // Get and configure the panel's <div> elements
        this.viewsPanel = document.getElementById("views-panel");
        this.view = document.getElementById("view");
        this.projection = document.getElementById("projection");
        this.horizontal = document.getElementById("horizontal");
        this.horizontal.step = 1;
        this.vertical = document.getElementById("vertical");
        this.vertical.step = 1;
        this.distance = document.getElementById("distance");
        this.distance.step = 0.1;
        this.zoom = document.getElementById("zoom");
        this.zoom.step = 0.1;
        this.reset = document.getElementById("reset");
        this.resetAll = document.getElementById("reset-all");
        this.helpPanel = document.getElementById("help-panel");
        this.helpPanel.style.visibility = "hidden";
        this.subwindowsPanel = document.getElementById("subwindows-panel");
        this.multipleViewsCheckBox = document.getElementById("multiple-views");
        this.multipleViewsCheckBox.checked = false;
        this.userInterfaceCheckBox = document.getElementById("user-interface");
        this.userInterfaceCheckBox.checked = true;
        this.miniMapCheckBox = document.getElementById("mini-map");
        this.miniMapCheckBox.checked = true;
        this.helpCheckBox = document.getElementById("help");
        this.helpCheckBox.checked = false;
        this.statisticsCheckBox = document.getElementById("statistics");
        this.statisticsCheckBox.checked = false;

        // Build the help panel
        this.buildHelpPanel();

        // Set the active view camera (fixed view)
        this.setActiveViewCamera(this.thirdPersonViewCamera);

        // Arrange viewports by view mode
        this.arrangeViewports(this.multipleViewsCheckBox.checked);

        // Register the event handler to be called on window resize
        window.addEventListener("resize", event => this.windowResize(event));

        // Register the event handler to be called on key down
        document.addEventListener("keydown", event => this.keyChange(event, true));

        // Register the event handler to be called on key release
        document.addEventListener("keyup", event => this.keyChange(event, false));

        // Register the event handler to be called on mouse down
        this.renderer.domElement.addEventListener("mousedown", event => this.mouseDown(event));

        // Register the event handler to be called on mouse move
        this.renderer.domElement.addEventListener("mousemove", event => this.mouseMove(event));

        // Register the event handler to be called on mouse up
        this.renderer.domElement.addEventListener("mouseup", event => this.mouseUp(event));

        // Register the event handler to be called on mouse wheel
        this.renderer.domElement.addEventListener("wheel", event => this.mouseWheel(event));

        // Register the event handler to be called on context menu
        this.renderer.domElement.addEventListener("contextmenu", event => this.contextMenu(event));

        // Register the event handler to be called on select, input number, or input checkbox change
        this.view.addEventListener("change", event => this.elementChange(event));
        this.projection.addEventListener("change", event => this.elementChange(event));
        this.horizontal.addEventListener("change", event => this.elementChange(event));
        this.vertical.addEventListener("change", event => this.elementChange(event));
        this.distance.addEventListener("change", event => this.elementChange(event));
        this.zoom.addEventListener("change", event => this.elementChange(event));
        this.multipleViewsCheckBox.addEventListener("change", event => this.elementChange(event));
        this.userInterfaceCheckBox.addEventListener("change", event => this.elementChange(event));
        this.helpCheckBox.addEventListener("change", event => this.elementChange(event));
        this.statisticsCheckBox.addEventListener("change", event => this.elementChange(event));

        // Register the event handler to be called on input button click
        this.reset.addEventListener("click", event => this.buttonClick(event));
        this.resetAll.addEventListener("click", event => this.buttonClick(event));

        this.activeElement = document.activeElement;

        this.active2 = false;

        this.arrayEstatico = [
            [                    
                [5, 5],
                [5, 6],
                [5, 7],
                [6, 8],
                [6, 9],
                [6, 10],
                [6, 11],
                [6, 12],
                [6, 13],
                [7, 14],
                [7, 15],
                [7, 16],
                [7, 17],
                [7, 18], // porta
                [8, 18],
                [9, 18],
                [8, 18],
                [7, 18], // porta
                [7, 19],
                [7, 20],
                [7, 21],
                [7, 22],
                [7, 23], // elevador
                [8, 23],
            ]
        ]

        this.arrayEstaticoFloor = 0;

        this.it = 0;

        this.autoPilot = false;
    }

    buildHelpPanel() {
        const table = document.getElementById("help-table");
        let i = 0;
        for (const key in this.player.keyCodes) {
            while (table.rows[i].cells.length < 2) {
                i++;
            };
            table.rows[i++].cells[0].innerHTML = this.player.keyCodes[key];
        }
        table.rows[i].cells[0].innerHTML = this.maze.credits + "<br>" + this.player.credits;
    }

    displayPanel() {
        this.view.options.selectedIndex = ["fixed", "first-person", "third-person", "top"].indexOf(this.activeViewCamera.view);
        this.projection.options.selectedIndex = ["perspective", "orthographic"].indexOf(this.activeViewCamera.projection);
        this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
        this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
        this.distance.value = this.activeViewCamera.distance.toFixed(1);
        this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
    }

    // Set active view camera
    setActiveViewCamera(camera) {
        this.activeViewCamera = camera;
        this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
        this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
        this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
        this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
        this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
        this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
        this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
        this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
        this.displayPanel();
    }

    arrangeViewports(multipleViews) {
        this.fixedViewCamera.setViewport(multipleViews);
        this.firstPersonViewCamera.setViewport(multipleViews);
        this.thirdPersonViewCamera.setViewport(multipleViews);
        this.topViewCamera.setViewport(multipleViews);
    }

    pointerIsOverViewport(pointer, viewport) {
        return (
            pointer.x >= viewport.x &&
            pointer.x < viewport.x + viewport.width &&
            pointer.y >= viewport.y &&
            pointer.y < viewport.y + viewport.height);
    }

    getPointedViewport(pointer) {
        let viewport;
        // Check if the pointer is over the mini-map camera viewport
        if (this.miniMapCheckBox.checked) {
            viewport = this.miniMapCamera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return this.miniMapCamera.view;
            }
        }
        // Check if the pointer is over the remaining camera viewports
        let cameras;
        if (this.multipleViewsCheckBox.checked) {
            cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
        }
        else {
            cameras = [this.activeViewCamera];
        }
        for (const camera of cameras) {
            viewport = camera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return camera.view;
            }
        }
        // No camera viewport is being pointed
        return "none";
    }

    setViewMode(multipleViews) { // Single-view mode: false; multiple-views mode: true
        this.multipleViewsCheckBox.checked = multipleViews;
        this.arrangeViewports(this.multipleViewsCheckBox.checked);
    }

    setUserInterfaceVisibility(visible) {
        this.userInterfaceCheckBox.checked = visible;
        this.viewsPanel.style.visibility = visible ? "visible" : "hidden";
        this.subwindowsPanel.style.visibility = visible ? "visible" : "hidden";
        this.userInterface.setVisibility(visible);
    }

    setMiniMapVisibility(visible) { // Hidden: false; visible: true
        this.miniMapCheckBox.checked = visible;
    }

    setHelpVisibility(visible) { // Hidden: false; visible: true
        this.helpCheckBox.checked = visible;
        this.helpPanel.style.visibility = visible ? "visible" : "hidden";
    }

    setStatisticsVisibility(visible) { // Hidden: false; visible: true
        this.statisticsCheckBox.checked = visible;
        this.statistics.dom.style.visibility = visible ? "visible" : "hidden";
    }

    windowResize() {
        this.fixedViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.firstPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.thirdPersonViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.topViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.miniMapCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    keyChange(event, state) {
        // Allow digit and arrow keys to be used when entering numbers
        if (["horizontal", "vertical", "distance", "zoom"].indexOf(event.target.id) < 0) {
            event.target.blur();
        }
        if (document.activeElement == document.body) {
            // Prevent the "Space" and "Arrow" keys from scrolling the document's content
            if (event.code == "Space" || event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "ArrowDown" || event.code == "ArrowUp") {
                event.preventDefault();
            }
            if (event.code == this.player.keyCodes.fixedView && state) { // Select fixed view
                this.setActiveViewCamera(this.fixedViewCamera);
            }
            else if (event.code == this.player.keyCodes.firstPersonView && state) { // Select first-person view
                this.setActiveViewCamera(this.firstPersonViewCamera);
            }
            else if (event.code == this.player.keyCodes.thirdPersonView && state) { // Select third-person view
                this.setActiveViewCamera(this.thirdPersonViewCamera);
            }
            else if (event.code == this.player.keyCodes.topView && state) { // Select top view
                this.setActiveViewCamera(this.topViewCamera);
            }
            if (event.code == this.player.keyCodes.viewMode && state) { // Single-view mode / multiple-views mode
                this.setViewMode(!this.multipleViewsCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.userInterface && state) { // Display / hide user interface
                this.setUserInterfaceVisibility(!this.userInterfaceCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.miniMap && state) { // Display / hide mini-map
                this.setMiniMapVisibility(!this.miniMapCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.help && state) { // Display / hide help
                this.setHelpVisibility(!this.helpCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.statistics && state) { // Display / hide statistics
                this.setStatisticsVisibility(!this.statisticsCheckBox.checked);
            }
            if (event.code == this.player.keyCodes.run) {
                this.player.keyStates.run = state;
            }
            if (event.code == this.player.keyCodes.left) {
                this.player.keyStates.left = state;
            }
            else if (event.code == this.player.keyCodes.right) {
                this.player.keyStates.right = state;
            }
            if (event.code == this.player.keyCodes.backward) {
                this.player.keyStates.backward = state;
            }
            else if (event.code == this.player.keyCodes.forward) {
                this.player.keyStates.forward = state;
            }
            if (event.code == this.player.keyCodes.jump) {
                this.player.keyStates.jump = state;
            }
            else if (event.code == this.player.keyCodes.yes) {
                this.player.keyStates.yes = state;
            }
            else if (event.code == this.player.keyCodes.no) {
                this.player.keyStates.no = state;
            }
            else if (event.code == this.player.keyCodes.wave) {
                this.player.keyStates.wave = state;
            }
            else if (event.code == this.player.keyCodes.punch) {
                this.player.keyStates.punch = state;
            }
            else if (event.code == this.player.keyCodes.thumbsUp) {
                this.player.keyStates.thumbsUp = state;
            }
        }
    }

    mouseDown(event) {
        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
            this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
            // Select the camera whose view is being pointed
            const cameraView = this.getPointedViewport(this.mousePosition);
            if (cameraView != "none") {
                if (cameraView == "mini-map") { // Mini-map camera selected
                    if (event.buttons == 1) { // Primary button down
                        this.dragMiniMap = true;
                    }
                }
                else { // One of the remaining cameras selected
                    const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
                    this.view.options.selectedIndex = cameraIndex;
                    this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex]);
                    if (event.buttons == 1) { // Primary button down
                        this.changeCameraDistance = true;
                    }
                    else { // Secondary button down
                        this.changeCameraOrientation = true;
                    }
                }
            }
        }
    }

    mouseMove(event) {
        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            if (this.changeCameraDistance || this.changeCameraOrientation || this.dragMiniMap) { // Mouse action in progress
                // Compute mouse movement and update mouse position
                const newMousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
                const mouseIncrement = newMousePosition.clone().sub(this.mousePosition);
                this.mousePosition = newMousePosition;
                if (event.buttons == 1) { // Primary button down
                    if (this.changeCameraDistance) {
                        this.activeViewCamera.updateDistance(-0.05 * (mouseIncrement.x + mouseIncrement.y));
                        this.displayPanel();
                    }
                    else if (this.dragMiniMap) {
                        const windowMinSize = Math.min(window.innerWidth, window.innerHeight);
                        const width = this.miniMapCamera.viewport.width * windowMinSize;
                        const height = this.miniMapCamera.viewport.height * windowMinSize;
                        this.miniMapCamera.viewport.x += mouseIncrement.x / (window.innerWidth - width);
                        this.miniMapCamera.viewport.y += mouseIncrement.y / (window.innerHeight - height);
                    }
                }
                else { // Secondary button down
                    if (this.changeCameraOrientation) {
                        this.activeViewCamera.updateOrientation(mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5)));
                        this.displayPanel();
                    }
                }
            }
        }
    }

    mouseUp(event) {
        // Reset mouse move action
        this.dragMiniMap = false;
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;
    }

    mouseWheel(event) {
        // Prevent the mouse wheel from scrolling the document's content
        event.preventDefault();
        // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
        // Select the camera whose view is being pointed
        const cameraView = this.getPointedViewport(this.mousePosition);
        if (cameraView != "none" && cameraView != "mini-map") { // One of the remaining cameras selected
            const cameraIndex = ["fixed", "first-person", "third-person", "top"].indexOf(cameraView);
            this.view.options.selectedIndex = cameraIndex;
            const activeViewCamera = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][cameraIndex];
            activeViewCamera.updateZoom(-0.001 * event.deltaY);
            this.setActiveViewCamera(activeViewCamera);
        }
    }

    contextMenu(event) {
        // Prevent the context menu from appearing when the secondary mouse button is clicked
        event.preventDefault();
    }

    elementChange(event) {
        switch (event.target.id) {
            case "view":
                this.setActiveViewCamera([this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera][this.view.options.selectedIndex]);
                break;
            case "projection":
                this.activeViewCamera.setActiveProjection(["perspective", "orthographic"][this.projection.options.selectedIndex]);
                this.displayPanel();
                break;
            case "horizontal":
            case "vertical":
            case "distance":
            case "zoom":
                if (event.target.checkValidity()) {
                    switch (event.target.id) {
                        case "horizontal":
                        case "vertical":
                            this.activeViewCamera.setOrientation(new Orientation(this.horizontal.value, this.vertical.value));
                            break;
                        case "distance":
                            this.activeViewCamera.setDistance(this.distance.value);
                            break;
                        case "zoom":
                            this.activeViewCamera.setZoom(this.zoom.value);
                            break;
                    }
                }
                break;
            case "multiple-views":
                this.setViewMode(event.target.checked);
                break;
            case "user-interface":
                this.setUserInterfaceVisibility(event.target.checked);
                break;
            case "help":
                this.setHelpVisibility(event.target.checked);
                break;
            case "statistics":
                this.setStatisticsVisibility(event.target.checked);
                break;
        }
    }

    buttonClick(event) {
        switch (event.target.id) {
            case "reset":
                this.activeViewCamera.initialize();
                break;
            case "reset-all":
                this.fixedViewCamera.initialize();
                this.firstPersonViewCamera.initialize();
                this.thirdPersonViewCamera.initialize();
                this.topViewCamera.initialize();
                break;
        }
        this.displayPanel();
    }

    finalSequence() {
        // Disable the fog
        this.fog.enabled = false;
        // Reconfigure the third-person view camera
        this.thirdPersonViewCamera.setOrientation(new Orientation(180.0, this.thirdPersonViewCamera.initialOrientation.v));
        this.thirdPersonViewCamera.setDistance(this.thirdPersonViewCamera.initialDistance);
        this.thirdPersonViewCamera.setZoom(2.0);
        // Set it as the active view camera
        this.setActiveViewCamera(this.thirdPersonViewCamera);
        // Set single-view mode
        this.setViewMode(false);
        // Set the final action
        this.animations.fadeToAction("Dance", 0.2);
    }

    collision(position) {
        return this.maze.distanceToWestWall(position) < this.player.radius || this.maze.distanceToEastWall(position) < this.player.radius || this.maze.distanceToNorthWall(position) < this.player.radius || this.maze.distanceToSouthWall(position) < this.player.radius;
    }

    collisionDoorHorizontal(position) {
        return this.maze.distanceToWest(position, 7) < this.player.radius || this.maze.distanceToEast(position, 7) < this.player.radius || this.maze.distanceToNorth(position, 7) < this.player.radius || this.maze.distanceToSouth(position, 7) < this.player.radius;
    }

    collisionDoorVertical(position) {
        return this.maze.distanceToWest(position, 6) < this.player.radius || this.maze.distanceToEast(position, 6) < this.player.radius || this.maze.distanceToNorth(position, 6) < this.player.radius || this.maze.distanceToSouth(position, 6) < this.player.radius;
    }

    collisionElevatorHorizontal(position) {
        return this.maze.distanceToWest(position, 5) < this.player.radius || this.maze.distanceToEast(position, 5) < this.player.radius || this.maze.distanceToNorth(position, 5) < this.player.radius || this.maze.distanceToSouth(position, 5) < this.player.radius;
    }

    collisionElevatorVertical(position) {
        return this.maze.distanceToWest(position, 4) < this.player.radius || this.maze.distanceToEast(position, 4) < this.player.radius || this.maze.distanceToNorth(position, 4) < this.player.radius || this.maze.distanceToSouth(position, 4) < this.player.radius;
    }


    arrayRemove(arr, value) {

        return arr.filter(function (geeks) {
            return geeks != value;
        });

    }

    update() {
        if (!this.gameRunning) {
            if (this.maze.loaded && this.player.loaded) { // If all resources have been loaded
                // Add the maze, the player and the lights to the scene
                this.scene3D.add(this.maze.object);
                this.scene3D.add(this.player.object);
                this.scene3D.add(this.lights.object);

                // Create the clock
                this.clock = new THREE.Clock();

                // Create model animations (states, emotes and expressions)
                this.animations = new Animations(this.player.object, this.player.animations);

                // Set the player's position and direction
                this.player.position = this.maze.initialPosition.clone();
                this.player.direction = this.maze.initialDirection;

                // Create the user interface
                this.userInterface = new UserInterface(this.scene3D, this.renderer, this.lights, this.fog, this.player.object, this.animations, this.maze);

                // Start the game
                this.gameRunning = true;
            }
        }
        else {

            // Piloto automático.
            if(this.autoPilot){
                if(!this.arrayEstatico.length > 0){
                    this.autoPilot = false;
                }else{
                    let actualPos = this.maze.cartesianToCellDecimal(this.player.position);

                    if (actualPos[0] == this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5 &&
                        actualPos[1] == this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) { 

                        this.player.keyStates.forward = false;
                        this.player.keyStates.backward = false;
                        this.it++

                        if (this.arrayEstatico[this.arrayEstaticoFloor][this.it] === undefined) {
                            this.arrayEstaticoFloor++
                            this.it = 0

                            if (this.arrayEstatico[this.arrayEstaticoFloor] === undefined) {
                                this.autoPilot = false;
                                document.addEventListener("keydown", this.keydownListener);
                                document.addEventListener("keyup", this.keyupListener);
                            }
                        }

                    } else if (this.collision(this.player.position)) {
                        this.player.direction = 180
                        this.player.keyStates.forward = true;

                    } else if (actualPos[1] != this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5 && 
                         actualPos[0] != this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) {

                        if (actualPos[0] != this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) { 
                            if (actualPos[0] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) { 
                                this.player.direction = 0
                                this.player.keyStates.forward = true;
                            } else {
                                this.player.direction = 180
                                this.player.keyStates.forward = true;
                            }
                        }


                        if (actualPos[1] != this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) { 
                            if (actualPos[1] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) { 
                                this.player.direction = 90
                                this.player.keyStates.forward = true;
                            } else {
                                this.player.direction = 270
                                this.player.keyStates.forward = true;
                            }
                        }

                    } else if (actualPos[0] == this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) { 
                        if (actualPos[1] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) {  
                            this.player.direction = 90
                            this.player.keyStates.forward = true;
                        } else {
                            this.player.direction = 270
                            this.player.keyStates.forward = true;
                        }
                    } else if (actualPos[1] == this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) { 
                        if (actualPos[0] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) {        
                            this.player.direction = 0
                            this.player.keyStates.forward = true;
                        } else {
                            this.player.direction = 180
                            this.player.keyStates.forward = true;
                        }
                    } else if (actualPos[0] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) { 
                        if (actualPos[1] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) {        
                            this.player.direction = 90
                            this.player.keyStates.forward = true;
                        } else {
                            this.player.direction = 270
                            this.player.keyStates.forward = true;
                        }
                    } else if (actualPos[1] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][1] + 0.5) { 
                        if (actualPos[0] < this.arrayEstatico[this.arrayEstaticoFloor][this.it][0] + 0.5) {        
                            this.player.direction = 0
                            this.player.keyStates.forward = true;
                        } else {
                            this.player.direction = 180
                            this.player.keyStates.forward = true;
                        }
                    }

                }
            }

            // Update the model animations
            const deltaT = this.clock.getDelta();
            this.animations.update(deltaT);
            let active = false;
            

            // Update the player
            if (!this.animations.actionInProgress) {

                window.addEventListener('keydown', (event) => {
                    if ((event.key === 'a' || event.key === 'A')){
                        this.autoPilot = !this.autoPilot;
                    }
                });


                let infoElement = document.getElementById('info');

                if (!this.maze.foundElevador(this.player.position) && !this.maze.foundPassagem(this.player.position) && infoElement.style.visibility === 'visible') {
                    infoElement.style.visibility = 'hidden';
                    active = false;
                    this.active2 = false;
                }

                // let elevatorElement = document.getElementById('elevatorPainel');

                let coords;
                let coords2;

                if (((coords = this.maze.foundElevador(this.player.position)) != false && infoElement.style.visibility != 'visible') || (coords2 = this.maze.foundElevador(this.player.position) && this.autoPilot)) {

                    infoElement.innerHTML = 'Elevador detetado. Pressiona \'L\'!';
                    infoElement.style.visibility = 'visible';

                    let pisos = [];

                    let mapaPisoSvc = this.mapaPisoService;
                    let dropdownContainer;

                    if(this.autoPilot && !active){
                        active = true;
                        const mapaPisoACarregar = mapaPisoSvc.getMapaPorPiso("B3TT").subscribe(mapaPiso => {
                            coords = [mapaPiso.elevador[0][2] - 1, mapaPiso.elevador[0][1] - 1];
                            //window.alert('Mapa piso: ' + coords);
                            const eventDetail = {
                                mapaPiso: mapaPiso,
                                initialCoords: coords
                            }

                            // Lança o evento (que do lado do component há um método à espera).
                            const event = new CustomEvent('teletransporte', { detail: eventDetail });
                            window.dispatchEvent(event);

                        });
                    }

                    window.addEventListener('keydown', (event) => {
                        if ((event.key === 'l' || event.key === 'L') && !active) {
                            // Vai buscar o elevador referente ao piso.
                            active = true;
                            this.elevadorService.getElevadores().subscribe(elevadores => {
                                elevadores.forEach(elevador => {
                                    for (let i = 0; i < elevador.pisosServidos.length; i++) {
                                        if (elevador.pisosServidos[i] == this.mapaPiso.piso) {
                                            pisos = this.arrayRemove(elevador.pisosServidos, elevador.pisosServidos[i]);

                                            // Abre uma window HTML com a lista de "pisos" para os quais se pode teletransportar.
                                            if (pisos.length > 0 && !dropdownContainer) {
                                                dropdownContainer = document.createElement('div');
                                                dropdownContainer.id = 'pisosDropdown';
                                                dropdownContainer.style.position = 'absolute';
                                                dropdownContainer.style.top = '30vh';
                                                dropdownContainer.style.left = '50vw';
                                                dropdownContainer.style.zIndex = '2';
                                                dropdownContainer.style.background = 'white';
                                                dropdownContainer.style.padding = '10px';
                                                dropdownContainer.style.border = '1px solid black';
                                                dropdownContainer.style.display = 'flex';
                                                dropdownContainer.style.alignItems = 'center';


                                                let label = document.createElement('label');
                                                label.textContent = 'Escolha um piso';
                                                label.style.marginRight = '10px';
                                                dropdownContainer.appendChild(label);

                                                let dropdown = document.createElement('select');
                                                dropdown.id = 'pisoDropdownList';

                                                pisos.forEach(piso => {
                                                    let option = document.createElement('option');
                                                    option.value = piso;
                                                    option.text = piso;
                                                    dropdown.appendChild(option);
                                                });

                                                dropdownContainer.appendChild(dropdown);
                                                dropdownContainer.appendChild(document.createElement('br'));

                                                let submitButton = document.createElement('button');
                                                submitButton.textContent = 'Fechar elevador';
                                                submitButton.addEventListener('click', function () {
                                                    let selectedPiso = dropdown.value;

                                                    const mapaPisoACarregar = mapaPisoSvc.getMapaPorPiso(selectedPiso).subscribe(mapaPiso => {
                                                        coords = [mapaPiso.elevador[0][2] - 1, mapaPiso.elevador[0][1] - 1];
                                                        //window.alert('Mapa piso: ' + coords);
                                                        const eventDetail = {
                                                            mapaPiso: mapaPiso,
                                                            initialCoords: coords
                                                        }

                                                        // Lança o evento (que do lado do component há um método à espera).
                                                        const event = new CustomEvent('teletransporte', { detail: eventDetail });
                                                        window.dispatchEvent(event);

                                                    });


                                                    // Remove the dropdown container from the DOM
                                                    dropdownContainer.remove();
                                                    dropdownContainer = null;
                                                });



                                                dropdownContainer.appendChild(submitButton);

                                                document.body.appendChild(dropdownContainer);

                                                // Add an event listener to handle the selection
                                                dropdown.addEventListener('change', function () {
                                                    // You can perform additional actions on selection change if needed
                                                });

                                                console.log('Dropdown container created.');
                                            }
                                            break;
                                        } else {
                                            console.log('Dropdown container already exists or pisos is empty.');
                                            console.log('Dropdown container:', dropdownContainer);
                                        }
                                    }
                                });
                            });
                        }
                    });







                    // Vai buscar a designação do elevador consoante a sua coordenada.
                    // const mapas = this.mapaPisoService.getMapasPiso();
                    // this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
                    // mapas.subscribe(mapas => {

                    // });

                    // Apresentar o menu para teletransporte.
                }


                // TODO: No componente que instancia o thumb raiser, deve ser injetado o serviço de passagens para passa-lo para aqui e verificar
                // qual o piso que a passagem leva.
                // O parametro que recebe o mapa piso do thumb raiser vai ter que receber mais coisas, nomeadamente, os elevadores e passagens (elevators, exits).
                let coordsPiso;

                if ((coordsPiso = this.maze.foundPassagem(this.player.position)) != false && !this.active2) {
                    let passagens = [];
                    this.active2 = true;
                    let mapaPisoSvc = this.mapaPisoService;
                    this.passagemService.getPassagens().subscribe(passagensGeral => {
                        passagensGeral.forEach(passagem => {
                            if (passagem.pisoA === this.mazeParameters.mazeData.piso || passagem.pisoB === this.mazeParameters.mazeData.piso) {
                                passagens.push(passagem);
                            }
                        });
                        let selectedPiso;
                        let coordsCorredor;
                        let passagemNome;
                        let found = false;
                        for (let i = 0; i < passagens.length; i++) {
                            if (passagens[i].designacao === this.mazeParameters.mazeData.exits[i][0]) {

                                if(found)
                                    break;
                                // Transforma as coordenadas do jogador em índices do mapa.
                                coordsCorredor = this.maze.cartesianToCell(this.player.position);

                                if (passagens[i].pisoA == this.mazeParameters.mazeData.piso){
                                    for(let j=0;j<this.mazeParameters.mazeData.exits.length;j++){
                                        if(found)
                                            break;
                                        const cordsB = this.mazeParameters.mazeData.exits[j];
                                        if(coordsCorredor[1] == parseInt(cordsB[1]-1) && coordsCorredor[0] == parseInt(cordsB[2]-1)){
                                            selectedPiso = passagens[i].pisoB;
                                            found = true;
                                            passagemNome = this.mazeParameters.mazeData.exits[j][0];
                                            break;
                                        }
                                    }
                                }
                                else if(passagens[i].pisoB == this.mazeParameters.mazeData.piso){
                                    for(let j=0;j<this.mazeParameters.mazeData.exits.length;j++){
                                        if(found)
                                            break;
                                        const cordsB = this.mazeParameters.mazeData.exits[j];
                                        if(coordsCorredor[1] == parseInt(cordsB[1]) && coordsCorredor[0] == parseInt(cordsB[2])){
                                            selectedPiso = passagens[i].pisoA;
                                            found = true;
                                            passagemNome = this.mazeParameters.mazeData.exits[j][0];
                                            break;
                                        }
                                    }
                                }
                            }

                        }

                        if(found){

                            let coords;

                            /*
                            const mapaPisoObservable = mapaPisoSvc.getMapaPorPiso(selectedPiso);

                            const subscription = mapaPisoObservable.pipe(
                            map(mapaPiso => {
                                for (let i = 0; i < mapaPiso.saidas.length; i++) {
                                if (mapaPiso.saidas[i][0] === passagemNome) {
                                    return [mapaPiso.saidas[i][2], mapaPiso.saidas[i][1]];
                                }
                                }
                                return null; // or any default value if not found
                            })
                            ).subscribe(result => {
                            if (result) {
                                coords = result;
                                alert('Coords: ' + coords);
                                // Use coords or perform other operations here
                            } else {
                                alert('Passagem not found');
                            }

                            // You can use coords or perform other operations here as well
                            });

                            //subscription.unsubscribe();

                            const eventDetail = {
                                mapaPiso: mapaPiso,
                                initialCoords: coords
                            } 

                            // Lança o evento (que do lado do component há um método à espera).
                            const event = new CustomEvent('teletransportePiso', { detail: eventDetail });
                            window.dispatchEvent(event);*/
                            
                            const mapaPisoACarregar = mapaPisoSvc.getMapaPorPiso(selectedPiso).subscribe(mapaPiso => {
                                let b = false;
                                for(let i=0;i<mapaPiso.saidas.length;i++){
                                    if(b)
                                        break;
                                    //alert('Saídas: ' + mapaPiso.saidas);
                                    alert('Designacao: ' + mapaPiso.saidas[i][0] + 'Y: ' + mapaPiso.saidas[i][1])
                                    const a = mapaPiso.saidas[i][0];
                                    if(a == passagemNome){
                                        coords = [mapaPiso.saidas[i][2], mapaPiso.saidas[i][1]];
                                        b = true;
                                    }
                                }

                                //coords = [mapaPiso.saidas[0][2] - 1, mapaPiso.saidas[0][1] - 1];
                                //window.alert('Mapa piso: ' + coords);
                                if(!b){
                                    const eventDetail = {
                                        mapaPiso: mapaPiso,
                                        initialCoords: coords
                                    } 

                                    // Lança o evento (que do lado do component há um método à espera).
                                    const event = new CustomEvent('teletransportePiso', { detail: eventDetail });
                                    window.dispatchEvent(event);
                                }
                            });
                            
                        }

                        this.active2 = false;
                    });
                }

                // Check if the player found the exit
                if (this.maze.foundExit(this.player.position)) {
                    this.finalSequence();
                }
                else {
                    /*let activeColisionVertical = false;
                    let activeColisionHorizontal = false;

                    if (!this.collisionDoorVertical(this.player.position)) {
                        activeColisionVertical = false;
                    }
                    if (!this.collisionDoorHorizontal(this.player.position)) {
                        activeColisionHorizontal = false;
                    }*/

                    let coveredDistance = this.player.walkingSpeed * deltaT;
                    let directionIncrement = this.player.turningSpeed * deltaT;
                    if (this.player.keyStates.run) {
                        coveredDistance *= this.player.runningFactor;
                        directionIncrement *= this.player.runningFactor;
                    }
                    if (this.player.keyStates.left) {
                        this.player.direction += directionIncrement;
                    }
                    else if (this.player.keyStates.right) {
                        this.player.direction -= directionIncrement;
                    }
                    const direction = THREE.MathUtils.degToRad(this.player.direction);
                    if (this.player.keyStates.backward) {
                        const newPosition = new THREE.Vector3(-coveredDistance * Math.sin(direction), 0.0, -coveredDistance * Math.cos(direction)).add(this.player.position);
                        if (this.collision(newPosition)) {
                            //this.animations.fadeToAction("Death", 0.2);
                        }
                        else {
                            this.animations.fadeToAction(this.player.keyStates.run ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                        if (this.collisionDoorHorizontal(newPosition)) {
                            let door = this.doorAtMoment();
                            const originalPosition = { x: door[1].x };
                            const initialPosition = { x: door[0].position.x };
                            const targetPosition = { x: initialPosition.x - 1.0 };

                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    door[0].position.x = initialPosition.x;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ x: originalPosition.x }, 1500)
                                        .onUpdate(() => {
                                            door[0].position.x = initialPosition.x;
                                        })
                                        .start();
                                })
                                .start();
                        }
                        if (this.collisionDoorVertical(newPosition)) {
                            let door = this.doorAtMoment();
                            const originalPosition = { z: door[1].z };
                            const initialPosition = { z: door[0].position.z };
                            const targetPosition = { z: initialPosition.z - 1.0 };
                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    door[0].position.z = initialPosition.z;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ z: originalPosition.z }, 1500)
                                        .onUpdate(() => {
                                            door[0].position.z = initialPosition.z;
                                        })
                                        .start();
                                })
                                .start();
                        }

                        if (this.collisionElevatorHorizontal(newPosition)) {
                            let elevator = this.elevatorAtMoment();
                            const originalPosition = { x: elevator[1].x };
                            const initialPosition = { x: elevator[0].position.x };
                            const targetPosition = { x: initialPosition.x - 1.0 };

                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    elevator[0].position.x = initialPosition.x;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ x: originalPosition.x }, 1500)
                                        .onUpdate(() => {
                                            elevator[0].position.x = initialPosition.x;
                                        })
                                        .start();
                                })
                                .start();
                        }
                        if (this.collisionElevatorVertical(newPosition)) {
                            let elevator = this.elevatorAtMoment();
                            const originalPosition = { z: elevator[1].z };
                            const initialPosition = { z: elevator[0].position.z };
                            const targetPosition = { z: initialPosition.z - 1.0 };
                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    elevator[0].position.z = initialPosition.z;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ z: originalPosition.z }, 1500)
                                        .onUpdate(() => {
                                            elevator[0].position.z = initialPosition.z;
                                        })
                                        .start();
                                })
                                .start();
                        }
                    }
                    else if (this.player.keyStates.forward) {
                        const newPosition = new THREE.Vector3(coveredDistance * Math.sin(direction), 0.0, coveredDistance * Math.cos(direction)).add(this.player.position);
                        if (this.collision(newPosition)) {
                            //this.animations.fadeToAction("Death", 0.2);
                        }
                        else {
                            this.animations.fadeToAction(this.player.keyStates.run ? "Running" : "Walking", 0.2);
                            this.player.position = newPosition;
                        }
                        if (this.collisionDoorHorizontal(newPosition)) {
                            //activeColisionHorizontal = true;
                            let door = this.doorAtMoment();
                            //if (activeColisionHorizontal) {
                            const originalPosition = { x: door[1].x };
                            const initialPosition = { x: door[0].position.x };
                            const targetPosition = { x: initialPosition.x - 1.0 };
                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    door[0].position.x = initialPosition.x;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ x: originalPosition.x }, 1500) // Reverse to the initial position
                                        .onUpdate(() => {
                                            door[0].position.x = initialPosition.x;
                                        })
                                        .start();
                                })
                                .start();
                            //}
                        }
                        if (this.collisionDoorVertical(newPosition)) {
                            //activeColisionVertical = true;
                            let door = this.doorAtMoment();
                            //if (activeColisionVertical) {
                            const originalPosition = { z: door[1].z };
                            const initialPosition = { z: door[0].position.z };
                            const targetPosition = { z: initialPosition.z - 1.0 };

                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    door[0].position.z = initialPosition.z;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ z: originalPosition.z }, 1500)
                                        .onUpdate(() => {
                                            door[0].position.z = initialPosition.z;
                                        })
                                        .start();
                                })
                                .start();
                            //}
                        }

                        if (this.collisionElevatorHorizontal(newPosition)) {
                            let elevator = this.elevatorAtMoment();
                            const originalPosition = { x: elevator[1].x };
                            const initialPosition = { x: elevator[0].position.x };
                            const targetPosition = { x: initialPosition.x - 1.0 };

                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    elevator[0].position.x = initialPosition.x;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ x: originalPosition.x }, 1500)
                                        .onUpdate(() => {
                                            elevator[0].position.x = initialPosition.x;
                                        })
                                        .start();
                                })
                                .start();
                        }
                        if (this.collisionElevatorVertical(newPosition)) {
                            let elevator = this.elevatorAtMoment();
                            const originalPosition = { z: elevator[1].z };
                            const initialPosition = { z: elevator[0].position.z };
                            const targetPosition = { z: initialPosition.z - 1.0 };
                            const tween = new TWEEN.Tween(initialPosition)
                                .to(targetPosition, 1500)
                                .onUpdate(() => {
                                    elevator[0].position.z = initialPosition.z;
                                })
                                .onComplete(() => {
                                    const reverse = new TWEEN.Tween(initialPosition)
                                        .to({ z: originalPosition.z }, 1500)
                                        .onUpdate(() => {
                                            elevator[0].position.z = initialPosition.z;
                                        })
                                        .start();
                                })
                                .start();
                        }
                    }
                    else if (this.player.keyStates.jump) {
                        this.animations.fadeToAction("Jump", 0.2);
                    }
                    else if (this.player.keyStates.yes) {
                        this.animations.fadeToAction("Yes", 0.2);
                    }
                    else if (this.player.keyStates.no) {
                        this.animations.fadeToAction("No", 0.2);
                    }
                    else if (this.player.keyStates.wave) {
                        this.animations.fadeToAction("Wave", 0.2);
                    }
                    else if (this.player.keyStates.punch) {
                        this.animations.fadeToAction("Punch", 0.2);
                    }
                    else if (this.player.keyStates.thumbsUp) {
                        this.animations.fadeToAction("ThumbsUp", 0.2);
                    }
                    else {
                        this.animations.fadeToAction("Idle", this.animations.activeName != "Death" ? 0.2 : 0.6);
                    }
                    this.player.object.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
                    this.player.object.rotation.y = direction - this.player.initialDirection;
                }
            }

            // Update first-person, third-person and top view cameras parameters (player direction and target)
            this.firstPersonViewCamera.playerDirection = this.player.direction;
            this.thirdPersonViewCamera.playerDirection = this.player.direction;
            this.topViewCamera.playerDirection = this.player.direction;
            const target = new THREE.Vector3(this.player.position.x, this.player.position.y + this.player.eyeHeight, this.player.position.z);
            this.firstPersonViewCamera.setTarget(target);
            this.thirdPersonViewCamera.setTarget(target);
            this.topViewCamera.setTarget(target);

            // Update statistics
            this.statistics.update();

            // Render primary viewport(s)
            this.renderer.clear();

            if (this.fog.enabled) {
                this.scene3D.fog = this.fog.object;
            }
            else {
                this.scene3D.fog = null;
            }
            let cameras;
            if (this.multipleViewsCheckBox.checked) {
                cameras = [this.fixedViewCamera, this.firstPersonViewCamera, this.thirdPersonViewCamera, this.topViewCamera];
            }
            else {
                cameras = [this.activeViewCamera];
            }
            for (const camera of cameras) {
                this.player.object.visible = (camera != this.firstPersonViewCamera);
                const viewport = camera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, camera.object);
                this.renderer.render(this.scene2D, this.camera2D);
                this.renderer.clearDepth();
            }

            // Render secondary viewport (mini-map)
            if (this.miniMapCheckBox.checked) {
                this.scene3D.fog = null;
                this.player.object.visible = true;
                const viewport = this.miniMapCamera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, this.miniMapCamera.object);
                this.renderer.render(this.scene2D, this.camera2D);
            }
        }
    }
    destroy() {
        this.scene3D.children.forEach(child => this.scene3D.remove(child));
        this.scene2D.children.forEach(child => this.scene2D.remove(child));
        this.renderer.dispose();
        this.renderer.domElement.remove();
    }

    doorAtMoment() {
        this.mapPortas = this.maze.arrayPortas();
        const epsilon = 1.0;
        for (let [key, value] of this.mapPortas) {
            if (Math.abs(this.player.position.x - key.position.x) < epsilon && Math.abs(this.player.position.z - key.position.z) < epsilon) {
                return [key, value];
            }
        }

        return false;
    }

    elevatorAtMoment() {
        this.mapElevators = this.maze.arrayElevators();
        const epsilon = 1.0;
        for (let [key, value] of this.mapElevators) {
            if (Math.abs(this.player.position.x - key.position.x) < epsilon && Math.abs(this.player.position.z - key.position.z) < epsilon) {
                return [key, value];
            }
        }
        return false;
    }
}