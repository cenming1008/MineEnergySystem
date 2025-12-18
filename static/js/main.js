import { initRouter } from './utils/router.js';
import { setupNavbar } from './components/navbar.js';
import { renderDashboard, destroyDashboard } from './pages/dashboard.js';
import { renderDeviceManager } from './pages/deviceManager.js';
import { renderFDD } from './pages/fdd.js';
import { renderReports } from './pages/report.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 初始化全局导航栏 (报警铃铛等)
    setupNavbar();

    // 2. 获取主容器
    const appContainer = document.getElementById('app-container');

    // 3. 定义路由表
    // key 对应 index.html 里的 data-page 属性
    // value 是对应的渲染函数
    const routes = {
        'dashboard': async () => {
            await renderDashboard(appContainer);
        },
        'devices': async () => {
            destroyDashboard(); // 切走时停止轮询
            await renderDeviceManager(appContainer);
        },
        'fdd': async () => {
            destroyDashboard();
            await renderFDD(appContainer);
        },
        'report': async () => {
            destroyDashboard();
            renderReports(appContainer);
        }
    };

    // 4. 启动路由监听
    initRouter(routes);

    // 5. 默认进入首页
    renderDashboard(appContainer);
});