import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import { Fragment } from 'react';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useStateContext } from './context/ContextProvider';
import LoadingRedirect from './components/LoadingRedirect';

function App() {
    const { loading } = useStateContext();
    return (
        <Router>
            <div className="App">
                {loading && <LoadingRedirect title="Loading..." />}
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
