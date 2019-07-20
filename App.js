import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Image, ScrollView, ImageBackground, AppRegistry, ActivityIndicator, Linking } from 'react-native';
import { 
  Button,
  Text, 
  Card, 
  Avatar, 
  Title, 
  Paragraph, 
  Appbar, 
  Searchbar, 
  Surface
} from 'react-native-paper';
import { WebView } from 'react-native-webview';
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
import QuanAoNu from './screens/QuanAoNu';
import DoLotNu from './screens/DoLotNu';
import GiayDepNu from './screens/GiayDepNu';
import PhuKienThoiTrangNu from './screens/PhuKienThoiTrangNu';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { shuffle } from 'lodash';
import Modal from 'react-native-modal';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', 
      dataSource: [],
      dataBackup: [],
      isLoading: true
    }; 
  }

  state = {
    firstQuery: '',
    search: '',
    showWebView: false,
    isModalVisible: false
  };

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()}`;
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.setState({ showWebView: !this.state.showWebView });
  };
  
  componentDidMount() {
    const url = 'https://gist.githubusercontent.com/TonyInfinity/6b49f01f4ee8c6e11f8b150c45269083/raw/c3b1c7eda3be36a1417cd62889ecea3a3e267e10/tiki_results.json?fbclid=IwAR1EDtd9xTNSfdsN0XiCCIMjs6V7LxqTNlg6K8yfNu-C-QxthgYLjlW2_JE'
    this.setState({ isLoading: true });  
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: shuffle(responseJson.product),
        dataBackup: responseJson.product,
        isLoading: false
      });
      })
    .catch((error) => {
      console.log(error)
    })
  }

  updateSearch = search => {
    this.setState({ search });
  };

  static navigationOptions = {
    header: null
  }

  renderContent() {
    return (
      <WebView
        source={{
          uri: this.state.webViewurl,
       }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
   }

  renderItem = ({item}) => {
    return (
      <View style={{padding: 15, paddingBottom: 0}}>
        <Card elevation={1}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          <View style={{width: '50%'}}>
          <Card.Content>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => {this.toggleModal(); this.setState({webViewurl: 'https://tiki.vn/ao-thun-nam-co-tron-biluxury-8-mau-sieu-mat-p21312399.html?src=category-page-914&2hi=0&spid=21312409'})}} onLongPress={() => Linking.openURL(item.image)} activeColor='blue'>
              <Paragraph style={{color: 'black'}}>{item.name}</Paragraph>
            </TouchableOpacity>
              <Paragraph style={{color: 'orange'}}>{item.price}</Paragraph>
            </View>
          </Card.Content>
          </View>
          <View style={{width: '50%'}}>
            <Image source={{uri: item.image}} style={{height: 216}} />
          </View> 
          </View>
          </Card>
      </View>
    );
  }

  render() {
    const { search } = this.state;
    const { firstQuery } = this.state;
    if (this.state.isLoading) {  
      return (  
       <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>  
        <ActivityIndicator />  
       </View>  
      );  
     }  
     
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1}}>
            <Surface elevation={1}>
                 <View style={{width: '100%', height: 500}}>
                  { this.renderContent() }
                </View> 
              <Button mode='contained' onPress={this.toggleModal} style={{borderRadius: 0}}>Đóng</Button>
            </Surface>
          </View>
      </Modal>
 
    <GeneralStatusBarColor backgroundColor="#6200ee" barStyle="light-content" />
      <Appbar.Header style={{paddingLeft: 15, paddingRight: 15, elevation: 1, marginTop: 0}}>
      <Searchbar
        placeholder="Search"
        value={this.state.query}
        onChangeText={(text) => this.filterList(text)}
        style={{elevation: 1}} />
      </Appbar.Header>
      <ScrollView>
      <View> 
        <FlatList
        extraData={this.state.dataSource}
        data={this.state.dataSource}
        renderItem={this.renderItem} />
      </View>
      </ScrollView>
    </View>  
    );
  }

  filterList = (text) => {  
    var newData = this.state.dataBackup;  
     newData = this.state.dataBackup.filter((item)=>{  
     const itemData = item.name.toLowerCase()  
     const textData = text.toLowerCase()  
     return itemData.indexOf(textData)>-1  
    });  
    this.setState({  
     query: text,  
     dataSource: newData 
    });  
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
          <Button mode='outlined' onPress={() => this.props.navigation.navigate('QuanAoNu')}><Text style={{color: '#ffffff'}}>Quần áo nữ</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='green' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('DoLotNu')}><Text style={{color: '#ffffff'}}>Đồ lót nữ</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='blue' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('GiayDepNu')}><Text style={{color: '#ffffff'}}>Giày dép nữ</Text></Button>
          </View>
        </ImageOverlay>
        <ImageOverlay source={require("./assets/men-clothes-banner.jpg")} rounded={0} overlayAlpha={0.2} overlayColor='yellow' height={150}>
          <View>
            <Button mode='outlined' onPress={() => this.props.navigation.navigate('PhuKienThoiTrangNu')}><Text style={{color: '#ffffff'}}>Phụ kiện thời trang nữ</Text></Button>
          </View>
        </ImageOverlay>
      </ScrollView>
      </View>
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

const FemaleStack = createStackNavigator({
  Female: {
    screen: Female
  },
  QuanAoNu: {
    screen: QuanAoNu
  },
  DoLotNu: {
    screen: DoLotNu
  },
  GiayDepNu: {
    screen: GiayDepNu
  },
  PhuKienThoiTrangNu: {
    screen: PhuKienThoiTrangNu
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
      screen: FemaleStack,
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

const App = createAppContainer(BottomTabMaterial);
export default App; 