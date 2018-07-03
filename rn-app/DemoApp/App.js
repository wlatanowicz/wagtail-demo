import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

const API_URL = 'http://localhost:8000/api/v2/pages/';

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({ pages: data.items, isLoading: false }));
  }

  itemPressed(id) {
    this.props.navigation.push('PageDetail', {id});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.pages}
          keyExtractor={(i) => '' + i.id}
          renderItem={({item}) =>
             <TouchableOpacity onPress={() => this.itemPressed(item.id)}>
                 <Text style={styles.item}>{item.title}</Text>
             </TouchableOpacity>}
        />
      </View>
  );
  }
}

class PageDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API_URL + this.props.navigation.state.params.id)
      .then(response => response.json())
      .then(data => this.setState({ page: data, isLoading: false }));
  }

  htmlBody() {
    return this.state.page ? this.state.page.body : ''
  }

  title() {
    return this.state.page ? this.state.page.title : ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.title()}</Text>
        <HTMLView value={this.htmlBody()} />
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
    List: {
      screen: ListScreen,
    },
    PageDetail: {
      screen: PageDetailScreen,
    },
  },
  {
    initialRouteName: 'List',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    padding: 20,
    fontSize: 32,
  }
});
