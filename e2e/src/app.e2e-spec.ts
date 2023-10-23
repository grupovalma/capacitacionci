import { AppPage } from './app.po';
import { element, by, browser, protractor } from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('validar titulo Todo', () => {
    // 打开一个页面
    page.navigateTo();
    // 判断h1的文字是不是Todos
    expect(element(by.css('.header h1')).getText()).toEqual('Todos');
  });

  it('Agrega un Todo', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addOneTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于1
    expect(todoList.count()).toEqual(1);
    // 检查todo的label是不是和输入一样
    expect(todoList.get(0).element(by.css('label')).getText()).toEqual('new todo');
    // 检查统计未完成是不是预期
    expect(element(by.css('.todo-count')).getText()).toEqual('1 items left');
    // 检查统计已完成是不是预期
    expect(element(by.css('.clear-completed')).getText()).toEqual('Clear 0 done items');
  });

  it('Agregar una operación Todo y eliminar', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addOneTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于1
    expect(todoList.count()).toEqual(1);
    // 检查todo的label是不是和输入一样
    expect(todoList.get(0).element(by.css('label')).getText()).toEqual('new todo');
    // 检查统计未完成是不是预期
    expect(element(by.css('.todo-count')).getText()).toEqual('1 items left');
    // 检查统计已完成是不是预期
    expect(element(by.css('.clear-completed')).getText()).toEqual('Clear 0 done items');
    // 点击删除按钮
    todoList.get(0).element(by.css('.destroy')).click();
    // 再次获取 todo 显示的长度
    const completedAmount = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于0
    expect(completedAmount.count()).toEqual(0);
  });

  it('Agregue un nuevo Todo y marque la operación completada', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addOneTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 点击完成按钮
    todoList.get(0).element(by.css('.toggle')).click();
    const completedTodos = element.all(by.css('.todo-list li.completed'));
    // 检查todo长度是不是等于1
    expect(completedTodos.count()).toEqual(1);
  });

  it('Agregue un nuevo Todo y edite y guarde las operaciones de edición', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addOneTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 双击 todo 开启编辑模式
    browser.actions().doubleClick(todoList.get(0)).perform();
    const editTodoInput = element.all(by.css('.todo-list li')).get(0).element(by.css('.edit'));
    // 获取 编辑中input的value 是不是和输入一样
    expect(editTodoInput.getAttribute('value')).toEqual('new todo');
    // 需要编辑的内容
    const newEditTodoValue = ' edit todo';
    // 模拟用户输入
    editTodoInput.sendKeys(newEditTodoValue);
    // 输入完成按下回车键 保存数据
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    // 获取 todo 显示的长度
    const editedTodoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于1
    expect(editedTodoList.count()).toEqual(1);
    // 检查todo的label是不是和输入一样
    expect(editedTodoList.get(0).element(by.css('label')).getText()).toEqual('new todo' + newEditTodoValue);
  });

  it('Agregue un nuevo Todo y edite y cancele las operaciones de edición', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addOneTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 双击 todo 开启编辑模式
    browser.actions().doubleClick(todoList.get(0)).perform();
    const editTodoInput = element.all(by.css('.todo-list li')).get(0).element(by.css('.edit'));
    // 获取 编辑中input的value 是不是和输入一样
    expect(editTodoInput.getAttribute('value')).toEqual('new todo');
    // 需要编辑的内容
    const newEditTodoValue = ' edit todo';
    // 模拟用户输入
    editTodoInput.sendKeys(newEditTodoValue);
    // 模拟失去焦点，随便点击一个位置即可
    browser.actions().click(element(by.css('.header h1'))).perform();
    // 获取 todo 显示的长度
    const editedTodoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于1
    expect(editedTodoList.count()).toEqual(1);
    // 检查todo的label是不是和输入一样
    expect(editedTodoList.get(0).element(by.css('label')).getText()).toEqual('new todo');
  });

  it('Agregue 5 nuevos Todos y marque 4 completados y borre 4 completados', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addMultipleTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于5
    expect(todoList.count()).toEqual(5);

    // 点击完成按钮
    todoList.get(0).element(by.css('.toggle')).click();
    todoList.get(1).element(by.css('.toggle')).click();
    todoList.get(3).element(by.css('.toggle')).click();
    todoList.get(4).element(by.css('.toggle')).click();

    const completedTodos = element.all(by.css('.todo-list li.completed'));
    // 检查todo长度是不是等于1
    expect(completedTodos.count()).toEqual(4);

    // 模拟点击清除
    element(by.css('.footer .clear-completed')).click();
    // 有一个confirm确认框 需要把它处理 模拟点击确定按钮
    browser.switchTo().alert().accept().then(() => {
      // 获取剩余
      const surplusTodos = element.all(by.css('.todo-list li'));
      expect(surplusTodos.get(0).element(by.css('label')).getText()).toEqual('new todo ' + 2);
    });
  });

  it('Agregue 5 nuevos Todo y marque 4 completados y borre 4 completados Cancele la operación', () => {
    // 打开一个页面
    page.navigateTo();
    // 调用添加操作
    page.addMultipleTodo();
    // 获取 todo 显示的长度
    const todoList = element.all(by.css('.todo-list li'));
    // 检查todo长度是不是等于5
    expect(todoList.count()).toEqual(5);
    // 点击完成按钮
    todoList.get(0).element(by.css('.toggle')).click();
    todoList.get(1).element(by.css('.toggle')).click();
    todoList.get(3).element(by.css('.toggle')).click();
    todoList.get(4).element(by.css('.toggle')).click();
    const completedTodos = element.all(by.css('.todo-list li.completed'));
    // 检查todo长度是不是等于1
    expect(completedTodos.count()).toEqual(4);
    // 模拟点击清除
    element(by.css('.footer .clear-completed')).click();
    // 有一个confirm确认框 需要把它处理 模拟点击取消按钮
    browser.switchTo().alert().dismiss().then(() => {
      // 获取剩余
      const surplusTodos = element.all(by.css('.todo-list li'));
      expect(surplusTodos.count()).toEqual(5);
    });
    browser.sleep(5000);
  });

});
