/**
 * Vergemakkelijkt BEM.
 * maak de klasse aan met B E M of B E of alleen B.
 * const Bem = new CSSBEM('footer-nav', 'wrapper')
 * zet element middels setElement
 * zet modifier middels setModifiers (meervoud)
 * bem.nextBase('app-nav') -> app-nav--mod1 app-nav--mod2
 * @method setElement {string} zet de Element van Bem
 */
export class CSSBEM {
  constructor(block, element = "", ...modifiers) {
    this.block = block;
    this.element = element;
    this.modifiers = modifiers;
  }
  /**
   * zet de Block van Bem
   * @param {string} block
   */
  setBlock(block) {
    this.block = block;
  }
  /**
   * zet de Element van bem
   * @param {string} element
   */
  setElement(element) {
    this.element = element;
  }
  get blockElement() {
    return `${this.block}__${this.element}`;
  }
  /**
   * accepteert één of meerdere modifiers en zet die
   * @param  {...string} modifiers
   */
  setModifiers(...modifiers) {
    this.modifiers = modifiers;
  }
  /**
   * @returns BEM string voor alle modifiers, apart ook de BE string.
   */
  make() {
    return `${this.blockElement} ${this.modifiers
      .map((mod) => {
        return `${this.blockElement}--${mod}`;
      })
      .join()}`;
  }
  /**
   * wrapper om setElement en make. Als je van de ene Element naar de volgende gaat.
   * @param {string} element
   * @returns bem string
   */
  setElementMake(element) {
    this.setElement(element);
    return this.make();
  }
}

export default {};
