import "../less/template.less";
import * as Header from "./header";
import * as Slider from "./slider";

window.addEventListener('resize', Header.setPositions);
Header.setPositions();

Slider.init();