/**
 * router.jsx: defines react-router tree.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import DataNewState from './import/redux/container/data-new.jsx';
import DataAppendState from './import/redux/container/data-append.jsx';
import ModelGenerateState from './import/redux/container/model-generate.jsx';
import ModelPredictState from './import/redux/container/model-predict.jsx';
import ResultState from './import/redux/container/result.jsx';
import RegisterState from './import/redux/container/register.jsx';
import AnalysisLayoutState from './import/redux/container/analysis-layout.jsx';
import PageLayout from './import/layout/page.jsx';
import LoginLayout from './import/layout/login.jsx';
import RegisterLayout from './import/layout/register.jsx';
import NavBar from './import/navigation/nav-bar.jsx';

var AppRouter = React.createClass({
  // display result
    render: function() {
        {/* return:

            @history, is required per 'react-router's ability to handle url:

                - [GitHub-URL]/issues/2727#issuecomment-258030214

        */}

      // render routers
        return(
            <Router history={browserHistory}>
                <Route path='/' component={PageLayout}>
                    <Route
                        path='/session'
                        components={{
                            content: AnalysisLayoutState,
                            sidebar: NavBar,
                            css: 'container analysis-container',
                            layout: 'analysis'
                        }}
                    >
                        <Route
                            path='/session/data-new'
                            components={{
                                content: DataNewState,
                                session_type_value: 'data_new'
                            }}
                        />
                        <Route
                            path='/session/data-append'
                            components={{
                                content: DataAppendState,
                                session_type_value: 'data_append'
                            }}
                        />
                        <Route
                            path='/session/model-generate'
                            components={{
                                content: ModelGenerateState,
                                session_type_value: 'model_generate'
                            }}
                        />
                        <Route
                            path='/session/model-predict'
                            components={{
                                content: ModelPredictState,
                                session_type_value: 'model_predict'
                            }}
                        />
                        <Route
                            path='/session/result'
                            component={ResultState}
                        />
                    </Route>
                    <Route
                        path='/login'
                        components={{
                            content: LoginLayout,
                            sidebar: null,
                            css: 'container login',
                            layout: 'login'
                        }}
                    />
                    <Route
                        path='/logout'
                        components={{
                            content: LoginLayout,
                            sidebar: null,
                            css: 'container login',
                            layout: 'login'
                        }}
                    />
                    <Route
                        path='/register'
                        components={{
                            content: RegisterLayout,
                            sidebar: null,
                            css: 'container register',
                            layout: 'register'
                        }}
                    />
                </Route>
            </Router>
        );
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default AppRouter
