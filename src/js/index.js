import "../less/template.less";
import * as Header from "./header";

window.addEventListener('resize', Header.setPositions);
Header.setPositions();