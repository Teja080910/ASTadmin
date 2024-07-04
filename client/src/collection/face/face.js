import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './face.css';

export const Face = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  let intervalId;
  const tejaImages = [];

  useEffect(() => {
    startVideo();
    if (videoRef.current) {
      loadModels();
    }
    return () => clearInterval(intervalId);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);
    faceMyDetect();
  };
  const faceMyDetect = () => {
    intervalId = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      const resizedDetections = faceapi.resizeResults(detections, { width: canvas.width, height: canvas.height });
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Load Teja's face descriptor
      const tejaImage = await faceapi.fetchImage('like.png');
      const tejaDescriptor = await faceapi.computeFaceDescriptor(tejaImage);

      // Recognize faces
      resizedDetections.forEach(async(detection) => {
        const faceDescriptor = detection.descriptor;
        const distance = faceapi.euclideanDistance(faceDescriptor, tejaDescriptor);
        const isTeja = distance < 0.6; // Adjust threshold as needed
        if (isTeja) {
          context.fillStyle = 'green';
          context.font = '18px Arial';
          console.log("ok");
          // context.fillText('Teja', detection.box.x, detection.box.y - 10);
        } else {
          context.fillStyle = 'red';
          context.font = '18px Arial';
          console.log("not ok")
          // const image = await faceapi.fetchImage(tejaImage);
          // const resizedImage = await faceapi.bufferToImage(image);
          // tejaImages.push(resizedImage);
          // const tejaDescriptors = await Promise.all(tejaImages.map(async (image) => {
          //   return await faceapi.computeFaceDescriptor(image);
          // }));
          
          // // Save the computed descriptors for future use
          // localStorage.setItem('tejaDescriptors', JSON.stringify(tejaDescriptors));
          
          // console.log('Teja\'s face descriptors trained successfully.');
          // context.fillText('Unknown', detection.box.x, detection.box.y - 10);
        }
      });
    }, 1000);
  };

  return (
    <div className="myapp">
      <h1>Face Detection</h1>
      <div className="appvideo">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
    </div>
  );
};

export default Face;
