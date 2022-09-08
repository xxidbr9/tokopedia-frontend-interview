import withBottomTabs from '@/utils/hoc/withBottomTabs';
import withNavbar from '@/utils/hoc/withNavbar';
import CollectionTemplateDefault from './collection-template';

let CollectionTemplate: typeof CollectionTemplateDefault;
CollectionTemplate = withNavbar(CollectionTemplateDefault);
CollectionTemplate = withBottomTabs(CollectionTemplate, "collection");

export default CollectionTemplate;

