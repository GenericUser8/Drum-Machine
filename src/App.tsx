import { useState } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

// Drum Kits
/* enum Kit {
  Normal,
  Custom
} */

// Sounds
interface Dictionary<T> {
  [key: string]: T
}
interface Sound {
  name: string,
  link: string
}
const SOUNDS: Dictionary<Sound> = {
  'Q': { 'name': "Heater 1", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},
  'W': { 'name': "Heater 2", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"},
  'E': { 'name': "Heater 3", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"},

  'A': { 'name': "Heater 4", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"},
  'S': { 'name': "Clap", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"},
  'D': { 'name': "Open-HH", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"},
  
  'Z': { 'name': "Kick-n'-Hat", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"},
  'X': { 'name': "Kick", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"},
  'C': { 'name': "Closed-HH", 'link': "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"}
} as const;

export default function App() {
  // const [volume, setVolume] = useState(50);
  // const [power, setPower] = useState(true);
  // const [kit, setKit] = useState(Kit.Normal);
  const [last, setLast] = useState(' ');

  return (
    <main id="drum-machine">
      <div >
        <h1>Drum Machine</h1>
        <hr />
      </div>
      <div id="machine-container">
        <MachineButtons setLast={setLast}/>
        <MachineContols last={last}/>
      </div>
    </main>
  )
}

interface MachineButtonsProps {
  setLast: React.Dispatch<React.SetStateAction<string>>,
}
function MachineButtons({ setLast }: MachineButtonsProps) {
  return(
    <div className="machine-buttons">
      <Button kbKey="Q" setLast={setLast} />
      <Button kbKey="W" setLast={setLast} />
      <Button kbKey="E" setLast={setLast} />
      <Button kbKey="A" setLast={setLast} />
      <Button kbKey="S" setLast={setLast} />
      <Button kbKey="D" setLast={setLast} />
      <Button kbKey="Z" setLast={setLast} />
      <Button kbKey="X" setLast={setLast} />
      <Button kbKey="C" setLast={setLast} />
    </div>
  );
}

interface MachineControlsProps {
  last: string
}
function MachineContols({ last }: MachineControlsProps) {
  return(
    <div className="machine-controls">
      <p>This would be where I would put controls if I had more audio samples.</p>
      <p id="display">{SOUNDS[last]["name"]}</p>
    </div>
  );
}

interface ButtonProps {
  kbKey: string,
  setLast: React.Dispatch<React.SetStateAction<string>>,
}
function Button({ kbKey, setLast }: ButtonProps) {
  const [active, setActive] = useState(false);
  function checkKey(event: { key: string; }) {
    if (event.key.toUpperCase() === kbKey) {
      setActive(true)
      activate();
    }
  }
  function reset() {
    setActive(false)
  }
 document.addEventListener("keydown", checkKey);
 document.addEventListener("keyup", reset);
  function activate() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audio: any = document.getElementById(kbKey);
    audio.play()
    setLast(kbKey);
  }
  return(
    <div className={"drum-button drum-pad" + (active ? " active" : "")} id={`pad-${kbKey}`}onKeyDown={checkKey} onKeyUp={reset} onClick={activate}>
      <h3>{kbKey}</h3>
      <audio className="clip" id={kbKey} src={SOUNDS[kbKey]["link"]}></audio>
    </div>
  );
}

