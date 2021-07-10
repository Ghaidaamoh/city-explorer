import Card from 'react-bootstrap/Card'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
class Weather extends React.Component {
    render() {
        return (
            <>
                <div>Weather</div>
                {
                    <Card style={{ width: '18rem', display: 'inline-block' }}>

                        <Card.Body>
                            <Card.Text>

                                {this.props.weathers.valid_date}
                            </Card.Text>
                            <Card.Text>
                                {this.props.weathers.high_temp}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                }
            </>
        )
    }
}
export default Weather