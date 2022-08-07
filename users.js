import axios from 'axios'

export function Users(){
    return {
       query: '',
       searchResults: [],
       requestList: [],
       user : {
        loginEmail: '',
        loginPassword: '',
        name: '',
        email: '',
        password: '',
        contact: ''
       }, 

       request: {
        type: '',
        description: ''
       },
       successText:'',
       isLoggedIn: true,
       isLoggingIn: false,
       isRegistering: true,
       isMakingRequest: false,
       showFeed: false,
       isChatting: false,


       register(){
        axios
            .post(`https://girl-connect.herokuapp.com/connect/register`, {
                full_name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                contact: this.user.contact
            })
            .then(data => {
                console.log(data)
                this.isLoggingIn = true
                this.isRegistering = false
            })
            .catch(error => console.log(error))
       },

       login(){
        axios
            .post(`https://girl-connect.herokuapp.com/connect/login`, {
                email: this.user.loginEmail,
                password: this.user.loginPassword
            })
            .then(data => {
                this.successText = "Log in success"

                console.log(data)
                this.isLoggedIn = false
                this.isLoggingIn = false
                this.isRegistering = false
                this.showFeed = true
            })
            .catch(error => console.log(error))
       },

       getCurrentUser(){
        return this.user.loginEmail
       },

       showReg(){
        this.isLoggingIn = false
        this.isRegistering = true
       },

       showLogin(){
        this.isLoggingIn = true
        this.isRegistering = false
       },

       showReq(){
        this.isLoggedIn = true
        this.isMakingRequest = true
        this.showFeed = false
       },
       createRequest(){
        axios
            .post(`https://girl-connect.herokuapp.com/connect/request`, {
                type: this.request.type,
                description: this.request.description,
                email: this.getCurrentUser()
            }).then(data => {
                console.log(data)
                this.request.description = ''
                this.request.type = ''
                this.showFeed = true
                this.isLoggedIn = false
            })
       },

       getRequests(){
        axios
            .get(`https://girl-connect.herokuapp.com/connect/feeds`)
            .then(data => {
                this.requestList = data.data.data
                console.log(this.requestList)
            })
       },

       search(){
            this.requestList = this.requestList.filter(item => item == query)
       }
    }
}