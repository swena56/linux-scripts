import React from 'react';
import Reflux from 'reflux';

var TimeActions = Reflux.createActions(['tick']);

class TimeStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = TimeActions;

        // whatever state you want to store should
        // now be on a state property in the store
        this.state = { ticks: 0 };
    }

    onTick(tick)
    {
        // now update values in your store via setState
        this.setState({ ticks: this.state.ticks+1 });
    }
}

class Watch extends Reflux.Component
{
    constructor(props)
    {
        super(props);

        // set this.store to the store class itself
        this.store = TimeStore;
    }

    render()
    {
        // from now any any changes to the store will automatically
        // reflect in your component's state.
        return <p>{this.state.ticks} ticks...</p>;
    }
}