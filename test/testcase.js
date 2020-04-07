describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App');
    })

    it('should render all content correct', async function() {
      let todoList = await page.waitFor('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div');
      const expectContent0 = await page.evaluate(todoList => todoList.children[0].querySelector('div').textContent, todoList);
      const expectContent1 = await page.evaluate(todoList => todoList.children[1].querySelector('div').textContent, todoList);
      expect(expectContent0).to.eql('Learning GoLang');
      expect(expectContent1).to.eql('Learning Node.JS');
    }) 

    it('should new todo correct', async function() {
      await page.click('#header_icon', {delay: 500});
      await page.type('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > input[type=text]', 'new todo item', {delay: 50});
      await page.click('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.actions > button.ui.icon.positive.right.labeled.button')
      let todoList = await page.waitFor('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('div').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

    it('should done todo correct', async function() {
      let icon_class = await page.evaluate("document.querySelector('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div > div:nth-child(2) > i').getAttribute('class')")
      expect(icon_class).to.eql('ui circle outline icon')
      await page.click('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div > div:nth-child(2)')
      let new_icon_class = await page.evaluate("document.querySelector('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div > div:nth-child(2) > i').getAttribute('class')")
      expect(new_icon_class).to.eql('ui check circle outline icon')


    })

  });