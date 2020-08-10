import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TaskForm from '../components/Forms/TaskForm'
import TasksTable from '../components/Tables/TasksTable'
import TaskModal from '../components/Modals/DefaultModal'
import TaskDetail from '../components/Views/TaskDetail'
import TaskHeader from '../components/Headers/TaskHeader'
import { Button } from 'react-bootstrap'
import { get, post, put, remove } from '../servives/api'

export default () => {

    useEffect(() => {
        getTasks()
        getDevs()
    }, [])

    const [tasks, setTasks] = useState([])
    const [devs, setDevs] = useState([])
    const [filter, setFilter] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState({})
    const [modalTitle, setModalTitle] = useState('Nueva taréa')

    const getTasks = async () => {
        try {
            const tasks = await get('tasks/get-tasks')
            console.log(tasks.data.tasks)
            setTasks(tasks.data.tasks)
        } catch (e) {
            console.log(e)
        }
    }

    const addTask = async (values) => {
        try {
            let request = values
            request.plannedHours = parseFloat(request.plannedHours)
            await post('tasks/new-task', values)
            toast('Nueva tarea agregada', { type: 'info', autoClose: 2000, hideProgressBar: true })
            getTasks()
        } catch (e) {
            console.log(e)
            toast('Problemas al agregar tarea', { type: 'error', autoClose: 2000, hideProgressBar: true })
        }
    }

    const editTask = async (values) => {
        try{
            await put(`tasks/update-task/${values._id}`, values)
            toast('Tarea actualizada', { type: 'info', autoClose: 2000, hideProgressBar: true })
            getTasks()
        } catch (e) {
            console.log(e)
            toast('Problemas al editar tarea', { type: 'error', autoClose: 2000, hideProgressBar: true })
        }
    }

    const getDevs = async () => {
         try {
            const response = await get('devs/get-devs')
            setDevs(response.data.devs)
        } catch (e) {
            console.log('ERROR', e)
        }
    }

    const onDelete = async (_id) => {
        try {
            if (window.confirm('Eliminar tarea?')) {
                await remove(`tasks/delete-task/${_id}`)
                toast('Tarea eliminada', { type: 'error', autoClose: 2000, hideProgressBar: true })
                getTasks()
            }
        } catch (e) {
            console.error(e)
            toast('Problemas al eliminar', { type: 'warning', autoClose: 2000, hideProgressBar: true })
        }
    }

    const searchTask = async e => {
        try {
            e.preventDefault()
            console.log('SEARCH:', filter)
            let query = `?name=${filter.name ? filter.name : ''}&state=${filter.state ? filter.state : ''}&devId=${filter.devId ? filter.devId : ''}&priority=${filter.priority ? filter.priority : ''}`
            const tasks = await get(`tasks/get-by-params/${query}`)
            setTasks(tasks.data)
            console.log('tasks:',tasks)
        } catch (e) {
            console.log(e)   
        }
    }

    const openNewModal = () => {
        setData({action: 'new'})
        setModalTitle('Nueva taréa')
        handleShow()
    }

    const openEditModal = data => {
        setData({action: 'edit', ...data})
        setModalTitle('Editar taréa')
        handleShow()
    }

    const openViewModal = data => {
        setData({action: 'view', ...data})
        setModalTitle('Taréa')
        handleShow()
    }

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <TaskHeader {...{searchTask, setFilter, filter, devs}} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <Button className="btn btn-info" variant="primary" onClick={openNewModal}>
                                            Nueva tarea
                                        </Button>
                                        <TaskModal onHide={handleClose} show={show} title={modalTitle} >
                                            { data.action === 'new' || data.action === 'edit' ?
                                            <TaskForm  onHide={handleClose} {...{ tasks, devs, data, addTask, editTask }} /> :
                                            <TaskDetail {...{data}} />
                                            }
                                        </TaskModal>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div style={{'overflow': 'auto'}}>
                                            <TasksTable {...{ tasks, onDelete, openViewModal }} handleShow={openEditModal} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
