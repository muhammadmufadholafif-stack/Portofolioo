/**
 * ==========================================================================
 * 3D DATACENTER SERVER RACK (THREE.JS COMPONENT)
 * Diadopsi 1:1 dari Portal Resmi TKJ SMK Islam 1 Blitar (tkj.smkislam1blitar.sch.id)
 * ==========================================================================
 * 100% Offline-Ready menggunakan three.min.js lokal.
 * Fitur:
 * - 10 Rack Units (Debian 12 Storage, MikroTik Router, Proxmox Compute)
 * - LED berkedip realistis & VU meter aktivitas
 * - Kabel patch jaringan 3D melengkung dengan pulsa paket data mengalir
 * - Kipas pendingin atas berputar 3D
 * - Pemindai holografik laser scanning & cincin lantai bercahaya
 * - Drag mouse / touch 360° interaktif + auto-orbiting saat idle
 */

function initServer3D() {
  const container = document.getElementById("server-3d-canvas-container");
  if (!container || typeof THREE === "undefined") return;

  const width = container.clientWidth || 360;
  const height = container.clientHeight || 420;

  // 1. Scene & Camera
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(24, 15, 27);
  camera.lookAt(0, 7.5, 0);

  // 2. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // 3. Pencahayaan (Lighting)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  // Directional Light utama (Key light)
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
  dirLight1.position.set(18, 32, 22);
  dirLight1.castShadow = true;
  dirLight1.shadow.mapSize.width = 1024;
  dirLight1.shadow.mapSize.height = 1024;
  dirLight1.shadow.bias = -0.0005;
  scene.add(dirLight1);

  // Rim light Cyan dari belakang-kiri
  const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 3.4);
  dirLight2.position.set(-24, 20, -18);
  scene.add(dirLight2);

  // Fill light Biru
  const dirLight3 = new THREE.DirectionalLight(0x60a5fa, 1.8);
  dirLight3.position.set(-15, 12, 24);
  scene.add(dirLight3);

  // Point light bawah & atas
  const pointLight1 = new THREE.PointLight(0x0284c7, 3.5, 35);
  pointLight1.position.set(0, 0.8, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x38bdf8, 2.2, 25);
  pointLight2.position.set(0, 16.5, 0);
  scene.add(pointLight2);

  // 4. Grup Utama Rak Server & Dudukan Lantai
  const rackGroup = new THREE.Group();
  scene.add(rackGroup);

  const floorGroup = new THREE.Group();
  rackGroup.add(floorGroup);

  // Cincin Neon di Lantai
  const ring1 = new THREE.Mesh(
    new THREE.RingGeometry(8.2, 8.38, 64),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
  );
  ring1.rotation.x = -Math.PI / 2;
  ring1.position.y = 0.05;
  floorGroup.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(6.4, 6.58, 48),
    new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ring2.rotation.x = -Math.PI / 2;
  ring2.position.y = 0.04;
  floorGroup.add(ring2);

  const ring3 = new THREE.Mesh(
    new THREE.RingGeometry(4.7, 4.88, 32),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
  );
  ring3.rotation.x = -Math.PI / 2;
  ring3.position.y = 0.03;
  floorGroup.add(ring3);

  // Radial Bayangan Lantai
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext("2d");
  const radGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
  radGrad.addColorStop(0, "rgba(0, 0, 0, 0.55)");
  radGrad.addColorStop(0.5, "rgba(0, 20, 60, 0.25)");
  radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  sCtx.fillStyle = radGrad;
  sCtx.fillRect(0, 0, 128, 128);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, opacity: 0.7 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.01;
  floorGroup.add(shadowPlane);

  // 5. Rangka & Tiang Rack (Framework)
  const rackH = 15.6;
  const halfW = 8.6 / 2; // 4.3
  const halfD = 7.6 / 2; // 3.8
  const halfH = rackH / 2; // 7.8

  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x0b0f19, metalness: 0.95, roughness: 0.22 });
  const chromeMetalMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.98, roughness: 0.12 });
  const postGeom = new THREE.BoxGeometry(0.42, rackH, 0.42);
  const railGeom = new THREE.BoxGeometry(0.12, 14.6, 0.18);

  const postPositions = [
    [-4.3, halfH, -3.8],
    [halfW, halfH, -3.8],
    [-4.3, halfH, halfD],
    [halfW, halfH, halfD]
  ];

  postPositions.forEach(([px, py, pz]) => {
    const post = new THREE.Mesh(postGeom, darkMetalMat);
    post.castShadow = true;
    post.position.set(px, py, pz);
    rackGroup.add(post);

    if (pz > 0) {
      const rail = new THREE.Mesh(railGeom, chromeMetalMat);
      rail.position.set(px > 0 ? px - 0.25 : px + 0.25, py, pz - 0.25);
      rackGroup.add(rail);
    }
  });

  // Top & Bottom Rack Caps
  const capMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.92, roughness: 0.25 });
  const capGeom = new THREE.BoxGeometry(9.3, 0.55, 8.3);

  const topCap = new THREE.Mesh(capGeom, capMat);
  topCap.position.set(0, 15.88, 0);
  topCap.castShadow = true;
  rackGroup.add(topCap);

  const bottomCap = new THREE.Mesh(capGeom, capMat);
  bottomCap.position.set(0, 0.28, 0);
  bottomCap.receiveShadow = true;
  rackGroup.add(bottomCap);

  // Kipas Exhaust Atas (Dual Turbines)
  const fanRotors = [];
  const fanPositions = [-2.2, 2.2];
  const fanWireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
  const fanBladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });

  fanPositions.forEach(fx => {
    const fanRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 16, 32), fanWireMat);
    fanRing.rotation.x = Math.PI / 2;
    fanRing.position.set(fx, 16.18, 0);
    rackGroup.add(fanRing);

    const rotor = new THREE.Group();
    rotor.position.set(fx, 16.17, 0);
    rotor.rotation.x = Math.PI / 2;

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16), fanBladeMat);
    rotor.add(hub);

    for (let b = 0; b < 7; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.22), bladeBladeMat(fanBladeMat));
      const angle = (b / 7) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55);
      blade.rotation.y = angle + 0.4;
      rotor.add(blade);
    }

    rackGroup.add(rotor);
    fanRotors.push(rotor);
  });

  function bladeBladeMat(base) {
    return base;
  }

  // Panel Kaca Transparan Samping (Kiri & Kanan)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.22,
    roughness: 0.08,
    metalness: 0.15,
    transmission: 0.65,
    ior: 1.45
  });
  const glassGeom = new THREE.BoxGeometry(0.08, 14.8, 7.0);

  const glassLeft = new THREE.Mesh(glassGeom, glassMat);
  glassLeft.position.set(-4.2, halfH, 0);
  rackGroup.add(glassLeft);

  const glassRight = new THREE.Mesh(glassGeom, glassMat);
  glassRight.position.set(4.2, halfH, 0);
  rackGroup.add(glassRight);

  // 6. 10 Unit Server Blades (Storage, Switch, Compute)
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.28 });
  const faceplateMat = new THREE.MeshStandardMaterial({ color: 0x030712, metalness: 0.95, roughness: 0.15 });
  const caddyMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.85, roughness: 0.25 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });

  const blinkLeds = [];
  const vuMeters = [];

  for (let e = 0; e < 10; e++) {
    const bladeY = 1.35 + e * 1.38;
    const isSwitch = (e === 4 || e === 7);
    const isStorage = (e === 1 || e === 2 || e === 8);
    const isCompute = (e === 0 || e === 3 || e === 6 || e === 9);

    // Bodi Server
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(7.8, 1.15, 7.0), chassisMat);
    chassis.position.set(0, bladeY, 0);
    chassis.castShadow = true;
    rackGroup.add(chassis);

    // Plat Muka Depan
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(7.75, 1.1, 0.14), faceplateMat);
    bezel.position.set(0, bladeY, 3.54);
    rackGroup.add(bezel);

    if (isStorage) {
      // 8 Drive Caddies
      for (let d = 0; d < 8; d++) {
        const caddy = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.8, 0.1), caddyMat);
        const cx = -2.8 + d * 0.8;
        caddy.position.set(cx, bladeY, 3.62);
        rackGroup.add(caddy);

        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.06), handleMat);
        handle.position.set(cx - 0.24, bladeY, 3.68);
        rackGroup.add(handle);

        // LED Hijau Berkedip (0x10b981)
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const led = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), ledMat);
        led.position.set(cx + 0.22, bladeY + 0.26, 3.68);
        rackGroup.add(led);

        blinkLeds.push({ mat: ledMat, type: "blink", speed: 0.005 + d * 0.002, color: 0x10b981 });
      }
    } else if (isSwitch) {
      // 24 Port Gigabit RJ45 (2 baris x 12 kolom)
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 12; col++) {
          const port = new THREE.Mesh(
            new THREE.BoxGeometry(0.24, 0.22, 0.08),
            new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.4 })
          );
          const px = -2.7 + col * 0.46;
          const py = bladeY + (row === 0 ? 0.16 : -0.16);
          port.position.set(px, py, 3.62);
          rackGroup.add(port);

          if ((col + row) % 2 === 0) {
            const portLedMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
            const portLed = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), portLedMat);
            portLed.position.set(px, py + 0.15, 3.67);
            rackGroup.add(portLed);

            blinkLeds.push({ mat: portLedMat, type: "pulse", speed: 0.008 + col * 0.003, color: 0x38bdf8 });
          }
        }
      }
    } else if (isCompute) {
      // Kisi-kisi Ventilasi Horisontal
      for (let s = 0; s < 5; s++) {
        const slat = new THREE.Mesh(
          new THREE.BoxGeometry(3.6, 0.06, 0.04),
          new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.4 })
        );
        slat.position.set(-1.0, bladeY - 0.25 + s * 0.12, 3.62);
        rackGroup.add(slat);
      }

      // VU Meter 6 Segmen LED
      const segments = [];
      for (let seg = 0; seg < 6; seg++) {
        const segColor = (seg < 4) ? 0x38bdf8 : (seg === 4 ? 0x10b981 : 0xf59e0b);
        const segMat = new THREE.MeshBasicMaterial({ color: segColor });
        const segMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.05), segMat);
        segMesh.position.set(1.4 + seg * 0.22, bladeY, 3.62);
        rackGroup.add(segMesh);
        segments.push(segMat);
      }
      vuMeters.push({ segments, speed: 0.004 + e * 0.002, offset: e });
    }

    // Tombol Power Indicator
    const pwrMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pwrButton = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), pwrMat);
    pwrButton.position.set(3.2, bladeY + 0.25, 3.64);
    rackGroup.add(pwrButton);
    blinkLeds.push({ mat: pwrMat, type: "pulse", speed: 0.003 + e * 0.001, color: 0x38bdf8 });
  }

  // 7. Kabel Patch Jaringan Melengkung & Pulsa Data
  const cableBlue = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.3 });
  const cableCyan = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.5, roughness: 0.3 });
  const cableAmber = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 });

  const cableRoutes = [
    { points: [[-2.2, 6.87, 3.65], [-3.5, 6.37, 4.15], [-2.4, 2.73, 3.65]], mat: cableBlue, pulseColor: 0x38bdf8 },
    { points: [[-1.4, 6.87, 3.65], [-3.8, 5.97, 4.30], [-1.8, 4.11, 3.65]], mat: cableCyan, pulseColor: 0x67e8f9 },
    { points: [[0.8, 11.01, 3.65], [3.6, 10.32, 4.25], [1.5, 8.25, 3.65]], mat: cableAmber, pulseColor: 0xfbbf24 },
    { points: [[1.8, 11.01, 3.65], [3.9, 8.94, 4.35], [2.4, 5.49, 3.65]], mat: cableBlue, pulseColor: 0x60a5fa },
    { points: [[-0.4, 11.01, 3.65], [3.3, 12.67, 4.15], [0.6, 13.77, 3.65]], mat: cableCyan, pulseColor: 0x38bdf8 }
  ];

  const pulsePackets = [];
  cableRoutes.forEach(route => {
    const curve = new THREE.CatmullRomCurve3(route.points.map(p => new THREE.Vector3(...p)));
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, 0.07, 8, false), route.mat);
    rackGroup.add(tube);

    const pulseMat = new THREE.MeshBasicMaterial({ color: route.pulseColor });
    const pulseNode = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), pulseMat);
    rackGroup.add(pulseNode);
    pulsePackets.push({ mesh: pulseNode, curve, progress: Math.random(), speed: 0.006 });
  });

  // 8. Pemindai Laser Holografik Naik-Turun (Scanline)
  const scanPlane = new THREE.PlaneGeometry(9.2, 8.2);
  const scanMesh = new THREE.Mesh(
    scanPlane,
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
  );
  scanMesh.rotation.x = -Math.PI / 2;
  scanMesh.position.y = 8;
  rackGroup.add(scanMesh);

  const scanEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(scanPlane),
    new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
  );
  scanEdge.rotation.x = -Math.PI / 2;
  scanEdge.position.y = 8;
  rackGroup.add(scanEdge);

  // 9. Cyber Dust / Floating Data Motes
  const moteCoords = new Float32Array(420);
  for (let m = 0; m < 140; m++) {
    moteCoords[m * 3] = (Math.random() - 0.5) * 26;
    moteCoords[m * 3 + 1] = Math.random() * 20 - 1;
    moteCoords[m * 3 + 2] = (Math.random() - 0.5) * 26;
  }
  const moteGeom = new THREE.BufferGeometry();
  moteGeom.setAttribute("position", new THREE.BufferAttribute(moteCoords, 3));
  const motes = new THREE.Points(
    moteGeom,
    new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.28, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending })
  );
  rackGroup.add(motes);

  // Posisi awal rak
  rackGroup.position.set(0, -1.2, 0);
  rackGroup.rotation.y = -Math.PI / 6.5;

  // 10. Interaksi Drag Mouse & Touch (Orbit 360 Derajat)
  let targetRotY = -Math.PI / 6.5;
  let targetRotX = 0;
  let isDragging = false;
  let isIntersecting = true;
  let startX = 0;
  let startY = 0;
  let baseAutoRotY = -Math.PI / 6.5;
  let autoOrbit = true;
  let autoOrbitTimer = null;

  function resetAutoOrbit() {
    clearTimeout(autoOrbitTimer);
    autoOrbitTimer = setTimeout(() => {
      autoOrbit = true;
    }, 2500);
  }

  function onMouseDown(e) {
    isDragging = true;
    autoOrbit = false;
    clearTimeout(autoOrbitTimer);
    startX = e.clientX;
    startY = e.clientY;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    targetRotY += dx * 0.008;
    targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + dy * 0.005));
    startX = e.clientX;
    startY = e.clientY;
  }

  function onMouseUp() {
    isDragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    resetAutoOrbit();
  }

  // Hover tilt ringan
  function onContainerMouseMove(e) {
    if (!isIntersecting || isDragging) return;
    const rect = container.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    targetRotX = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.18;
    if (!autoOrbit) {
      targetRotY = baseAutoRotY + normX * 0.4;
    }
  }

  function onContainerMouseLeave() {
    if (!isDragging) {
      targetRotX = 0;
    }
  }

  // Dukungan Sentuhan Layar HP (Touch Event)
  let isTouching = false;
  let touchAxis = null;
  let touchStartX = 0;
  let touchStartY = 0;

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isTouching = true;
      touchAxis = null;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      startX = touchStartX;
      startY = touchStartY;
    }
  }

  function onTouchMove(e) {
    if (!isTouching || e.touches.length !== 1) return;
    const curX = e.touches[0].clientX;
    const curY = e.touches[0].clientY;

    if (touchAxis === null) {
      const diffX = Math.abs(curX - touchStartX);
      const diffY = Math.abs(curY - touchStartY);
      if (diffX < 8 && diffY < 8) return;
      touchAxis = diffX > diffY ? "x" : "y";
      if (touchAxis === "x") {
        isDragging = true;
        autoOrbit = false;
        clearTimeout(autoOrbitTimer);
      }
    }

    if (touchAxis !== "y") {
      targetRotY += (curX - startX) * 0.01;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + (curY - startY) * 0.006));
      startX = curX;
      startY = curY;
    }
  }

  function onTouchEnd() {
    isTouching = false;
    touchAxis = null;
    isDragging = false;
    resetAutoOrbit();
  }

  container.addEventListener("mousedown", onMouseDown);
  container.addEventListener("mousemove", onContainerMouseMove);
  container.addEventListener("mouseleave", onContainerMouseLeave);
  container.addEventListener("touchstart", onTouchStart, { passive: true });
  container.addEventListener("touchmove", onTouchMove, { passive: true });
  container.addEventListener("touchend", onTouchEnd, { passive: true });
  container.addEventListener("touchcancel", onTouchEnd, { passive: true });

  // Intersection Observer agar hemat CPU saat tidak terlihat di layar
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isIntersecting = entry.isIntersecting;
      if (!isIntersecting) {
        isDragging = false;
        isTouching = false;
        autoOrbit = true;
      }
    });
  }, { threshold: 0.15 });
  observer.observe(container);

  // 11. Loop Render Animasi (60 FPS)
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isIntersecting) return;

    const elapsed = clock.getElapsedTime();

    // Auto-orbit jika idle
    if (autoOrbit && !isDragging) {
      baseAutoRotY += 0.0022;
      targetRotY = baseAutoRotY;
    }

    // Spring damping halus
    rackGroup.rotation.y += (targetRotY - rackGroup.rotation.y) * 0.06;
    rackGroup.rotation.x += (targetRotX - rackGroup.rotation.x) * 0.06;
    rackGroup.position.y = -1.2 + Math.sin(elapsed * 1.5) * 0.22;

    // Putaran Cincin Lantai
    ring1.rotation.z += 0.004;
    ring2.rotation.z -= 0.006;
    ring3.rotation.z += 0.008;

    // Putaran Kipas Turbin
    fanRotors.forEach(r => {
      r.rotation.z += 0.12;
    });

    // Pemindai Laser Holografik Naik-Turun
    const scanY = 1.5 + ((Math.sin(elapsed * 1.2) + 1) / 2) * 13.5;
    scanMesh.position.y = scanY;
    scanEdge.position.y = scanY;

    // Pulsa Paket Data di Kabel
    pulsePackets.forEach(p => {
      p.progress = (p.progress + p.speed) % 1;
      const pt = p.curve.getPointAt(p.progress);
      p.mesh.position.copy(pt);
    });

    // Lampu LED Berkedip
    blinkLeds.forEach((item, idx) => {
      const wave = Math.sin(elapsed * 6 * item.speed * 200 + idx);
      if (item.type === "blink") {
        item.mat.color.setHex(wave > 0.4 ? item.color : 0x052e16);
      } else {
        item.mat.color.setHex(wave > 0 ? item.color : 0x082f49);
      }
    });

    // VU Meter Segmen LED
    vuMeters.forEach(meter => {
      const activeCount = Math.floor(((Math.sin(elapsed * 3 + meter.offset) + 1) / 2) * 6);
      meter.segments.forEach((segMat, sIdx) => {
        if (sIdx <= activeCount) {
          segMat.color.setHex(sIdx < 4 ? 0x38bdf8 : (sIdx === 4 ? 0x10b981 : 0xf59e0b));
        } else {
          segMat.color.setHex(0x0a1120);
        }
      });
    });

    // Motes Data Melayang Naik
    const positions = motes.geometry.attributes.position.array;
    for (let m = 0; m < 140; m++) {
      positions[m * 3 + 1] += 0.02;
      if (positions[m * 3 + 1] > 18) {
        positions[m * 3 + 1] = 0;
      }
    }
    motes.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  function onWindowResize() {
    if (!container) return;
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }

  window.addEventListener("resize", onWindowResize);
  setTimeout(onWindowResize, 150);
}

// Jalankan saat Three.js dan DOM sudah siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initServer3D);
} else {
  initServer3D();
}

