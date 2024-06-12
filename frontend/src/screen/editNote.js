import React, {useState, useEffect} from 'react'
import MainScreen from '../components/MainScreen'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { updateNoteAction } from '../actions/noteAction';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { deleteNoteAction } from '../actions/noteAction';

function EditNote({match}){
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    const {id} = useParams();

    useEffect(() => {
        const fetching = async () => {
        const { data } = await axios.get(`/api/notes/${id}`);

        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
        };

        fetching();
    }, [id, date]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    };

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
          dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
    };
    
  return (
    <MainScreen title='Edit Note'>
        <Card>
            <Card.Header>Edit your note</Card.Header>
            <Card.Body>
                <Form onSubmit={updateHandler}>
                {loadingDelete && <Loading />}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
                    <Form.Group className='mb-3' controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="title"
                            value={title}
                            placeholder="Enter the title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={content}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setContent(e.target.value)}
                        />
                     </Form.Group>

                     <Form.Group className='mb-3' controlId="content">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="content"
                            value={category}
                            placeholder="Enter the Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    {loading && <Loading size={50} />}
                    <Button variant="primary" type="submit">Update Note</Button>
                    <Button className='mx-2' 
                    onClick={() => deleteHandler(id)} 
                    variant='danger'>Delete Note</Button>
                </Form>
            </Card.Body>

            <Card.Footer className="text-muted">
                Updated on - {date.substring(0, 10)}
            </Card.Footer>
        </Card>
    </MainScreen>
  )
}

export default EditNote
