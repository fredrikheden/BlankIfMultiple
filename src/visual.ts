

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;
        private fullDiv: HTMLDivElement;

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            var d = this.fullDiv = document.createElement("div");
            this.target.appendChild(this.fullDiv);
            d.style.width = "100%";
            d.style.height = "100%";
            d.style.textAlign = "center";
            d.style.display = "flex";
            d.style.justifyContent = "center";
            d.style.alignItems = "center";
            /*this.updateCount = 0;
            if (typeof document !== "undefined") {
                const new_p: HTMLElement = document.createElement("p");
                new_p.appendChild(document.createTextNode("Update count:"));
                const new_em: HTMLElement = document.createElement("em");
                this.textNode = document.createTextNode(this.updateCount.toString());
                new_em.appendChild(this.textNode);
                new_p.appendChild(new_em);
                this.target.appendChild(new_p);
            }*/
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            var noOfCategories = options.dataViews[0].categorical.categories[0].values.length;
            if ( noOfCategories !== 1 ) {
                this.fullDiv.style.display = "flex";
                this.fullDiv.innerHTML = this.settings.dataPoint.textToShow;
                this.fullDiv.style.backgroundColor = this.settings.dataPoint.fillColor;
                this.fullDiv.style.fontSize = this.settings.dataPoint.fontSize + "pt";
            } else {
                this.fullDiv.style.display = "none";
                this.fullDiv.innerHTML = "";
                this.fullDiv.style.backgroundColor = "";
            }
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}