// import React, {Component} from 'react';
// import {View, Text,Image, ImageBackground, StyleSheet} from 'react-native';
// import * as Animatable from 'react-native-animatable';

// //<link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@800&display=swap" rel="stylesheet">
// // MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

// class Home extends Component{
   
//     componentDidMount(){
//         // Start counting when the page is loaded
//         this.timeoutHandle = setTimeout(()=>{
//         // Add your logic for the transition
//             this.props.navigation.navigate('Login');
//         }, 3000);
//     }
    
//     componentWillUnmount(){
//         clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
//     }

//     componentDidUpdate() {
//         if (this.view !== undefined && this.view !== null) {
//           this.view.fadeIn(500);
//         }
//       }

//     render(){
//         return(
//             <View style ={styles.container} animation="fadeInLeft" easing="ease-in" duration="1000" iterationCount='1'>
//                 <ImageBackground source={require('./image/img33.jpg')} style={styles.back }>

//                 <Animatable.View style ={styles.slide}ref={ref => (this.view = ref)}
//                     animation="fadeInLeft"
//                     easing="ease-in">

//                     <View style ={styles.container1}>
//                         <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" source={require('./image/Logo2.png')} style={styles.logo} ></Animatable.Image>
//                     </View>

//                     <View style ={styles.container2}>
                        
//                         <Text style={styles.text,styles.title}> Connect</Text>
//                     </View>
                    

//                 </Animatable.View>
//                 {/* <View style ={styles.container2}>
//                     <Image source={require('./image/chatgroup.png')} style={styles.Image} ></Image>
//                 </View> */}
//                 </ImageBackground>
//             </View>

            
//         );
//     }


// }


// export default Home;

// const styles=StyleSheet.create({
//     container:{
//         justifyContent:'center',
//         alignItems:'center',
//         flex:1
//     },
//     container1:{
//         justifyContent:'flex-end',
//         alignItems:'center',
//         flex:1,
//         width:'100%',
//         // height:'70%',
//         // paddingTop:200

//     },
//     container2:{
//         justifyContent:'flex-start',
//         alignItems:'center',
//         flex:1,
//         width:'100%',
//         // height:'30%',
//         // backgroundColor:'rgba(255,255,255,0.7)'

//     },
//     slide:{
//         backgroundColor:'rgba(255,255,255,0.85)',
//         marginTop:'50%',
//         height:'40%',
//         marginRight:50,
//         marginLeft:50,
//         borderRadius:50,
//         borderTopRightRadius:50,
//         borderBottomRightRadius:50,
//         // borderWidth:2
//         // elevation:50
//     },
//     // Image:{
//     //     height:220,
//     //     width:'50%',
//     //     resizeMode:'contain'
//     // },
//     text:{
//         //font-family: 'Baloo Tamma 2', cursive;
//         fontSize:20,
//         fontWeight:'bold',
//         justifyContent:'center'
//     },
//     title:{
//         color:'rgb(0,238,250)',
//         // color:'white',
//         fontSize:30,
//         fontWeight:'bold',
//         //borderWidth:0.5,
//         borderRadius:10,
//         // elevation:4
//     },
//     back:{
//         resizeMode:'contain',
//         height:'100%',
//         width:'100%'
//     },
//     logo:{
//         height:110,
//         width:'40%',
//         resizeMode:'contain',
//         alignItems:'center',
    
//     },
    
// })
import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        this.props.onUserList();
    }

    goChat = (userid, name) => {
        this.props.navigation.navigate('Chat', {userid: userid, name: name});
    }

    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users: this.props.userReducer.userList});
            
        }
    }

//     render(){
//         const { users } = this.state;
//         return (
//               <View style={styles.container}>
//                 {users && users.length>0 ?
//                 <View>
//                 {users.map((item,index) => {
//                     return(
//                         <TouchableOpacity onPress={()=>this.goChat(item._id, item.name)}   key={index}>
//                         <Text style ={styles.item}>
//                             {item.name}
//                         </Text>
//                         </TouchableOpacity>
//                    })}
//                 </View>:null}
//                 </View>
//              )
//     }
// }
render() {
    const { users } = this.state;
    return (
        <ScrollView>
        <View style = {styles.container}>

            {users && users.length>0?
            <View>
                {users.map((item,index) =>
                {
                    return(<TouchableOpacity onPress={()=>this.goChat(item._id,item.name)} key={index}>
                        <Text style={styles.item}>
                            {item.name}
                        </Text></TouchableOpacity>
                    )})}
            </View>:null}
            </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return{
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onUserList:() => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 55,
        color: '#000000',
        fontWeight: 'bold',
        //borderWidth: 1.5,
        borderBottomColor: 'white',
        borderBottomWidth: 10,
        borderTopColor: '#f2f2f2',
        backgroundColor: 'rgb(101,92,171)',
        borderTopEndRadius: 15,
    },
});