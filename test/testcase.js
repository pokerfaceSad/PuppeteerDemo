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

    it('should new todo correct', async function() {
      await page.click('#header_icon', {delay: 500});
      await page.type('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > div > input[type=text]', 'new todo item', {delay: 50});
      await page.click('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.actions > button.ui.icon.positive.right.labeled.button')
      let todoList = await page.waitFor('#root > div > div.ui.centered.relaxed.grid.container > div:nth-child(3) > div > div.row > div');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('div').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

  });