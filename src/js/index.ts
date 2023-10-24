import '../sass/styles.sass';
import { form } from './components/form';
import { mainTabs } from './components/mainTabs';
import { mobileMenu } from './components/mobileMenu';
import { tabs } from './components/tabs';

if (__IS_DEV__) {
  import('../pug/pages/index.pug')
}
mobileMenu();
tabs();
mainTabs();
form();