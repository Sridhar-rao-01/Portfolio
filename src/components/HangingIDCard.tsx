"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import * as THREE from "three";

/* MAIN COMPONENT */

export default function HangingIDCard() {
  return (
    <div className="relative w-full h-full min-h-125">
      <Canvas
        camera={{
          position: [0, 0, 11],
          fov: 40,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* 3D SCENE */

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight position={[5, 8, 8]} intensity={3} color="#ffffff" />

      <pointLight position={[-4, 3, 4]} intensity={25} color="#38bdf8" />

      <pointLight position={[4, -2, 3]} intensity={20} color="#a78bfa" />

      <Physics gravity={[0, -18, 0]}>
        <LanyardSystem />
      </Physics>
    </>
  );
}

/*  LANYARD + PHYSICS */

function LanyardSystem() {
  const fixed = useRef<RapierRigidBody>(null!);
  const joint1 = useRef<RapierRigidBody>(null!);
  const joint2 = useRef<RapierRigidBody>(null!);
  const joint3 = useRef<RapierRigidBody>(null!);
  const cardBody = useRef<RapierRigidBody>(null!);

  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);

  const [hovered, setHovered] = useState(false);

  const pointer = useRef(new THREE.Vector3());

  const direction = useRef(new THREE.Vector3());

  /* ROPE JOINTS */

  useRopeJoint(fixed, joint1, [[0, 0, 0], [0, 0, 0], 0.9]);

  useRopeJoint(joint1, joint2, [[0, 0, 0], [0, 0, 0], 0.9]);

  useRopeJoint(joint2, joint3, [[0, 0, 0], [0, 0, 0], 0.9]);

  useSphericalJoint(joint3, cardBody, [
    [0, 0, 0],
    [0, 1.65, 0],
  ]);

  /* CURSOR */

  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? "grabbing"
        : "grab"
      : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  /* DRAG */

  useFrame((state) => {
    if (!dragged || !cardBody.current) return;

    pointer.current
      .set(state.pointer.x, state.pointer.y, 0.5)
      .unproject(state.camera);

    direction.current
      .copy(pointer.current)
      .sub(state.camera.position)
      .normalize();

    pointer.current.add(
      direction.current.multiplyScalar(state.camera.position.length()),
    );

    cardBody.current.wakeUp();

    cardBody.current.setNextKinematicTranslation({
      x: pointer.current.x - dragged.x,
      y: pointer.current.y - dragged.y,
      z: pointer.current.z - dragged.z,
    });
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    if (!cardBody.current) return;

    (event.target as HTMLElement | null)?.setPointerCapture(event.pointerId);

    const position = cardBody.current.translation();

    setDragged(
      new THREE.Vector3(
        event.point.x - position.x,
        event.point.y - position.y,
        event.point.z - position.z,
      ),
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    (event.target as HTMLElement | null)?.releasePointerCapture(
      event.pointerId,
    );

    setDragged(null);
  };

  return (
    <>
      {/* FIXED TOP POINT */}

      <RigidBody ref={fixed} type="fixed" position={[0, 4.2, 0]} />

      {/* PHYSICS POINT 1 */}

      <RigidBody
        ref={joint1}
        position={[0.25, 3.3, 0]}
        colliders={false}
        linearDamping={4}
        angularDamping={4}
      >
        <BallCollider args={[0.08]} />
      </RigidBody>

      {/* PHYSICS POINT 2 */}

      <RigidBody
        ref={joint2}
        position={[0.5, 2.4, 0]}
        colliders={false}
        linearDamping={4}
        angularDamping={4}
      >
        <BallCollider args={[0.08]} />
      </RigidBody>

      {/* PHYSICS POINT 3 */}

      <RigidBody
        ref={joint3}
        position={[0.15, 1.55, 0]}
        colliders={false}
        linearDamping={4}
        angularDamping={4}
      >
        <BallCollider args={[0.08]} />
      </RigidBody>

      {/* ID CARD BODY */}

      <RigidBody
        ref={cardBody}
        position={[0, -0.1, 0]}
        colliders="cuboid"
        linearDamping={1}
        angularDamping={2}
        type={dragged ? "kinematicPosition" : "dynamic"}
      >
        {/* INTERACTIVE CARD */}

        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <IDCard />
          <CardClip />
        </group>
      </RigidBody>

      {/* VISUAL LANYARD */}

      <LanyardLine
        fixed={fixed}
        joint1={joint1}
        joint2={joint2}
        joint3={joint3}
      />
    </>
  );
}

/* LANYARD LINE */

interface LanyardLineProps {
  fixed: React.RefObject<RapierRigidBody>;
  joint1: React.RefObject<RapierRigidBody>;
  joint2: React.RefObject<RapierRigidBody>;
  joint3: React.RefObject<RapierRigidBody>;
}

function LanyardLine({ fixed, joint1, joint2, joint3 }: LanyardLineProps) {
  const lineRef = useRef<THREE.Line>(null);
  const line = useMemo(
    () =>
      new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({
          color: "#38bdf8",
          transparent: true,
          opacity: 0.9,
        }),
      ),
    [],
  );

  useFrame(() => {
    if (
      !fixed.current ||
      !joint1.current ||
      !joint2.current ||
      !joint3.current ||
      !lineRef.current
    ) {
      return;
    }

    const points = [
      fixed.current.translation(),
      joint1.current.translation(),
      joint2.current.translation(),
      joint3.current.translation(),
    ].map((point) => new THREE.Vector3(point.x, point.y, point.z));

    const curve = new THREE.CatmullRomCurve3(points);

    const curvePoints = curve.getPoints(40);

    lineRef.current.geometry.setFromPoints(curvePoints);
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <primitive ref={lineRef} object={line} />;
}

/* ID CARD */

function IDCard() {
  return (
    <group>
      {/* MAIN CARD */}

      <RoundedBox args={[3.5, 2.2, 0.12]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          color="#1a1a1f"
          roughness={0.28}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* CYAN INNER PANEL */}

      <RoundedBox
        args={[3.35, 2.05, 0.02]}
        radius={0.1}
        smoothness={6}
        position={[0, 0, 0.07]}
      >
        <meshBasicMaterial color="#1e1e24" />
      </RoundedBox>

      {/* FRONT CONTENT */}

      <CardContent />
    </group>
  );
}

/* CARD CONTENT */

function CardContent() {
  return (
    <group position={[0, 0, 0.1]}>
      {/* HEADER */}

      <Text
        position={[-1.35, 0.75, 0]}
        fontSize={0.24}
        color="#38bdf8"
        anchorX="left"
        anchorY="middle"
      >
        HACKBITS
      </Text>

      {/* HEADER LINE */}

      <mesh position={[-0.55, 0.55, 0]}>
        <planeGeometry args={[1.6, 0.025]} />

        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* PHOTO PLACEHOLDER */}

      <RoundedBox
        args={[0.75, 0.75, 0.03]}
        radius={0.08}
        smoothness={4}
        position={[-1.05, 0.05, 0]}
      >
        <meshStandardMaterial
          color="#27272a"
          metalness={0.4}
          roughness={0.4}
          emissive="#38bdf8"
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      <Text
        position={[-1.05, 0.05, 0.03]}
        fontSize={0.09}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        PHOTO
      </Text>

      {/* NAME */}

      <Text
        position={[0.1, 0.2, 0]}
        fontSize={0.19}
        color="#f4f4f5"
        anchorX="left"
        anchorY="middle"
      >
        S. SRIDHAR RAO
      </Text>

      {/* ROLE */}

      <Text
        position={[0.1, -0.1, 0]}
        fontSize={0.095}
        color="#38bdf8"
        anchorX="left"
        anchorY="middle"
      >
        FULL STACK DEVELOPER
      </Text>

      <Text
        position={[0.1, -0.3, 0]}
        fontSize={0.085}
        color="#a78bfa"
        anchorX="left"
        anchorY="middle"
      >
        DEVOPS ENGINEER
      </Text>

      {/* BOTTOM LINE */}

      <mesh position={[0, -0.65, 0]}>
        <planeGeometry args={[2.7, 0.01]} />

        <meshBasicMaterial color="#3f3f46" />
      </mesh>

      {/* ID */}

      <Text
        position={[-1.35, -0.88, 0]}
        fontSize={0.075}
        color="#71717a"
        anchorX="left"
        anchorY="middle"
      >
        ID: HACKBITS-2026
      </Text>

      {/* SKILLS */}

      <Text
        position={[1.35, -0.88, 0]}
        fontSize={0.065}
        color="#38bdf8"
        anchorX="right"
        anchorY="middle"
      >
        CODE • CLOUD • DEVOPS
      </Text>
    </group>
  );
}

/* METAL CLIP */

function CardClip() {
  return (
    <group position={[0, 1.75, 0]}>
      {/* CONNECTOR */}

      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />

        <meshStandardMaterial color="#a1a1aa" metalness={1} roughness={0.2} />
      </mesh>

      {/* METAL CLIP */}

      <RoundedBox
        args={[0.55, 0.2, 0.12]}
        radius={0.04}
        smoothness={4}
        position={[0, -0.18, 0]}
      >
        <meshStandardMaterial color="#71717a" metalness={1} roughness={0.18} />
      </RoundedBox>

      {/* METAL RING */}

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}>
        <torusGeometry args={[0.13, 0.025, 12, 24]} />

        <meshStandardMaterial color="#e4e4e7" metalness={1} roughness={0.15} />
      </mesh>
    </group>
  );
}
