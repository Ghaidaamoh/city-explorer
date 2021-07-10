import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Movies from "./component/Movies";
import Weather from "./component/Weather";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityInfo: {},
      WeatherInformation: [],
      showWeather: false,
      searchData: '',
      mapDetalis: false,
      movieInformation: []

    }
  }

  cityLocation = async (e) => {
    e.preventDefault();

    await this.setState({
      searchData: e.target.city.value
    })

    console.log('location', this.state.searchData)

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchData}&format=json`;

    let resData = await axios.get(url);

    console.log(resData)
    console.log(resData.data)
    console.log(resData.data[0])

    this.setState({
      cityInfo: resData.data[0],
      mapDetalis: true
    })
    // This for weather information 
    this.renderWeather();
    this.renderMovie();
  }


  renderWeather = async () => {
    const city = this.state.searchData.charAt(0).toUpperCase() + this.state.searchData.slice(1);

    let weatherUrl = `http://localhost:3005/getCityInfo?cityName=${city}&format=json`;

    let weatherData = await axios.get(weatherUrl)
    await this.setState({
      WeatherInformation: weatherData.data,
      showWeather: true,
    })

    // console.log(this.state.WeatherInformation.map(day => day.description))

  }

  renderMovie = async () => {
    const city = this.state.searchData.charAt(0).toUpperCase() + this.state.searchData.slice(1);
    let movieUrl = `http://localhost:3005/movies?cityName=${city}`;
    let movieData = await axios.get(movieUrl)
    console.log(movieData);
    await this.setState({
      movieInformation: movieData.data,
    })

  }
  render() {
    return (
      <div style={{ display: "inline-block", margin: "25px" }}>
        <h1>City Explorer</h1>
        <form onSubmit={this.cityLocation}>
          <input type='text' placeholder='city name' name='city' />
          <input type='submit' value='get City data' />
        </form>
        {/* 
        <p>City Name: {this.state.cityInfo.display_name},{this.state.cityInfo.lat},{this.state.cityInfo.lon}</p>

        {this.state.mapDetalis && 
        <img alt='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=15`} />
        }       */}

        <Card style={{ width: '18rem' }}>

          <Card.Body>
            <Card.Title> {this.state.cityInfo.display_name}</Card.Title>
            <Card.Text>
              {this.state.cityInfo.lat}
            </Card.Text>
            <Card.Text>
              {this.state.cityInfo.lon}
            </Card.Text>
            {this.state.mapDetalis &&
              <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=15`} alt='' />
            }

          </Card.Body>
        </Card>
        <>
          <Weather weathers={this.state.WeatherInformation} />
          <Movies movies={this.state.movieInformation} />
        </>
      </div>

    )
  }
}

export default App;


