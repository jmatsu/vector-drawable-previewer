import { ShowSVGScenario } from './scenario/show_svg_scenario';
import { PresentationComponent } from './presentation/presentation_component';

class Main {
    onLoad() {
        let pkg = PresentationComponent.getPackage();
        new ShowSVGScenario(pkg).consume().catch((err) => console.log(err));
    }
}

document.addEventListener("DOMContentLoaded", new Main().onLoad, false);
