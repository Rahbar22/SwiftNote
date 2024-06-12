import React,{useEffect} from 'react'
import MainScreen from '../components/MainScreen'
import { Link } from 'react-router-dom'
import{Accordion, Card, Badge} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { deleteNoteAction, listNotes } from '../actions/noteAction'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'

function Notes({search}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteList = useSelector((state) => state.noteList);
    const {loading, error, notes} = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure")){
            dispatch(deleteNoteAction(id))
        }
    };

    useEffect(()=>{
        dispatch(listNotes());
        if(!userInfo){
            navigate("/");
        }
    }, [dispatch,
        navigate,
        userInfo,
        successCreate,
        successUpdate,
        successDelete,
    ]);

  return (
    <MainScreen title= {`Welcome back ${userInfo && userInfo.name}..`}>
        <Link to="/createnote">
            <button type="button" className="btn btn-primary m-3">Create New Note</button>
        </Link>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
        {loading && <Loading/>}
        {loadingDelete && <Loading/>}
        {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
                <Accordion>
                    <Accordion.Item className='m-3' eventKey="0">
                        <Card key={note._id}>
                        <Accordion.Header as={Card.Text} variant="link" eventKey="0">
                            <div className="card-header d-flex w-100">
                                <span className='text-dark flex-grow-1 align-self-center' style={{fontSize:16}}>
                                    {note.title}
                                </span>
                                <div>
                                        <Link to={`/note/${note._id}`}><button type="button" className="btn btn-primary">Edit</button></Link>
                                        <button type="button" className="btn btn-danger mx-2" onClick={()=>deleteHandler(note._id)}>Delete</button>
                                    </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body eventKey="0">
                            <div class="card-body">
                                <h4 className='badge bg-success'>Category - {note.category}</h4>
                                <blockquote class="blockquote mb-0">
                                <p>{note.content}</p>
                                <footer className="blockquote-footer">
                                    Created on{" "}
                                    <cite title="Source Title">
                                    {note.createdAt.substring(0, 10)}
                                    </cite>
                                </footer>
                                </blockquote>
                            </div>
                        </Accordion.Body>
                        </Card>
                    </Accordion.Item>
                </Accordion>
            ))
        }

    </MainScreen>
  )
}

export default Notes
