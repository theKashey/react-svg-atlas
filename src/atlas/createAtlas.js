import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONTEXT_ID, globalContext } from '../context';

const createAtlas = (SymbolRenderer) => {
  class SVGAtlas extends PureComponent {
    static contextTypes = {
      [CONTEXT_ID]: PropTypes.any,
    };

    static propTypes = {
      sprites: PropTypes.arrayOf(PropTypes.object),
    };

    state = {
      generation: 0,
    };

    constructor(props, context) {
      super(props, context);

      this.boundContext = (this.context[CONTEXT_ID] || globalContext);
      this.boundContext.setAtlasLink(this.updateSprites);
    }

    componentWillMount() {
      this.updateSprites();
    }

    componentWillUnmount() {
      this.boundContext.setAtlasLink(null, this.updateSprites);
    }

    updateSprites = () => {
      this.setState({
        sprites: this.props.sprites || this.boundContext.sprites,
        generation: this.state.generation + 1,
      });
    };

    render() {
      const { sprites } = this.state;
      return (
        // using `visibility-hidden`. In case of display none fill defs will be lost
        <svg style={{ position: 'absolute', overflow: 'hidden', left: 0, top: 0, width: 0, height: 0 }}>
          {
            sprites.map(({ id, type, props }, index) =>
              (<SymbolRenderer
                key={id}
                id={id}
                type={type}
                props={props}
                element={sprites[index]}
              />),
            )
          }
        </svg>
      );
    }
  }

  return SVGAtlas;
};


export default createAtlas;
