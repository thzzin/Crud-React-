import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'


const headerProps = {
    icon:'users',
    title:'Leads',
    subtitle:'Cadastro de Lead: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: '', insta:'', face:'', nomeDono:'', cnpj:''},
    list: []
}

export default class UserCrud extends Component {
    state = {...initialState}

    componentDidMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({user: initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    uptadeField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o Nome" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.email} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o Email" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Instagram</label>
                            <input type="text" className="form-control" name="insta" value={this.state.insta} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o Instagram" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Facebook</label>
                            <input type="text" className="form-control" name="face" value={this.state.face} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o Facebook" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Dono</label>
                            <input type="text" className="form-control" name="nomeDono" value={this.state.nomeDono} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o nome do dono" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CNPJ</label>
                            <input type="text" className="form-control" name="cnpj" value={this.state.cnpj} 
                            onChange={(e => this.uptadeField(e))} placeholder="Digite o CNPJ" />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)} >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }

    renderTable(){
        return(
            <table className="table mt-6">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Instagram</th>
                        <th>Facebook</th>
                        <th>Dono</th>
                        <th>CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    
    renderRows(){
        return this.state.list.map(user =>{
            return(
                
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.insta}</td>
                    <td>{user.face}</td>
                    <td>{user.nomeDono}</td>
                    <td>{user.cnpj}</td>
                    <td>
                        
                    </td>
                    <td>  
                      
                    <button className="btn btn-warning" onClick={()=> this.load(user)} >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger mt-2" onClick={() => this.remove(user)} >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
              
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}