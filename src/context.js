export const createContext = () => ({
  atlasLink: null,
  notifyTm: 0,

  itemCounter: 0,

  sprites: [],

  notify() {
    if (this.atlasLink) {
      this.atlasLink();
      return;
    }

    if (!this.notifyTm) {
      this.notifyTm = setTimeout(() => {
        this.notifyTm = 0;
        if (!this.atlasLink) {
          throw new Error('No SVGAtlas found');
        }
        this.atlasLink();
      }, 0);
    }
  },

  setAtlasLink(link, oldLink) {
    if (!link && oldLink === this.atlasLink || !oldLink) {
      this.atlasLink = link;
    }
  },

});

export const globalContext = createContext();
export const CONTEXT_ID = 'SVG-ATLAS-CONTEXT';
