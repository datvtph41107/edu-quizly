import config from '~/config';
import AdminLayout from '~/layouts/AdminLayout';
import AdminLayoutCustomize from '~/layouts/AdminLayoutCustomize';
import MakeSlideLayout from '~/layouts/MakeSlideLayout';
import Admin from '~/page/Admin';
import CreateLesson from '~/page/CreateLesson';
import Home from '~/page/Home';
import Presentation from '~/page/Presentation';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.adminCreateLesson, component: CreateLesson, layout: AdminLayoutCustomize },
    { path: config.routes.createPresentSlide, component: Presentation, layout: MakeSlideLayout },
];

// Private routes for admin
const privateRoutes = [];

export { publicRoutes, privateRoutes };
