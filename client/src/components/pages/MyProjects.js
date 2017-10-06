import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


function renderUnixTime(unixTime) {
    let localTime = moment.unix(unixTime).format('DD/MM/YYYY HH:mm');
    return <span>{localTime}</span>;
}


const PROJECTS_COLUMNS = [
    {
        id: 'projectName',
        Header: 'Project Name',
        accessor: obj => obj,
        Cell: props => {
            let projectUrl = `/projects/${props.value._id}`;
            return <Link to={projectUrl}>{props.value.title}</Link>;
        },
        Footer: (
            <Link to="/projects/add">Create New</Link>
        )
    },
    {
        Header: 'Permissions',
        accessor: 'userPermissions',
        Cell: props => {
            // TODO: replace with cookies
            const username = '';
            for (let projectPermission of props.value) {
                if (projectPermission.username === username) {
                    return <span>{projectPermission.permission}</span>;
                }
            }

            return <span>None</span>;
        }
    },
    {
        Header: 'Users',
        accessor: 'userPermissions',
        Cell: props => <span className='bold-text'>{props.value.length}</span>
    },
    {
        Header: 'Creation Time',
        accessor: 'creationTime',
        Cell: props => renderUnixTime(props.value)
    }
];


export default class MyProjects extends React.Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            deletingProject: null
        };
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects() {
        axios.get('/projects').then((response) => {
            this.setState({ projects: response.data });
        }).catch((error) => {
            // TODO: Show an error message
        });
    }

    deleteProject(projectId) {
        this.setState({deletingProject: projectId});

        axios.delete(`/projects/${projectId}`).then((response) => {
            this.fetchProjects();
            this.setState({deletingProject: null});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
          <div className="container">
              <ReactTable data={this.state.projects}
                          columns={PROJECTS_COLUMNS.concat([
                              {
                                  Header: 'Delete',
                                  accessor: '_id',
                                  Cell: props => {
                                      if (this.state.deletingProject === props.value) {
                                          return <img alt="loading" src="/img/gear.svg" style={{height: '2.5em'}} />
                                      }
                                      else {
                                          return <Button disabled={this.state.deletingProject != null}
                                                         onClick={() => this.deleteProject(props.value)}>X</Button>
                                      }
                                  },
                                  maxWidth: 80
                              }
                          ])}
                          showPagination={false}
                          className="projects-table"
                          minRows={0} />
          </div>
        );
    }
}
