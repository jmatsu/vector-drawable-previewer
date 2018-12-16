interface Element {
    isComment(): boolean
    isVector(): boolean
    setAttr(name: string, other: Attr | null): void
    getAttr(name: string): Attr | null
    setAttrValue(name: string, value: any): void
    getAttrValue(name: string): string | null
    hasClass(name: string): boolean
    parentElementOf(nth: number): Element | null
}

Element.prototype.isComment = (): boolean => {
    return this.nodeName === "comment"
}

Element.prototype.isVector = (): boolean => {
    return this.nodeName === "vector"
}

Element.prototype.setAttrValue = (name: string, value: any): void => {
    if (value) {
        if (typeof (this as any).setAttributeNS === "function") {
            (this as any).setAttributeNS(null, name, value)
        } else {
            (this.attributes as any)[name] = value
        }
    }
}

Element.prototype.getAttr = (name: string): Attr | null => {
    return (this.attributes as any)[name]
}

Element.prototype.getAttrValue = (name: string): string | null => {
    const attr = this.getAttr(name)

    if (!attr) {
        return null
    }

    return attr.value
}

Element.prototype.hasClass = (name: string): boolean => {
    return new RegExp("(\\s|^)" + name + "(\\s|$)").test(this.className)
}

Element.prototype.parentElementOf = (nth: number): Element | null => {
    let element = this

    for (let i = 0; i < nth; i++) {
        element = element && element.parentElement
    }

    return element
}

interface NodeList {
    findVectorDrawbleElement(): Element | null
    elements(): IterableIterator<Element>;
}

NodeList.prototype.findVectorDrawbleElement = () : Element | null => {
    for (const element of this.elements) {
        if (element.isVector()) {
            return element
        }
    }

    return null
}

NodeList.prototype.elements = function*(): IterableIterator<Element> {
    for (const node of this) {
        if (node instanceof Element) {
            yield node
        }
    }
}
