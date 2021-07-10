import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
class Movies extends React.Component {
  render() {
    return (
      <>
        <div>movies</div>
        {
          this.props.movies.map(mov => {
            return (

              <Card style={{ width: '18rem', display: 'inline-block' }}>
                <Card.Img variant="top" src={mov.image_url} />
                <Card.Body>
                  <Card.Title>{mov.title}</Card.Title>
                  <Card.Text>
                    <p>{mov.overview}</p>
                    <p>{mov.average_votes}</p>
                    <p>{mov.total_votes}</p>
                    <p>{mov.total_votes}</p>
                    <p>{mov.popularity}</p>
                    <p>{mov.released_on}</p>
                  </Card.Text>
                </Card.Body>
              </Card>)
          })
        }
      </>
    )
  }
}
export default Movies