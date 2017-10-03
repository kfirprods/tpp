import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
    // TODO: Add creation time column
];


export default class MyProjects extends React.Component {
    constructor() {
        super();
        this.state = { projects: [] };
    }

    componentDidMount() {
        axios.get('/projects').then((response) => {
            this.setState({ projects: response.data });
        }).catch((error) => {
            // TODO: Show an error message
        });
    }

    render() {
        return (
          <div className="container">
              <ReactTable data={this.state.projects}
                          columns={PROJECTS_COLUMNS}
                          showPagination={false}
                          className="projects-table"
                          minRows={0} />
          </div>
        );
    }
}
