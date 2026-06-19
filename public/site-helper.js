// public/site-helper.js
(function() {
  'use strict';

  // 配置对象
  var config = {
    portalUrl: 'https://official-portal-hth.com.cn',
    keyword: '华体会',
    cardTitle: '欢迎访问华体会',
    cardContent: '本页面提供关于华体会的关键服务说明与操作指引。',
    badgeList: ['华体会', '体育', '电竞', '真人', '棋牌', '电子']
  };

  // 工具函数：创建 DOM 元素
  function createElement(tag, attrs, content) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          el.setAttribute(key, attrs[key]);
        }
      }
    }
    if (content) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else if (content instanceof Node) {
        el.appendChild(content);
      } else if (Array.isArray(content)) {
        content.forEach(function(item) {
          if (typeof item === 'string') {
            el.appendChild(document.createTextNode(item));
          } else if (item instanceof Node) {
            el.appendChild(item);
          }
        });
      }
    }
    return el;
  }

  // 创建提示卡片
  function createCard() {
    var card = createElement('div', { class: 'helper-card' });
    var title = createElement('h3', {}, config.cardTitle);
    var content = createElement('p', {}, config.cardContent);
    var link = createElement('a', { href: config.portalUrl, target: '_blank', rel: 'noopener' }, '前往官方门户 →');
    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(link);
    return card;
  }

  // 创建关键词徽章列表
  function createBadges() {
    var container = createElement('div', { class: 'helper-badges' });
    var label = createElement('span', { class: 'badge-label' }, '热门标签：');
    container.appendChild(label);
    config.badgeList.forEach(function(word) {
      var badge = createElement('span', { class: 'badge-item' }, word);
      container.appendChild(badge);
    });
    return container;
  }

  // 创建访问说明区域
  function createAccessInfo() {
    var info = createElement('div', { class: 'helper-info' });
    var heading = createElement('p', { class: 'info-heading' }, '访问说明');
    var list = createElement('ul', {});
    var items = [
      '请确保网络环境稳定，以获得最佳体验。',
      '使用最新版浏览器访问 ' + config.portalUrl + '。',
      '如遇问题，可尝试刷新页面或清除缓存。',
      '本页面仅作信息展示，不涉及任何交易操作。'
    ];
    items.forEach(function(text) {
      var li = createElement('li', {}, text);
      list.appendChild(li);
    });
    info.appendChild(heading);
    info.appendChild(list);
    return info;
  }

  // 注入样式
  function injectStyles() {
    var style = createElement('style', {});
    style.textContent = '' +
      '.helper-card {' +
        'background: #f5f7fa; border-left: 4px solid #1890ff; padding: 16px 20px; margin: 20px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);' +
      '}' +
      '.helper-card h3 { margin: 0 0 8px; color: #333; font-size: 18px; }' +
      '.helper-card p { margin: 0 0 12px; color: #555; line-height: 1.5; }' +
      '.helper-card a { color: #1890ff; text-decoration: none; font-weight: 500; }' +
      '.helper-card a:hover { text-decoration: underline; }' +
      '.helper-badges { margin: 16px 0; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }' +
      '.badge-label { font-weight: 600; color: #444; margin-right: 4px; }' +
      '.badge-item { background: #e6f7ff; border: 1px solid #91d5ff; color: #1890ff; padding: 4px 12px; border-radius: 20px; font-size: 13px; }' +
      '.helper-info { background: #fffbe6; border: 1px solid #ffe58f; padding: 12px 16px; border-radius: 4px; margin-top: 12px; }' +
      '.helper-info .info-heading { font-weight: 600; margin: 0 0 8px; color: #ad6800; }' +
      '.helper-info ul { margin: 0; padding-left: 20px; }' +
      '.helper-info li { color: #7a5a00; line-height: 1.6; }';
    document.head.appendChild(style);
  }

  // 初始化：将组件挂载到页面主内容区
  function init() {
    injectStyles();
    var target = document.querySelector('main') || document.querySelector('#content') || document.body;
    var wrapper = createElement('div', { id: 'site-helper-root' });
    wrapper.appendChild(createCard());
    wrapper.appendChild(createBadges());
    wrapper.appendChild(createAccessInfo());
    target.insertBefore(wrapper, target.firstChild);
  }

  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();