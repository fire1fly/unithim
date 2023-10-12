import '../sass/styles.sass';
import { mobileMenu } from './components/mobileMenu';

if (__IS_DEV__) {
  import('../pug/pages/index.pug')
}
mobileMenu();