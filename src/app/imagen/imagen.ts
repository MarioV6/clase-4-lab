import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Login } from '../login/login';
@Component({
  selector: 'app-imagen',
  standalone: true,
  templateUrl: './imagen.html',
  styleUrl: './imagen.scss',
})
export class Imagen implements AfterViewInit {

  @ViewChild('container', { static: true }) container!: ElementRef;
  username = '';
  password = '';
  login() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
  ngAfterViewInit() {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const distance = 5; // distancia de la cámara al plano
    camera.position.z = distance;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.nativeElement.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    // calcular tamaño exacto del plano para llenar la pantalla
    const fov = camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * distance;
    const width = height * (window.innerWidth / window.innerHeight);

    const loader = new THREE.TextureLoader();
    loader.load('/fondoA.jpg', (texture) => {

      texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(50, 64, 64);
geometry.scale(-1, 1, 1); // invertir normales, para que la cámara vea desde dentro

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -distance); // justo frente a la cámara

      scene.add(plane);

    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

}
