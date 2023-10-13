import '../sass/styles.sass';
import { mainTabs } from './components/main-tabs';
import { mobileMenu } from './components/mobileMenu';
import { tabs } from './components/tabs';

if (__IS_DEV__) {
  import('../pug/pages/index.pug')
}
mobileMenu();
tabs();
mainTabs();