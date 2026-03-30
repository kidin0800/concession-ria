import { initNavbar } from './navbar.js';
import { initScroll } from './scroll.js';
import { initCounters } from './counter.js';
import { initForm } from './form.js';
import { initVehicle } from './vehicle.js';
import { initBrand } from './brand.js';
import { initShowroom } from './showroom.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScroll();
  initCounters();
  initForm();
  initVehicle();
  initBrand();
  initShowroom();
});
