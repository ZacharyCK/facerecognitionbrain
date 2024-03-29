import React from "react";


class SignIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})    
    }

    onSubmitRegister = () => {
        fetch('https://mysmartbrainbackend.onrender.com/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }

    enterKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.onSubmitRegister()
        }
    }

    render() {
        return (
            <article className="mw6 br3 mv4 ba b--black-10 shadow-5 w-100 w-50-m w-25-l center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange} onKeyDown={this.enterKeyPress} />
                        </div>
                        </fieldset>
                        <div className="center">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmitRegister} />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default SignIn;