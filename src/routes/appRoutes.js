import { Routes, Route } from "react-router";
import LoginPage from '../modules/auth/loginPage';
import DashboardPage from '../modules/dashboard/dashboardPage';
import ProtectedRoute from './protectedRoute';
import DashboardLayout from "../layouts/dashboardLayout";
import PageNotFound from "../components/common/404";
import UserList from "../modules/users/userList";

import InputRefExample from "../modules/hooks/useRefExample";
import UseContextExample from "../modules/hooks/useContext";
import UseMemoExample from "../modules/hooks/useMemo";
import UseCallBackExample from "../modules/hooks/useCallback";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UserList />} />
            {/* <Route element={<DashboardLayout />}>
            <Route path="/useRef" element={<InputRefExample />} />
            <Route path="/useContext" element={<UseContextExample />} />
            <Route path="/useMemo" element={<UseMemoExample number={5} />} />
            <Route path="/useCallback" element={<UseCallBackExample />} /> */}
            {/* Add more nested routes here */}
            <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
);

export default AppRoutes;