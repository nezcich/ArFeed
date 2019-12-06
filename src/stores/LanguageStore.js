import { observable, action } from "mobx";
import enUS from '../language/en';
import chCH from '../language/ch';

class LanguageStore {
  @observable language = 'en';

  get_currentLanguage = () => {
    return this.language;
  }
  get_resource = () => {
    switch (this.language) {
      case 'en':
        return enUS;
      case 'ch':
        return chCH;
      default:
        return enUS;
    }
  }
  @action changeLanguageTo = (language) => {
    this.language = language;
  }
}
export default LanguageStore;
