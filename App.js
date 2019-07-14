import React from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { 
  Button, 
  BottomNavigation, 
  Text, 
  Card, 
  Avatar, 
  Title, 
  Paragraph, 
  Appbar, 
  Searchbar, 
  Badge, 
  Chip
} from 'react-native-paper';

/*
const MusicRoute = () => <Text>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  state = {
    firstQuery: '',
  };

  /*
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });
  */

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
                <Button mode='outlined' style={{marginTop: 52}}>Fick!</Button>
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
    <View>
      <Appbar.Header style={{paddingLeft: 8, paddingRight: 8}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
        style={{shadowOpacity: 0, borderRadius: 0}}
      />
      </Appbar.Header>

      <View> 
        <FlatList
        data={this.state.dataSource}
        renderItem={this.renderItem} /> 
      </View>
    </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eceff1'
  },
});
