import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostList from './PostList';
import Post from './Post';

class Imgur extends Component{
    render() {
        return <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={PostList} />
                    <Route path="/:section/:id" component={Post} />                    
                </Switch>
            </div>
        </BrowserRouter>;
    }
}

export default Imgur;