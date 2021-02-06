/**
 * looks into the parents of startElement following the condition of...
 * @param startElement
 * @param conditionFunc
 * @param maxRecursion
 */
export function findInParents(startElement: HTMLElement, conditionFunc: HTMLElementCallback, maxRecursion = 5): boolean | HTMLElement {
  // the start element is the sought element.
  if (conditionFunc(startElement)) {
    return startElement
  }

  let tempElementHolder = startElement.parentNode
  // could be null.
  if (tempElementHolder === null) {
    return false // failure.
  }
  let counter = 0
  while (counter < maxRecursion) {
    // conditions are met? return;
    if (conditionFunc(tempElementHolder)) {
      // console.log("gevonden!");
      return tempElementHolder as HTMLElement
    }
    // lets see if we can go further up.
    const tParent = tempElementHolder.parentNode
    // no more HTML?
    if (!tParent) {
      return false
    }
    // reached body?
    if ((tParent as HTMLElement) === document.getElementsByTagName("body")[0]) {
      return false
    }

    // another recursion.
    tempElementHolder = tParent as HTMLElement
    counter++
  }
  return false
}

/**
 * Loops over a collection of elements and adds / removes the styling class
 *
 */

export function showHideNodes(nodes: HTMLElement[], showNodes = true, hideClass = "blurred"): void {
  if (!nodes.length) {
    return // nothing to do.
  }

  nodes.map(node => {
    const isHidden = node.classList.contains(hideClass)
    if (showNodes && isHidden) {
      node.classList.remove(hideClass)
    } else if (!showNodes && !isHidden) {
      node.classList.add(hideClass)
    }
    return node
  })
}

type HTMLElementCallback = (n: unknown) => HTMLElement | null
