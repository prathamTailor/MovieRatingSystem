import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <>
        <div className='dashboard'>
            <CardGroup>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Add Movie</Card.Title>
                    <Card.Text>
                    Add Movie by providing necessary information
                    </Card.Text>
                    <Card.Link href="/AddMovie">Add Movie</Card.Link>
                </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Add Celebrity</Card.Title>
                    <Card.Text>
                    Add Movie by providing necessary information
                    </Card.Text>
                    <Card.Link href="/AddCelebrity">Add Celebrity</Card.Link>
                </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Add Role</Card.Title>
                    <Card.Text>
                    Add Movie by providing necessary information
                    </Card.Text>
                    <Card.Link href="/AddRole">Add Role</Card.Link>
                </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Asign Celebrity and Role</Card.Title>
                    <Card.Text>
                    Assign celebrity to movie and role to the celebrity
                    </Card.Text>
                    <Card.Link href="/AssignCR">Assign</Card.Link>
                </Card.Body>
                </Card>

            </CardGroup>
        </div>
    </>
  )
}

export default Dashboard