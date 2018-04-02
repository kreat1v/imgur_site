import React, { Component } from 'react';

import './PostList.css';

import Select from './Select';
import View from './View';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'hot',
            sort: null,
            window: null,
            page: 1,
            data: [],
            marker: true,
            key: 123
        };
    
        this.category = this.category.bind(this);
        this.sort = this.sort.bind(this);
        this.window = this.window.bind(this);        
        this.getData = this.getData.bind(this);
        this.handleScroll = this.handleScroll.bind(this);         
    }

    componentWillMount() {
        this.getData('https://api.imgur.com/3/gallery/' + this.state.category);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    category(parametr) {
        this.getData('https://api.imgur.com/3/gallery/' + parametr);

        switch (parametr) {
            case 'user':
            this.setState({
                category: parametr,
                sort: 'viral',
                key: Math.random()
            });
            break;

            case 'top': 
            this.setState({
                category: parametr,
                window: 'day',
                key: Math.random()
            });
            break;

            default:
            this.setState({
                category: parametr,
                key: Math.random()
            });
        }
    }

    sort(parametr) {
        this.getData('https://api.imgur.com/3/gallery/user/' + parametr);

        this.setState({
            sort: parametr,
            key: Math.random()
        });
    }

    window(parametr) {
        this.getData('https://api.imgur.com/3/gallery/top/' + parametr);

        this.setState({
            window: parametr,
            key: Math.random()
        });
    }

    getData(str) {
        fetch(str, {
            method: 'GET',
            headers: {
              "Authorization": "Client-ID 3c7254dc9ab6a60"
            }
        })          
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                data: json.data
            });
        })
    }

    handleScroll () {
        let _this = this;
        let searchStr = '';

        switch (_this.state.category) {
            case 'user':
            searchStr = 'https://api.imgur.com/3/gallery/user/' + _this.state.sort + '/' + _this.state.page;
            break;

            case 'top': 
            searchStr = 'https://api.imgur.com/3/gallery/top/' + _this.state.window + '/' + _this.state.page;
            break;

            default:
            searchStr = 'https://api.imgur.com/3/gallery/hot/' + _this.state.page;
        }

        if (document.body.scrollHeight - window.screen.height - window.scrollY < 0) {
            if ( _this.state.marker ) {
                console.log(searchStr);

                fetch(searchStr, {
                    method: 'GET',
                    headers: {
                        "Authorization": "Client-ID 3c7254dc9ab6a60"
                    }
                })          
                .then((response) => response.json())
                .then((json) => {
                    _this.setState(function(state){
                        return {
                            data: state.data.concat(json.data),
                            page: state.page + 1
                        }
                    })
                })

                _this.setState({
                    marker: false
                });

                setTimeout(function() {
                    _this.setState({
                        marker: true
                    });
                }, 500)
            }
        }
    }

    render() {
        let _this = this;
        const category = ['hot', 'top', 'user'];
        const sort = ['viral', 'top', 'time', 'rising'];
        const window = ['day', 'week', 'month', 'year', 'all'];

        function select() {
            switch (_this.state.category) {
                case 'user':
                return <div className="flex">
                    <h1 className="header">and sort method</h1>
                    <Select data={_this.sort} filter={sort} />
                </div>
                break;
    
                case 'top': 
                return <div className="flex">
                    <h1 className="header">and sort method</h1>
                    <Select data={_this.window} filter={window} />
                </div>
                break;
    
                default:
                return null;
            }
        }

        return (
            <div>
                <div className="flex">
                    <div className="flex">
                        <h1 className="header">select a category</h1>
                        <Select data={this.category} filter={category} />
                    </div>
                    {select()}
                </div>
                <div key={this.state.key} className="flex">
                    {
                        this.state.data.map(function(item) {
                            return <View data={item} />
                        })
                    }
                </div>
                <div>Loading...</div>
            </div>
        );
    }
}

export default PostList;