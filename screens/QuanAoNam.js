import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Image, ScrollView } from 'react-native';
import { 
  Button,
  Text, 
  Card, 
  Avatar, 
  Title, 
  Paragraph, 
  Appbar, 
  Searchbar, 
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import GeneralStatusBarColor from '../src/components/GeneralStatusBarColor';
import { Platform } from '@unimodules/core';
import ImageOverlay from 'react-native-image-overlay';

class QuanAoNam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: []
        }
      }
    
      state = {
        firstQuery: '',
      };
      
      componentDidMount() {
        const url = 'https://gist.githubusercontent.com/TonyInfinity/6b49f01f4ee8c6e11f8b150c45269083/raw/c3b1c7eda3be36a1417cd62889ecea3a3e267e10/tiki_results.json?fbclid=IwAR1EDtd9xTNSfdsN0XiCCIMjs6V7LxqTNlg6K8yfNu-C-QxthgYLjlW2_JE'
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson.product
          })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    
      state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };
    
      static navigationOptions = {
        header: null
      }
    
      renderItem = ({item}) => {
        return (
          <View style={{padding: 15}}>
            <Card>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
              <View style={{width: '50%'}}>
              <Card.Content>
                <Paragraph>{item.name}</Paragraph>
                <View>
                  <Paragraph style={{color: 'orange'}}>{item.price}</Paragraph>
                  <View>
                    <Button mode='outlined' style={{marginTop: 52}} onPress={() => console.log('Pressed')}>Fick!</Button>
                  </View>
                </View>
              </Card.Content>
              </View>
              <View style={{width: '50%'}}>
                <Card.Cover source={{uri: item.image}}/>
              </View> 
              </View>
              </Card>
          </View>
        );
      }
      
      render() {
        const { search } = this.state;
        const { firstQuery } = this.state;
        return (
        <View style={{flex: 1}}>
        <GeneralStatusBarColor backgroundColor="#6200ee" barStyle="light-content" />
        <Appbar.Header style={{elevation: 1, marginTop: 0}}>
        <Appbar.BackAction />
        <Appbar.Content title="Quần Áo Nam"/>
      </Appbar.Header>
          <ScrollView>
          <View> 
            <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem} /> 
          </View>
          </ScrollView>
        </View>  
        );
    }
}

export default QuanAoNam;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});