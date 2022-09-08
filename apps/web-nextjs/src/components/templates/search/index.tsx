import withBottomTabs from '@/utils/hoc/withBottomTabs';
import withNavbar from '@/utils/hoc/withNavbar';
import SearchTemplateDefault from './search-template';

let SearchTemplate: typeof SearchTemplateDefault;
SearchTemplate = withNavbar(SearchTemplateDefault);
SearchTemplate = withBottomTabs(SearchTemplate, "search");

export default SearchTemplate;

