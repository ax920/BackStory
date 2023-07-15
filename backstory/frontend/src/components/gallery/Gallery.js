import "./Gallery.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import AddCard from "../upload/AddCard";
import EditModal from "../upload/EditModal";
import Modal from "@mui/material/Modal";
import PolaroidImage from '../PolaroidImage/PolaroidImage'
import Upload from "../upload/Upload";
import { fetchPhotoIds } from '../../slices/photos.js'
import { useAuth0 } from "@auth0/auth0-react";

function Gallery() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSRC, setEditSRC] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth0()

  useEffect(() => {
    dispatch(fetchPhotoIds(user.email))
  }, [dispatch]);

  const photoIds = useSelector((state) => state.user.photoIds);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex !== index ? index : null);
  };
  const handleDelete = () => {
    fetch(`/${user.email}`, { method: 'DELETE' })
    .then(() => dispatch(fetchPhotoIds(user.email)))
    .catch(console.error)
  };
  const handleEdit = (imageURL) => {
    setEditSRC(imageURL);
    setEditModalOpen(true);
    //dispatch(editPhoto({imageURL: imageURL, caption: caption}));
  };
  const handleSetUploadModalOpen = () => {
    setUploadModalOpen(true);
  };
  const handleSetUploadModalClose = () => {
    setUploadModalOpen(false);
  };
  const handleSetEditModalOpen = () => {
    setEditModalOpen(true);
  };
  const handleSetEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="wrapper">
        <div className="grid">
          <div onClick={handleSetUploadModalOpen}>
            <AddCard />
          </div>
          {photoIds?.map((photo, index) => (
            <PolaroidImage
              id={photo._id}
              key={index}
              isFlipped={flippedIndex === index}
              onFlip={() => handleFlip(index)}
              imageURL={`http://localhost:8000/image/${photo.photoId}`}
              caption={photo.caption}
              deletePhoto={handleDelete}
              editPhoto={handleEdit}
            />
          ))}
        </div>
      </div>
      <Modal open={uploadModalOpen} onClose={handleSetUploadModalClose}>
        <div className="modal">
          <Upload imageSrc={"https://cdn.wallpapersafari.com/50/4/wa7o0g.png"} closeModal={handleSetUploadModalClose} />
        </div>
      </Modal>
      <Modal open={editModalOpen} onClose={handleSetEditModalClose}>
        <div className="modal">
          <EditModal imageSrc={editSRC} closeModal={handleSetEditModalClose} />
        </div>
      </Modal>
    </>
  );
}


export default Gallery;
