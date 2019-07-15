import React from 'react';
import { StyleSheet, View, FlatList, StatusBar, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
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
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import { Platform } from '@unimodules/core';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  }
};

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
    <PaperProvider theme={theme}>
    <View style={{flex: 1}}>
    <GeneralStatusBarColor backgroundColor="#6200ee" barStyle="light-content" />
      <Surface style={{paddingLeft: 15, paddingRight: 15, paddingTop: 7.5, paddingBottom: 15, elevation: 1}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
        style={{elevation: 1}} />
      </Surface>

      <ScrollView>
      <View> 
        <FlatList
        data={this.state.dataSource}
        renderItem={this.renderItem} /> 
      </View>
      </ScrollView>
    </View>  
   
    </PaperProvider> 
    );
  }
}

class Male extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Image source={require('./assets/food-banner.jpg')} style={{flex: 1}}/>
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

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialCommunityIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

const BottomTabMaterial = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home, 
      navigationOptions: {
        title: 'Home',
        tabBarIcon: tabBarIcon('home')
      }
    },
    Female: {
      screen: Female,
      navigationOptions: {
        title: 'Nữ',
        tabBarIcon: tabBarIcon('gender-female')
      }
    },
    Male: {
      screen: Male,
      navigationOptions: {
        title: 'Nam',
        tabBarIcon: tabBarIcon('gender-male')
      }
    }
  },
  {
    /* shifting: true,
    activeColor: '#6200ee',
    inactiveColor: '#828792',
    barStyle: {
      backgroundColor: '#f8f7f9',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      borderColor: '#d0cfd0',
      */
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

export default createAppContainer(BottomTabMaterial);
