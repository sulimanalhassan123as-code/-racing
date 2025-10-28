// === City Skyline (buildings glow) ===
  const city = new THREE.Group();
  for (let i = 0; i < 80; i++) {
    const buildingHeight = Math.random() * 5 + 3;
    const geometry = new THREE.BoxGeometry(1, buildingHeight, 1);
    const material = new THREE.MeshStandardMaterial({
      emissive: 0x00aaff,
      emissiveIntensity: Math.random() * 0.5 + 0.3,
      color: 0x111111,
    });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(
      (Math.random() - 0.5) * 80,
      buildingHeight / 2,
      (Math.random() - 0.5) * 200
    );
    city.add(building);
  }
  scene.add(city);

  // === Road Curving Motion ===
  function animateCurve() {
    roadOffset += 0.03;
    const curveFactor = Math.sin(roadOffset * 0.3) * 0.5;
    road.rotation.z = curveFactor * 0.05;
  }

  // === Animate Function ===
  function animate() {
    requestAnimationFrame(animate);

    if (car) {
      if (moveLeft) car.position.x -= 0.1;
      if (moveRight) car.position.x += 0.1;
      if (accelerating) speed += 0.005;
      else speed *= 0.98;

      car.position.z -= speed;
      camera.position.z -= speed * 0.8;
      camera.position.x = car.position.x * 0.5;
      camera.lookAt(car.position.x, 0, car.position.z - 10);
    }

    // Twinkling stars
    stars.children.forEach((s, i) => {
      s.material.color.setHSL((Math.sin(Date.now() * 0.001 + i) + 1) / 2, 1, 0.8);
    });

    animateCurve();
    renderer.render(scene, camera);
  }

  animate();
  </script>
</body>
</html>
