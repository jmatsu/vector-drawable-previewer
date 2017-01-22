import { Id } from "./const/id";
import { ExtensionComponent } from "./extension_component";
import { ShowSVGScenario } from "./scenario/show_svg_scenario";
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
        if (!Objects.isDefined(document.querySelector(`#${Id.svgContainer}`))) {
            let pkg = ExtensionComponent.getPackage();
            new ShowSVGScenario(pkg).consume().catch((err) => Logger.log(err));
        }
    }
}

if (Githubs.isGithubRepositoryPage() && !Githubs.isGithubBlobPage()) {
    document.addEventListener("DOMContentLoaded", Vdp.bindEvent, false);
} else {
    document.addEventListener("DOMContentLoaded", Vdp.mayLoadVectorDrawable, false);
}
