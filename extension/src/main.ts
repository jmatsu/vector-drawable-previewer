import { ExtensionComponent } from "./extension_component";
import { ShowSVGScenario } from "./scenario/show_svg_scenario";

namespace Vdv {
    export function onLoad() {
        let pkg = ExtensionComponent.getPackage();
        new ShowSVGScenario(pkg).consume().catch((err) => console.log(err));
    }
}

document.addEventListener("DOMContentLoaded", Vdv.onLoad, false);
