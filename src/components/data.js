/* eslint-disable */
import { Vector3 } from 'three';

export const rooms = [
  {
    name: '客厅',
    key: 'living-room',
    map: new URL('@/assets/images/map/map_living_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(0, 0, 0),

  },
  {
    name: '卧室',
    key: 'bed-room',
    map: new URL('@/assets/images/map/map_bed_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-32, 0, 0),

  },
  {
    name: '书房',
    key: 'study-room',
    map: new URL('@/assets/images/map/map_study_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(32, 0, 0),

  },
];
