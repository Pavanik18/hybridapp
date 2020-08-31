
import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet,ImageBackground } from 'react-native';
import { userLogin } from '../actions/userAction';
import { connect } from 'react-redux';
import { configureFonts, DefaultTheme } from 'react-native-paper';
//import {fonts } from './assets/fonts';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {} 
        };
        this.validateForm = this.validateForm.bind(this);
    }
    
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({password: text })
    }

    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email="Email address cannot be empty.";
        } else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="Please provide correct email address.";
        } else {
            errors.email='';
        }

        if (pass ===''){
            errors.pass="Password cannot be empty.";
        } else if(pass && pass.length < 5) {
            errors.pass="Password should have more than 5 characters.";
        } else {
            errors.pass='';
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
          //this.submitForm();
          const userinfo={
            email:this.state.email,
            password:this.state.password
          }
           console.log(userinfo,"userinfo")
           this.props.onLogin(userinfo)
    }
}

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    } 
componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
    }
}

    render() {
        const { errors} = this.state;
        return ( 
             <ImageBackground source={require('./image/wp.jpg')} style={styles.bg}>
               <View style ={styles.container}>
                <Image source = {require('./image/Logo2.png')} style = {styles.logo} />
                <Text style = {styles.text}>Connect</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} /> 
                <Text style={styles.errorstyle}> {errors.email}</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "black"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={styles.errorstyle}>{errors.pass}</Text>


                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.validateForm}>
                    <Text style = {styles.submitButtonText }> LOGIN </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {styles.RegisterButton}
                    onPress = {this.goToRegister}>

                    <Text style = {styles.RegisterButtonText }><Text style = {styles.text2}>New to Connect? </Text> Register Here</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
            );    
    }
}
function mapStateToProps(state) {
    console.log(state,"state")
    return{
        userReducer:state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);

const styles = StyleSheet.create({
    
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        //backgroundColor:'white'
       // backgroundImage: url("wp.jpg")
    },
    logo: {
        //borderRadius: 50,
        width:150, 
        height: 150, 
        marginTop: 130,
        marginBottom:3,

        //justifyContent: 'center',
        alignItems: 'center'
        
    },
    text: {
        color: 'rgb(11,40,75)',
        marginTop: -40,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom:210,
        fontFamily: 'Cochin'
        // textShadowOffset: {
        //     height: 5,
        //     width: 5
        // },
        // textShadowRadius: 5,
        // textShadowColor: '#1a0000'

    },
    input: {
        // margin: 10,
        // height: 40,
        // borderColor: '#000000',
        // borderWidth: 1.5,
        // borderRadius: 8,
        // width: '80%',
        // padding: 10,
        // fontSize: 13,
        // lineHeight: 20,
        // color: '#ffffff',
        // right: -0
         width:"80%",
      backgroundColor:"white",
      borderRadius:25,
      height:45,
      marginBottom:5,
      justifyContent:"center",
      padding:15,
      elevation:6,
     
    color:"black"
    },
    
    submitButton: {
        backgroundColor: 'rgb(11,40,75)',
        padding: 20,
        //margin: 10,
        height: 45,
        alignItems:"center",
      justifyContent:"center",
        borderRadius: 30,
        width: 180,
        //left: -5,
        marginTop:50,
      marginBottom:10,
        shadowOffset: { width: 1, height: 13 }, 
        shadowColor: '#000', 
        shadowOpacity: 0.8,
        elevation:6,
        shadowRadius:30


        
    },
    submitButtonText:{
        color: 'white',
        fontSize: 18,
        fontWeight:'bold',
        textAlign: 'center',
       // bottom: 11,
        letterSpacing:1,
        textShadowOffset: {
            height: 3,
            width: 3
        },
        textShadowRadius: 5,
        textShadowColor: '#1a0000'
       

    },
    // RegisterButton: {
    //     backgroundColor: '#ffffff',
    //     padding: 12,
    //     margin: 15,
    //     height: 40,
    //     borderRadius: 5,
    //     width: 90,
    //     left: 40,
    //     marginTop: -50,
        
    // },
    RegisterButtonText:{
        color: '#06d4d4',
        fontSize: 18,
        fontWeight: 'bold',
       marginTop:80,
        marginBottom: 1,

    },
    text2: {
        color: '#000000',
        marginBottom: 1,
        fontSize:15
    },
    bg:{
        // resizeMode:'contain',
        // height:'100%',
        // width:'100%',
        
    },
    errorstyle: {
        color: 'red',
    }
})
