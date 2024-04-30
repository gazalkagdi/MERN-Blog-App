import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
    const { currentUser, error } = useSelector(state => state.user);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploading, setImageUploading] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [imageProgress, setImageProgress] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateDone, setUpdateDone] = useState(null);
    const [updateFail, setUpdateFail] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    }



    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image])


    const uploadImage = async () => {
        setImageUploading(true);
        setImageError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageProgress(progress.toFixed(0));
            },
            (error) => {
                setImageError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageProgress(null);
                setImage(null);
                setImageUrl(null);
                setImageUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageUploading(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUpdateDone(null);
        setUpdateFail(null);

        if (Object.keys(formData).length === 0) {
            setUpdateFail('No changes made')
            return;
        }
        if (imageUploading) {
            setUpdateFail('wait for Image upload');
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateFail(data.message)
            } else {
                dispatch(updateSuccess(data));
                setUpdateDone('User updated successfully!');
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateFail(error.message);
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            setImageError(error.message);
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                    {imageProgress &&
                        <CircularProgressbar value={imageProgress || 0} text={`${imageProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                },
                                path: {
                                    stroke: `rgba(62,152,199) ${imageProgress / 100}`
                                }
                            }}
                        />
                    }
                    <img src={imageUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageProgress && imageProgress < 100 && 'opacity-60'} `} />
                </div>
                {imageError &&
                    <Alert color="failure">
                        {imageError}
                    </Alert>
                }
                <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
                <Button type="submit" gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className="mt-5 text-red-500 flex justify-between">
                <span className="cursor-pointer" onClick={() => setShowModal(true)}>
                    Delete Account
                </span>
                <span className="cursor-pointer">
                    Sign Out
                </span>
            </div>
            {updateFail &&
                <Alert color='failure' className="mt-5">{updateFail}</Alert>
            }
            {/* {error &&
                <Alert color='failure' className="mt-5">{error}</Alert>
            } */}
            {updateDone &&
                <Alert color='success' className="mt-5">{updateDone}</Alert>
            }
            {showModal &&
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    popup
                    size='md'
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete the account?</h3>
                            <div className="flex justify-center gap-4">
                                <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}
