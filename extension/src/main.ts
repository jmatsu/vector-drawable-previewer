import { ExtensionComponent } from "./extension_component";
import { ShowSVGScenario } from "./scenario/show_svg_scenario";
import { Documents } from "./util/documents";
import { Githubs } from "./util/githubs";
import { Logger } from "./util/logger";
import { Objects } from "./util/objects";

namespace Vdp {
    export function bindEvent() {
        const container = Githubs.getAjaxContainer();

        if (Objects.isDefined(container)) {
            const listener = Objects.throttleAfter(() => {
                mayLoadVectorDrawable();
            }, 3 * 1000);
            container.addEventListener("DOMSubtreeModified", listener, false);
        } else {
            Logger.log("cannot bind.");
        }
    }

    export function mayLoadVectorDrawable() {
        if (!Objects.isDefined(document.querySelector(`#${Documents.containerId}`))) {
            let pkg = ExtensionComponent.getPackage();
            new ShowSVGScenario(pkg).consume().catch((err) => console.log(err));
        }
    }
}

if (Githubs.isGithubRepositoryPage()) {
    document.addEventListener("DOMContentLoaded", Vdp.bindEvent, false);
} else {
    document.addEventListener("DOMContentLoaded", Vdp.mayLoadVectorDrawable, false);
}
