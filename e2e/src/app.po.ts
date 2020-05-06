import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(link :string): Promise<unknown> {
    return browser.get(link) as Promise<unknown>;
  }

  // getTitleText(): Promise<string> {
  //   return element(by.css('app-root .content span')).getText() as Promise<string>;
  // }
  getParagraphText(selector:string){
    return element(by.css(selector)).getText();
  }
  getAllElements(selector:string){
    return element.all(by.css(selector));
  }
  getElement(selector:string){
    return element(by.css(selector));
  }
}
