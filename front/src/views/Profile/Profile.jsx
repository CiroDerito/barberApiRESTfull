import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Profile.module.css';
import { userLogOut, updateUserImage, userLogIn } from "../../redux/reducer";
import { toast } from 'sonner'


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSesion = useSelector(state => state.sesion.userSesion);


    const [image, setImage] = useState(userSesion?.profileImage || "");
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState(userSesion?.profileImage || "");

    useEffect(() => {
        if (userSesion?.profileImage) {
            setImage(userSesion.profileImage);
            setPreview(userSesion.profileImage);
        }
    }, [userSesion]);

    if (!userSesion) {
        return <p>No hay una sesión activa.</p>;
    }

    const { email, name, id } = userSesion;

    const handleLogOut = () => {
        dispatch(userLogOut());
        navigate('/home');
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const confirmed = window.confirm(
                "Are you sure? By uploading this photo, you give permission for it to be used on the page and it will be available for everyone to see."
            );
            toast.success('Profile picture updated successfully')

            if (!confirmed) return;

            setNewImage(file);




            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('profileImage', file);
            formData.append('userId', id);

            try {
                const response = await axios.put(`http://localhost:3000/users/update-image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    console.log('Image updated successfully');
                    const updatedUser = response.data;

                    if (updatedUser.profileImage) {
                        dispatch(updateUserImage(updatedUser.profileImage));
                        setImage(updatedUser.profileImage);
                        setPreview(updatedUser.profileImage);
                    } else {
                        console.error('The server response does not contain the image URL.');
                    }
                } else {
                    console.error('Error in server response:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating image on server', error);
            }
        } else {
            toast.error("No file selected.");
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.container}>
                <h2 className={styles.title}>User Panel</h2>
                <div className={styles.userImageContainer}>
                    <img src={preview} alt="Profile" className={styles.profileImage} />
                    <label htmlFor="fileInput" className={styles.fileInputLabel}>
                        <img
                            src="https://www.shutterstock.com/image-vector/switch-front-back-camera-line-600nw-250344517.jpg"
                            alt="Change profile"
                            className={styles.fileInputIcon}
                        />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                </div>
                <div className={styles.profileDate}>
                    <p>Email: {email}</p>
                    <p>Nombre: {name}</p>
                </div>
                <button className={styles.logoutButton} onClick={handleLogOut}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Profile;
