import withNavbar from '@/utils/hoc/withNavbar';
import DetailTemplateDefault from './detail-template';

let DetailTemplate: typeof DetailTemplateDefault;
DetailTemplate = withNavbar(DetailTemplateDefault);

export default DetailTemplate;

