/**
 * results.jsx: list all prediction result, with link to corresponding
 *              prediction result item.
 *
 * @CurrentResultDisplay, must be capitalized in order for reactjs to render it as a
 *     component. Otherwise, the variable is rendered as a dom node.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'core-js/modules/es7.object.entries';
import { setLayout, setContentType } from '../redux/action/page.jsx';
import Spinner from '../general/spinner.jsx';
import ajaxCaller from '../general/ajax-caller.js';

class ResultsDisplay extends Component {
    // initial 'state properties'
    constructor() {
        super();
        this.state = {
            titles: null,
            status: null,
            display_spinner: false,
        };
    }
    componentWillMount() {
        // update redux store
        const actionLayout = setLayout({ layout: 'analysis' });
        this.props.dispatchLayout(actionLayout);

        const actionContentType = setContentType({ layout: 'result' });
        this.props.dispatchContentType(actionContentType);
    }
    // call back: get all titles, and nid from server side
    componentDidMount() {
        // ajax arguments
        const ajaxEndpoint = '/retrieve-prediction-titles';
        const ajaxArguments = {
            endpoint: ajaxEndpoint,
            data: null,
        };

        // boolean to show ajax spinner
        if (
            this.state &&
            !this.state.display_spinner
        ) {
            this.setState({ display_spinner: true });
        }

        // asynchronous callback: ajax 'done' promise
        ajaxCaller(
            (asynchObject) => {
                // Append to DOM
                if (asynchObject && asynchObject.error) {
                    this.setState({ ajax_done_error: asynchObject.error });
                } else if (asynchObject) {
                    const results = asynchObject;

                    // enumerate and store response
                    this.setState(Object.assign({}, results));
                }
                // boolean to hide ajax spinner
                this.setState({ display_spinner: false });
            },
            // asynchronous callback: ajax 'fail' promise
            (asynchStatus, asynchError) => {
                if (asynchStatus) {
                    this.setState({ ajax_fail_status: asynchStatus });
                    console.log(`Error Status: ${asynchStatus}`);
                }
                if (asynchError) {
                    this.setState({ ajax_fail_error: asynchError });
                    console.log(`Error Thrown: ${asynchError}`);
                }
                // boolean to hide ajax spinner
                this.setState({ display_spinner: false });
            },
            // pass ajax arguments
            ajaxArguments,
        );
    }
    render() {
        // local variables
        const status = this.state.status;
        const titles = this.state.titles;
        const spinner = this.state.display_spinner ? <Spinner /> : null;

        // polyfill 'entries'
        if (!Object.entries) {
            entries.shim();
        }

        // generate result
        if (status == 0 && titles && titles.length > 0) {
            var resultList = (<ul className='result-list'>{
                titles.map((title) => {
                    if (title.length == 3) {
                        return (<NavLink
                            to={`/session/current-result?nid=${title[0]}`}
                            key={`link-${title[0]}`}
                        >
                            <li key={`title-${title[0]}`}>
                                {title[0]}: {title[1]}
                            </li>
                        </NavLink>);
                    }
                })
            }
                              </ul>);
        } else {
            var resultList = (<div className='result-list'>
                Sorry, no results available!
                              </div>);
        }

        // display result
        return (
            <div className='result-container'>
                <h2>Your Results</h2>
                <div>{resultList}</div>
                {spinner}
            </div>
        );
    }
}

// indicate which class can be exported, and instantiated via 'require'
export default ResultsDisplay;
