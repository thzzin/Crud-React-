import React, { useReducer } from 'react'
import {Swtich, Route, Redirect, Switch} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud}/>
        <Redirect from='*' to='/'/>
    </Switch>