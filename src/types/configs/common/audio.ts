import { Howl } from "howler";

interface AudioProps {
  click: Howl;
  end: Howl;
  eat: Howl[];
  orb: Howl;
  equip_chain: Howl[];
  burp: Howl;
  pop: Howl;
  hit: Howl[];
  open_flip: Howl[];
  bgm: Howl[] | Howl;
}

export default AudioProps;
