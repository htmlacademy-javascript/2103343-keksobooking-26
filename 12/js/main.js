import './create-card.js';
import './validation-form.js';
import {createMarkers} from './map.js';
import {getData} from './api.js';

const MARKERS_COUNT = 10;

getData((markers) => {createMarkers(markers.slice(0,MARKERS_COUNT));
});
