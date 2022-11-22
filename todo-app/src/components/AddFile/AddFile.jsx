import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./AddFile.css";

const AddFile = ({ callback }) => {
  const [file, setFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(true);
  const [progress, setProgress] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handlerChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadFile = (e) => {
    e.preventDefault();
    if (!file) return;
    setLoadingFile(false);
    const id = Date.now().toString();
    const storageRef = ref(storage, `files/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        alert(err);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          setFileUrl(url);
          callback(id, url);
          setLoadingFile(true);
        });
      }
    );
  };
  return (
    <div className="fileFormWrapper">
      <form className="fileForm" onSubmit={(e) => uploadFile(e)}>
        <label className="formLabel" htmlFor="file">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handlerChangeFile}
          ></input>
          {progress && <progress value={progress} max="100" />}
        </label>
        <button className="todoBtn" type="submit" disabled={!loadingFile}>
          Add file
        </button>
        {fileUrl && (
          <a href={fileUrl} download="true" target="_blank" rel="noreferrer">
            download file
          </a>
        )}
      </form>
    </div>
  );
};
export default AddFile;
