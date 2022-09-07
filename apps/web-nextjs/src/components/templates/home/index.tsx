import withBottomTabs from '@/utils/hoc/withBottomTabs';
import withNavbar from '@/utils/hoc/withNavbar';
import HomeTemplateDefault from './home-template';

let HomeTemplate: typeof HomeTemplateDefault;
HomeTemplate = withNavbar(HomeTemplateDefault);
HomeTemplate = withBottomTabs(HomeTemplate, "home");

export default HomeTemplate;

