import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Restaurant message', () => {
    page.navigateTo(browser.baseUrl);
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it("should navigate to about",()=>{
    page.navigateTo(browser.baseUrl);
    let navLink=page.getAllElements('a').get(1);
    navLink.click();
    expect(page.getParagraphText('h3')).toBe("About Us");
  });
  it("should enter comment",()=>{
    page.navigateTo(browser.baseUrl+'/dishdetail/0');
    const newAuthor= page.getElement('input[type=text]');
    newAuthor.sendKeys('Test author');

    const newComment=page.getElement('textarea');
    newComment.sendKeys("test comment");

    const newSubmit=page.getElement('button[type=Submit]');
    newSubmit.click();
    //  browser.pause();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
