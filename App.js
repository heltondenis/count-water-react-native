import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {consumido:0, status:'Ruim', pct:0, nome:'Carregando...'};

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCE6_0rP3gv4X1GUU57UcRTn5Qzy12gQmw",
    authDomain: "teste-8990b.firebaseapp.com",
    databaseURL: "https://teste-8990b.firebaseio.com",
    projectId: "teste-8990b",
    storageBucket: "teste-8990b.appspot.com",
    messagingSenderId: "170311062452"
  };
  firebase.initializeApp(config);
  firebase.database().ref("nome").on('value', (snapshot)=>{
    let state = this.state;
    state.nome = snapshot.val();
    this.setState(state);
  });

    this.addCopo = this.addCopo.bind(this);
    this.atualizar = this.atualizar.bind(this);
  }

  atualizar(){
    let s = this.state;
    s.pct = Math.floor(((s.consumido/2000)*100));

    if (s.pct >= 100) {
      s.status = "Bom";
    } else {
      s.status = "Ruim";
    }

    if (s.consumido == 2000) {
      Alert.alert('Boa! Você bateu sua meta diária!');
    }
    if (s.consumido >= 2600 && s.consumido <= 3600) {
      Alert.alert('Cuidado! Agua demais também não faz bem!')
      s.status = "Ruim";
    }
    if (s.consumido >= 3600) {
      Alert.alert('Para com isso! Você vai passar mal!')
      s.status = "Passando Mal!";
    }

    this.setState(s);
  }

  addCopo(){
    let s = this.state;
    s.consumido += 200;
    this.setState(s);

    this.atualizar();
  }

  render() {
    return (
      <View style={styles.body}>
        <ImageBackground source={require('./images/waterbg.png')} style={styles.bgimage}>
        <View>
          <Text style={styles.nomeUser}>{this.state.nome}</Text>
          <View style={styles.infoArea}>
            <View style={styles.area}>
              <Text style={styles.areaTitulo}>Meta</Text>
            <Text style={styles.areaDado}>200ml</Text>
            </View>
            <View style={styles.area}>
              <Text style={styles.areaTitulo}>Consumido</Text>
            <Text style={styles.areaDado}>{this.state.consumido}</Text>
            </View>
            <View style={styles.area}>
              <Text style={styles.areaTitulo}>Status</Text>
            <Text style={styles.areaDado}>{this.state.status}</Text>
            </View>
          </View>

          <View style={styles.pctArea}>
            <Text style={styles.pctText}>{this.state.pct}%</Text>
          </View>

          <View style={styles.btnArea}>
            <Button title="Beber 200ml" onPress={this.addCopo} />
          </View>

        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    body:{
      flex:1,
      paddingTop:20
    },
    bgimage:{
      flex:1,
      width:null
    },
    infoArea:{
      flex:1,
      flexDirection:'row',
      marginTop:70
    },
    area:{
      flex:1,
      alignItems:'center'
    },
    areaTitulo:{
      color:'#45b2fc',
      fontSize: 18
    },
    areaDado:{
      color:'#2b4274',
      fontSize:15,
      fontWeight:'bold'
    },
    pctArea:{
      marginTop:180,
      alignItems:'center',
    },
    pctText:{
      fontSize:70,
      color:'#FFFFFF',
      backgroundColor:'transparent'
    },
    btnArea:{
      marginTop: 30,
      alignItems:'center'
    },
    nomeUser:{
      fontSize:20,
      color:'#2b4274'
    }
});
