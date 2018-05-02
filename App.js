import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container,Header,Item,Input,Text, Button, Icon, Content, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor(){
    super()
    this.state = {resto: [], search : ""}
  }

  get = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

    var config = {
      headers:{'user-key':'b9e06411e939565767956ae122ad715c'}
    };

    axios.get(url, config)
    .then((ambilData)=>{
      this.setState({resto: ambilData.data.restaurants})
      
    })
  }

    render () {
      const data = this.state.resto.map((x,index) => {
        var data_nama = x.restaurant.name;
        var data_kota = x.restaurant.location.city;
        var data_alamat = x.restaurant.location.address;
        var data_harga = (x.restaurant.average_cost_for_two/2);
        var data_gambar = x.restaurant.thumb;


        return(
                <Card key = {index} style = {{flex: 0}}>

                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: data_gambar}} />
                      <Body>
                        <Text>{data_nama}</Text>
                        <Text note>{data_kota}</Text>
                      </Body>
                    </Left>

                    <Right>
                      <Text>{data_harga}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image source = {{uri: data_gambar}} style = {{height: 150, width : 300, flex: 0}} />
                    </Body>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Icon name = "thumbs-up" />
                      <Text>{data_alamat}</Text>
                    </Left>
                  </CardItem>

                </Card>
        )
      })

        return (
            <Container>

              <Header searchBar rounded>
                <Item>
                  <Icon name = "search" />
                  <Input placeholder = "Cari nama makanan" onChangeText={(x)=> {this.setState({search: x})}} value={this.state.form}/>
                </Item>
              </Header>

              <Header>
                <Button block onPress={()=> {this.get()}}>
                  <Text> LIHAT DAFTAR RESTO </Text>
                </Button>
              </Header>

              <Content>
                {data}
              </Content>
            </Container>
        )
    }
}

export default App;