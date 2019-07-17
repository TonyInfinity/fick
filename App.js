import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Image, ScrollView, ImageBackground, Dimensions, AppRegistry } from 'react-native';
import { 
  Button,
  Text, 
  Card, 
  Avatar, 
  Title, 
  Paragraph, 
  Appbar, 
  Searchbar, 
  Surface,
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import { Platform } from '@unimodules/core';
import ImageOverlay from 'react-native-image-overlay';

import QuanAoNam from './screens/QuanAoNam';
import DoLotNam from './screens/DoLotNam';
import GiayDepNam from './screens/GiayDepNam';
import PhuKienThoiTrangNam from './screens/PhuKienThoiTrangNam';

class Home extends React.Component {
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
      <Appbar.Header style={{paddingLeft: 15, paddingRight: 15, elevation: 1, marginTop: 0}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
        style={{elevation: 1}} />
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

class Male extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <GeneralStatusBarColor backgroundColor="#6200ee" barStyle="light-content" />
      <Appbar.Header style={{elevation: 1, marginTop: 0}}>
        <Appbar.BackAction />
        <Appbar.Content title="Danh mục"/>
      </Appbar.Header>
      <ScrollView>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='red' height={150}>
          <View>
          <Button mode='outlined' onPress={() => this.props.navigation.navigate('QuanAoNam')}><Text style={{color: '#ffffff'}}>Quần áo nam</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='green' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('DoLotNam')}><Text style={{color: '#ffffff'}}>Đồ lót nam</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='blue' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('GiayDepNam')}><Text style={{color: '#ffffff'}}>Giày dép nam</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='yellow' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('PhuKienThoiTrangNam')}><Text style={{color: '#ffffff'}}>Phụ kiện thời trang nam</Text></Button>
          </View>
        </ImageOverlay>
      </ScrollView>
      </View>
    );
  }
}

class Female extends React.Component {
  render() {
    return (
      <View><Text style={{fontSize: 30}}>Nữ</Text></View>
    );
  }
}

class Saved extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Saved</Text>
      </View>
    );
  }
}

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialCommunityIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

const MaleStack = createStackNavigator({
  Male: {
    screen: Male
  },
  QuanAoNam: {
    screen: QuanAoNam
  },
  DoLotNam: {
    screen: DoLotNam
  },
  GiayDepNam: {
    screen: GiayDepNam
  },
  PhuKienThoiTrangNam: {
    screen: PhuKienThoiTrangNam
  }
});

const BottomTabMaterial = createMaterialBottomTabNavigator ({
    Home: {
      screen: Home, 
      navigationOptions: {
        title: '',
        tabBarIcon: tabBarIcon('home')
      }
    },
    Female: {
      screen: Female,
      navigationOptions: {
        title: '',
        tabBarIcon: tabBarIcon('gender-female')
      }
    },
    Male: {
      screen: MaleStack,
      navigationOptions: {
        title: '',
        tabBarIcon: tabBarIcon('gender-male')
      }
    },
    Saved: {
      screen: Saved,
      navigationOptions: {
        title: '',
        tabBarIcon: tabBarIcon('heart')
      }
    }
  },
  {
    shifting: true,
    activeColor: '#ffffff',
    inactiveColor: '#eceff1',
    barStyle: {
      backgroundColor: '#6200ee',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      borderColor: '#6200ee',
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    /* backgroundColor: '#eceff1' */
  },
  banner: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 50.4
  }
});

/* AppRegistry.registerComponent('haha', () => MaleStack); */

const App = createAppContainer(BottomTabMaterial);
export default App;

/* export default createAppContainer(BottomTabMaterial); */