import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Text, Cloud, ContactShadows } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Tower({ position, height=3.2, color='#c9b7f5' }) {
  return <group position={position}>
    <mesh position={[0,height/2,0]} castShadow><cylinderGeometry args={[.72,.9,height,10]}/><meshStandardMaterial color="#fffdfd" roughness={.72}/></mesh>
    <mesh position={[0,height+.38,0]} castShadow><coneGeometry args={[.98,1,10]}/><meshStandardMaterial color={color} roughness={.55}/></mesh>
    <mesh position={[0,height*.55,.73]}><boxGeometry args={[.28,.65,.08]}/><meshStandardMaterial color="#e8c978" metalness={.45}/></mesh>
  </group>;
}
function CastleBuilding(){
  return <group position={[0,0,-5]}>
    <mesh position={[0,1.25,0]} castShadow receiveShadow><boxGeometry args={[5.5,2.5,2.7]}/><meshStandardMaterial color="#fffdfd"/></mesh>
    <mesh position={[0,2.75,.08]} castShadow><coneGeometry args={[1.25,1.6,4]}/><meshStandardMaterial color="#d6c5fb"/></mesh>
    {[-2.45,2.45].map(x=><Tower key={x} position={[x,0,-.8]} height={3.4}/>)}
    {[-1.55,1.55].map(x=><Tower key={x} position={[x,0,.9]} height={2.5} color="#b9a4ec"/>)}
    <mesh position={[0,.78,1.39]}><boxGeometry args={[1,1.55,.13]}/><meshStandardMaterial color="#b68c55" metalness={.35}/></mesh>
    <Text position={[0,4.05,0]} fontSize={.34} color="#9c7a42" anchorX="center">Welcome to home</Text>
    {[-1.3,1.3].map(x=><group key={x} position={[x,1.35,1.37]}><mesh><boxGeometry args={[.48,.72,.06]}/><meshStandardMaterial color="#c9b7f5" emissive="#a58bd4" emissiveIntensity={.25}/></mesh></group>)}
  </group>;
}
function Avatar({position,color='#29252e',curly=false}){
  const root=useRef();
  return <group ref={root} position={position}>
    <mesh position={[0,.68,0]} castShadow><capsuleGeometry args={[.31,.68,5,10]}/><meshStandardMaterial color={color}/></mesh>
    <mesh position={[0,1.37,0]} castShadow><sphereGeometry args={[.34,24,24]}/><meshStandardMaterial color="#f1d2c3"/></mesh>
    <mesh position={[0,1.58,-.07]}><sphereGeometry args={[.37,24,18]}/><meshStandardMaterial color="#17151a"/></mesh>
    {Array.from({length:curly?14:8},(_,i)=><mesh key={i} position={[Math.sin(i*2.4)*.31,1.42+(i%4)*.12,-.03+Math.cos(i*2.4)*.23]}><sphereGeometry args={[curly?.105:.12,12,10]}/><meshStandardMaterial color="#211b20"/></mesh>)}
    {[-.13,.13].map(x=><mesh key={x} position={[x,1.38,.31]}><sphereGeometry args={[.027,10,10]}/><meshStandardMaterial color="#29202a"/></mesh>)}
  </group>;
}
function Mochi(){const ref=useRef();useFrame(({clock})=>{if(ref.current)ref.current.position.y=.22+Math.sin(clock.elapsedTime*2)*.035;});return <group ref={ref} position={[2.2,0,2.8]}>
  <mesh castShadow><sphereGeometry args={[.32,20,16]}/><meshStandardMaterial color="#fff"/></mesh><mesh position={[0,.22,.08]}><sphereGeometry args={[.22,20,16]}/><meshStandardMaterial color="#fff"/></mesh>
  {[-.13,.13].map(x=><mesh key={x} position={[x,.38,.04]} rotation={[0,0,x*2]}><coneGeometry args={[.09,.22,8]}/><meshStandardMaterial color="#fff"/></mesh>)}
  <mesh position={[0,.24,.28]}><sphereGeometry args={[.025,10,10]}/><meshStandardMaterial color="#e6a6b8"/></mesh>
  <mesh position={[.3,.05,-.12]} rotation={[0,0,-.7]}><torusGeometry args={[.16,.055,8,16,Math.PI*1.4]}/><meshStandardMaterial color="#fff"/></mesh>
</group>}
function Door({room,position,onChoose}){
 const [hover,setHover]=useState(false); const color=hover?'#f4d98d':'#b99761';
 return <group position={position} onPointerOver={e=>{e.stopPropagation();setHover(true)}} onPointerOut={()=>setHover(false)} onClick={e=>{e.stopPropagation();onChoose(room.id)}}>
   <mesh position={[0,.9,0]}><boxGeometry args={[1.05,1.8,.18]}/><meshStandardMaterial color={color} metalness={.28}/></mesh>
   <mesh position={[0,1.82,0]}><torusGeometry args={[.54,.1,8,24,Math.PI]}/><meshStandardMaterial color="#e8d6a2" metalness={.35}/></mesh>
   <mesh position={[.34,.9,.12]}><sphereGeometry args={[.055,12,12]}/><meshStandardMaterial color="#fff0b5" emissive="#fff0b5" emissiveIntensity={.3}/></mesh>
   <Text position={[0,2.15,.05]} fontSize={.22} color="#5f5076" anchorX="center" maxWidth={2}>{room.name}</Text>
 </group>;
}
function Player({position,onMove,joy}){
 const ref=useRef();const keys=useRef({});
 useEffect(()=>{const down=e=>{keys.current[e.key.toLowerCase()]=true};const up=e=>{keys.current[e.key.toLowerCase()]=false};window.addEventListener('keydown',down);window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}},[]);
 useFrame((state,delta)=>{if(!ref.current)return;const k=keys.current;let x=(k.d||k.arrowright?1:0)-(k.a||k.arrowleft?1:0)+joy.x;let z=(k.s||k.arrowdown?1:0)-(k.w||k.arrowup?1:0)+joy.y;const len=Math.hypot(x,z);if(len>.05){x/=Math.max(1,len);z/=Math.max(1,len);ref.current.position.x=THREE.MathUtils.clamp(ref.current.position.x+x*delta*3.2,-10,10);ref.current.position.z=THREE.MathUtils.clamp(ref.current.position.z+z*delta*3.2,-11,8);ref.current.rotation.y=Math.atan2(x,z);onMove(ref.current.position.x,ref.current.position.z)}state.camera.position.lerp(new THREE.Vector3(ref.current.position.x+7,6.5,ref.current.position.z+9),.035);state.camera.lookAt(ref.current.position.x,1,ref.current.position.z)});
 return <group ref={ref} position={position}><Avatar position={[0,0,0]} color="#302b36"/></group>;
}
function WorldContents({rooms,onChooseRoom,onNearDoor,joy}){
 const player=useRef({x:0,z:4});
 const doors=[[-5,0,0],[0,0,0],[5,0,0],[-5,0,-3],[0,0,-3],[5,0,-3]];
 return <>
  <color attach="background" args={['#dcd7f5']}/><fog attach="fog" args={['#dcd7f5',18,42]}/><ambientLight intensity={1.15}/><directionalLight position={[5,10,5]} intensity={2} castShadow/><hemisphereLight intensity={.8} groundColor="#a5b99b"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.13,0]} receiveShadow><planeGeometry args={[90,90]}/><meshStandardMaterial color="#91b58e"/></mesh>
  <CastleBuilding/>
  <mesh position={[0,.02,2.4]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[3,48]}/><meshStandardMaterial color="#e9e2f7"/></mesh>
  <mesh position={[0,.04,2.4]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[1.45,1.62,48]}/><meshStandardMaterial color="#d6b86d" metalness={.5}/></mesh>
  <mesh position={[0,.35,-1.1]}><boxGeometry args={[12,.3,1.3]}/><meshStandardMaterial color="#ded2ef"/></mesh>
  {rooms.map((room,i)=><Door key={room.id} room={room} position={doors[i]} onChoose={onChooseRoom}/>)}
  <Float speed={1.2} floatIntensity={.3}><mesh position={[-4,2.8,2]}><sphereGeometry args={[.55,20,20]}/><meshStandardMaterial color="#fff4b8" emissive="#ffeaa2" emissiveIntensity={.35}/></mesh></Float>
  <Sparkles count={110} scale={[22,9,22]} size={2.4} speed={.25} color="#fff8d9"/><Cloud position={[-8,4,-6]} opacity={.45} speed={.1}/><Cloud position={[8,3,-8]} opacity={.4} speed={.08}/>
  <Avatar position={[1.4,0,4]} color="#a99bd1" curly/><Mochi/>
  <Player position={[0,0,6]} joy={joy} onMove={(x,z)=>{player.current={x,z};const nearest=doors.map((p,i)=>({i,d:Math.hypot(x-p[0],z-p[2])})).sort((a,b)=>a.d-b.d)[0];onNearDoor(nearest.d<2.5?rooms[nearest.i]:null)}}/>
  <ContactShadows position={[0,-.11,0]} opacity={.3} scale={24} blur={2.5}/>
 </>;
}
export default function CastleWorld({rooms,onChooseRoom}){
 const [near,setNear]=useState(null),[joy,setJoy]=useState({x:0,y:0});
 function pointerDown(e){e.currentTarget.setPointerCapture(e.pointerId);const rect=e.currentTarget.getBoundingClientRect();const move=ev=>{const dx=(ev.clientX-rect.left-rect.width/2)/(rect.width/2),dy=(ev.clientY-rect.top-rect.height/2)/(rect.height/2);setJoy({x:THREE.MathUtils.clamp(dx,-1,1),y:THREE.MathUtils.clamp(dy,-1,1)})};move(e);e.currentTarget.onpointermove=move}
 function stopJoy(){setJoy({x:0,y:0})}
 return <><Canvas shadows camera={{position:[7,7,15],fov:48}} dpr={[1,1.5]} gl={{antialias:false,powerPreference:'low-power'}}><WorldContents rooms={rooms} onChooseRoom={onChooseRoom} onNearDoor={setNear} joy={joy}/></Canvas><div className="joystick" onPointerDown={pointerDown} onPointerUp={stopJoy} onPointerCancel={stopJoy}><span/></div>{near&&<button className="interact-door" onClick={()=>onChooseRoom(near.id)}>تعامل با دروازه‌ی {near.name}</button>}</>;
}
