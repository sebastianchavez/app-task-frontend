//******** React ********/
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

//******** Services ********/
import { get, post, put, remove } from '../servives/api'
import { log, error } from '../servives/logger'
import { toast, confirm } from '../servives/messages'

//******** Components ********/
import TaskForm from '../components/Forms/TaskForm'
import TasksTable from '../components/Tables/TasksTable'
import TaskModal from '../components/Modals/DefaultModal'
import TaskDetail from '../components/Views/TaskDetail'
import TaskHeader from '../components/Headers/TaskHeader'


//******** CONSTANTS ********/
import CONSTANTS from '../constants/constants'

export default () => {

    useEffect(() => {
        getTasks()
        getDevs()
    }, [])

    const [tasks, setTasks] = useState([])
    const [devs, setDevs] = useState([])
    const [filter, setFilter] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [data, setData] = useState({})
    const [modalTitle, setModalTitle] = useState('Nueva taréa')
    const [quant, setQuant] = useState(CONSTANTS.QUANT[0].value)
    const [user, setUser] = useState(localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : null )

    const getTasks = async () => {
        try {
            if(user){
                const tasks = await get(`tasks/get-by-userId/${user._id}/quant/${quant}`)
                log('Tasks', 'getTasks', {info: 'Success getTasks', response: tasks})
                setTasks(tasks.data)
            }
        } catch (e) {
            error('Tasks', 'getTasks', {info: 'Catch error getTasks', error: e})
        }
    }

    const addTask = async (values) => {
        try {
            let request = values
            request.plannedHours = parseFloat(request.plannedHours)
            await post('tasks/new-task', values)
            log('Tasks', 'addTask', {info: 'Success addTask'})
            toast('Nueva tarea agregada')
            filterTask()
        } catch (e) {
            error('Tasks', 'addTask', {info: 'Catch error', error: e})
            toast('Problemas al agregar tarea', 'error')
        }
    }

    const editTask = async (values) => {
        try{
            await put(`tasks/update-task/${values._id}`, values)
            log('Tasks', 'editTask', {info: 'Success editTask'})
            toast('Tarea actualizada')
            filterTask()
        } catch (e) {
            error('Tasks', 'editTask', {info: 'Catch error', error: e})
            toast('Problemas al editar tarea', 'error')
        }
    }

    const getDevs = async () => {
         try {
             if(user){
                 const response = await get(`devs/get-by-userId/${user._id}/quant/all`)
                 log('Tasks', 'getDevs', {info: 'Success getDevs', response})
                 setDevs(response.data)
             }
        } catch (e) {
            error('Tasks', 'getDevs', {info: 'Catch error', error: e})
        }
    }

    const onDelete = async (_id) => {
        try {
            let res = await confirm('Desea eliminar esta taréa?')
            if(res.value){
                await remove(`tasks/delete-task/${_id}`)
                log('Tasks', 'onDelete', {info: 'Success onDelete'})
                toast('Tarea eliminada')
                filterTask()
            }
        } catch (e) {
            error('Tasks', 'onDelete', {info: 'Catch error', error: e})
            toast('Problemas al eliminar, intente más tarde', 'error')
        }
    }

    const searchTask = e => {
        e.preventDefault()
        filterTask()
    }

    const filterTask = async () => {
        try {
            let query = `?name=${filter.name ? filter.name : ''}&state=${filter.state ? filter.state : ''}&devId=${filter.devId ? filter.devId : ''}&priority=${filter.priority ? filter.priority : ''}&quant=${quant}`
            const tasks = await get(`tasks/get-by-params/${query}`)
            log('Tasks', 'filterTask', {info: 'Success', response: tasks})
            setTasks(tasks.data)
        } catch (e) {
            error('Tasks', 'filterTask', {info: 'Catch error', error: e})
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
            <div className="container mt-5 mb-5">
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
                                        <Button className="btn btn-success" variant="primary" onClick={openNewModal}>
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
                                    <div className="col-md-2 mr-auto">
                                        <div className="form-group">
                                            <select onChange={e => setQuant(e.target.value)} name="" className="form-control" id="">
                                                {CONSTANTS.QUANT.map((q, i) => <option key={i+'_quant'} value={q.value}>{q.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ml-auto">
                                            <div className="form-group">
                                                <input type="text" placeholder="Buscar" className="form-control" name="" id=""/>
                                            </div>
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
