import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";
import cloneDeep from 'lodash/cloneDeep';
import Elevator from "./elevator.js";
//import * as TWEEN from '@tweenjs/tween.js';

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {


    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.mazeData.map;
            this.size = description.mazeData.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.mazeData.initialPosition);
            this.initialDirection = description.mazeData.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.mazeData.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.mazeData.groundTextureUrl, size: description.mazeData.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: description.mazeData.wallTextureUrl });

            //Create a door
            //let doorSize = { width: 0.654, height: 1.686, depth: 0.035, gap: 0.0465 };
            this.door = new Door({ textureUrl: "../../assets/textures/door_japanese.jpg"});

            this.elevator = new Elevator({ textureUrl: "../../assets/textures/elevator.jpg"});

            this.mapDoorPosition = new Map();
            this.mapElevatorPosition = new Map();

            // Build the maze
            let wallObject;
            let elevatorObject;
            let doorObject;
            let passagemObject;
            let state = false;
            for (let i = 0; i <= description.mazeData.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.mazeData.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    //Vertical
                    if (description.mazeData.map[j][i] == 1 || description.mazeData.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.mazeData.size.width / 2.0, 0.5, j - description.mazeData.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                    //Horizontal
                    if (description.mazeData.map[j][i] == 2 || description.mazeData.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.5, j - description.mazeData.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    //Elevador vertical
                    if (description.mazeData.map[j][i] == 4) {
                        elevatorObject = this.elevator.object.clone();
                        elevatorObject.rotateY(Math.PI / 2.0);
                        elevatorObject.position.set(i - description.mazeData.size.width / 2.0, 0.5, j - description.mazeData.size.height / 2.0 + 0.5);
                        //const positionKey = JSON.stringify(doorObject.position);
                        const positionKey = cloneDeep(elevatorObject.position);
                        this.mapElevatorPosition.set(elevatorObject, positionKey);
                        this.object.add(elevatorObject);
                    }
                    //Elevador horizontal
                    if (description.mazeData.map[j][i] == 5) {
                        elevatorObject = this.elevator.object.clone();
                        elevatorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.5, j - description.mazeData.size.height / 2.0);
                        //const positionKey = JSON.stringify(doorObject.position);
                        const positionKey = cloneDeep(elevatorObject.position);
                        this.mapElevatorPosition.set(elevatorObject, positionKey);
                        this.object.add(elevatorObject);
                    }
                    // Porta vertical
                    if (description.mazeData.map[j][i] == 6) {
                        doorObject = this.door.object.clone();
                        doorObject.rotateY(Math.PI / 2.0);
                        doorObject.position.set(i - description.mazeData.size.width / 2.0, 0.5, j - description.mazeData.size.height / 2.0 + 0.5);
                        //const positionKey = JSON.stringify(doorObject.position);
                        const positionKey = cloneDeep(doorObject.position);
                        this.mapDoorPosition.set(doorObject, positionKey);
                        this.object.add(doorObject);
                    }
                    // Porta horizontal
                    if (description.mazeData.map[j][i] == 7) {
                        doorObject = this.door.object.clone();
                        doorObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.5, j - description.mazeData.size.height / 2.0);
                        //const positionKey = JSON.stringify(doorObject.position);
                        const positionKey = cloneDeep(doorObject.position);
                        this.mapDoorPosition.set(doorObject, positionKey);
                        this.object.add(doorObject);
                    }
                    //Corredor vertical
                    if (description.mazeData.map[j][i] == 8) {
                        this.passagem = new Wall({ textureUrl: "../../assets/textures/passagem.jpg" });
                        passagemObject = this.passagem.object.clone();
                        passagemObject.rotateY(Math.PI / 2.0);
                        passagemObject.position.set(i - description.mazeData.size.width / 2.0, 0.5, j - description.mazeData.size.height / 2.0 + 0.5);
                        this.object.add(passagemObject);
                    }
                    //Corredor horizontal
                    if (description.mazeData.map[j][i] == 9) {
                        this.passagem = new Wall({ textureUrl: "../../assets/textures/passagem.jpg" });
                        passagemObject = this.passagem.object.clone();
                        passagemObject.position.set(i - description.mazeData.size.width / 2.0 + 0.5, 0.5, j - description.mazeData.size.height / 2.0);
                        this.object.add(passagemObject);
                    }

                }
            }

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        /*loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );*/
        this.onLoad(parameters);
    }

    cartesianToCellDecimal(position) {
        let first = position.z / this.scale.z + this.size.height / 2.0 
        let second = position.x / this.scale.x + this.size.width / 2.0 
        return [ first.toFixed(1), second.toFixed(1)];
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {//|| this.map[indices[0]][indices[1]] == 6|| this.map[indices[0]][indices[1]] == 7) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {//|| this.map[indices[0]][indices[1]] == 6|| this.map[indices[0]][indices[1]] == 7) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {//|| this.map[indices[0]][indices[1]] == 6|| this.map[indices[0]][indices[1]] == 7) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {//|| this.map[indices[0]][indices[1]] == 6|| this.map[indices[0]][indices[1]] == 7) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };


    // Está numa posição de elevador.
    foundElevador(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 4 || this.map[indices[0]][indices[1]] == 5) {
            return [position.x, position.z];
        }
        return false;
    }

    // Está numa posição de passagem externa.
    foundPassagem(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 9) {
            return [position.x, position.z];
        }
        return false;
    }

    foundPorta(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 6 || this.map[indices[0]][indices[1]] == 7) {
            return [position.x, position.z];
        }
        return false;
    }

    distanceToWest(position,index) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == index) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }
    distanceToEast(position,index) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == index) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }
    distanceToNorth(position,index) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == index) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }
    distanceToSouth(position,index) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == index) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    } 

    arrayPortas() {
        return this.mapDoorPosition;
        // Or, if you want an array of key-value pairs:
        // return Array.from(this.mapDoorPosition.entries());
    }

    arrayElevators() {
        return this.mapElevatorPosition;
        // Or, if you want an array of key-value pairs:
        // return Array.from(this.mapDoorPosition.entries());
    }
}
