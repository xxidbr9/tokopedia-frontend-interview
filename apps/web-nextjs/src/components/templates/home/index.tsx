import withNavbar from '@/utils/hoc/withNavbar';
import HomeTemplateDefault from './home-template';

let HomeTemplate;
HomeTemplate = withNavbar(HomeTemplateDefault);

export default HomeTemplate as typeof HomeTemplateDefault;

