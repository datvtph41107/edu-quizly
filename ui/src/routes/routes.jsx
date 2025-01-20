import config from '~/config';
import AdminLayout from '~/layouts/AdminLayout';
import Admin from '~/page/Admin';
import Home from '~/page/Home';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
];

// Private routes for admin
const privateRoutes = [];

export { publicRoutes, privateRoutes };
