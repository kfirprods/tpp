import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from "../../actions/ProjectActions";
import LoginStore from '../../stores/LoginStore';


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
            for (let projectPermission of props.value) {
                if (projectPermission.username === LoginStore.username) {
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
        this.projectStoreChangeListener = this.projectStoreChangeListener.bind(this);
    }

    componentDidMount() {
        ProjectStore.addChangeListener(this.projectStoreChangeListener);

        ProjectActions.fetchProjects();
    }

    projectStoreChangeListener() {
        this.setState({
            projects: ProjectStore.projects
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
