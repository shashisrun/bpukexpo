import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import Data from "./../data/Data"

const data = new Data;
const DATA = async () => await data.getData('zone') 
  
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
};
  
const renderItem = ({ item }) => <Item title={item.name} />;

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }
  
  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
         inputStyle={{backgroundColor: 'white',}}
         containerStyle={{backgroundColor: 'white',borderRadius: 10,marginHorizontal:16,marginVertical:10,borderWidth:1,}}
         inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="Search Here..."
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={true}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
  
export default SearchScreen;
  
const styles = StyleSheet.create({
  container: {
    marginVertical:10,
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
});