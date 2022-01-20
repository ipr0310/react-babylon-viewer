import { useRef, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import ScaledModelWithProgress from "./ScaledModelWithProgress";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

export const SceneWithSpinningBoxes = () => {
  const camera: any = useRef(null);

  const onModelLoaded = (e: any) => {
    console.log(e.rootMesh);

    if (camera && camera.current && camera.current.setPosition) {
      camera.current.setPosition(e.rootMesh._position);
      // camera.current.setRotation(e.rootMesh._rotation);
    }
  };

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="babylonJS"
      canvasStyle={{ width: "100%", height: "100%" }}
    >
      <Scene>
        <arcRotateCamera
          ref={camera}
          name="arc"
          target={Vector3.Zero()}
          position={Vector3.Zero()}
          alpha={Math.PI}
          beta={0.5 + Math.PI / 4}
          minZ={0.001}
          wheelPrecision={50}
          useAutoRotationBehavior
          allowUpsideDown={false}
          checkCollisions
          radius={2}
          lowerRadiusLimit={0.5}
          upperRadiusLimit={15}
          useFramingBehavior={true}
          wheelDeltaPercentage={0.01}
          pinchDeltaPercentage={0.01}
          onMeshTargetChangedObservable={true}
        />

        <environmentHelper
          options={{
            enableGroundShadow: true,
            groundYBias: 1,
          }}
          setMainColor={[Color3.FromHexString("#ffffff")]}
        />

        <ScaledModelWithProgress
          rootUrl={`3d/`}
          sceneFilename="knight.glb"
          progressBarColor={Color3.FromInts(135, 206, 235)}
          center={Vector3.Zero()}
          modelRotation={Vector3.Zero()}
          scaleTo={1}
          onModelLoaded={(e: any) => {
            onModelLoaded(e);
          }}
        />
      </Scene>
    </Engine>
  );
};

//#74b9ff
