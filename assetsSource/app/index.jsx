import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './styles.less';
import img from '../../www/content/img/test.jpg';

import * as reducers from './reducers';

// const Index = () => {
//     return <React.Fragment>
//         <h1>Hello React!</h1>
//         <div className="row">
//             <div className="col-md-6">
//                 final pack! Yeeeess!
//             </div>
//         </div>
//         <img src={img} alt="test" />
//     </React.Fragment>;
// };

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const container = document.getElementById('root');


function Index() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );

}


ReactDOM.render(<Index />, container);
