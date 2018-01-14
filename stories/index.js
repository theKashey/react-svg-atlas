import React from 'react';
import { storiesOf } from '@storybook/react';

import SmokeTest from './SmokeTest';
import SizeTest from './SizeTest';
import PropTest from './PropTest';
import PerformanceTest from './PerformanceTest';
import MixedTest from './MixedTest';
import VisaTest from './VisaTest';

storiesOf('SVG', module)
  .add('atlas smoke', () => <SmokeTest />)
  .add('size', () => <SizeTest />)
  .add('prop', () => <PropTest />)
  .add('performance', () => <PerformanceTest />)
  .add('mixed', () => <MixedTest />)
  .add('VisaTest', () => <VisaTest />)
;
