'use client';

import { useRef, useState } from 'react';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current?.click();
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(undefined);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div>
                    {!pickedImage && <p>No image picked yet. </p>}
                    {pickedImage && <img src={pickedImage} alt="The image selected by the user" />}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}