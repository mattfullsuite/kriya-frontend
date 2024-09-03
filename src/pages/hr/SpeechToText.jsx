// import MicRecorder from "mic-recorder-to-mp3"
// import { useEffect, useState, useRef } from "react"
// import axios from "axios"
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

//   // Set AssemblyAI Axios Header
//   const assembly = axios.create({
//     baseURL: "https://api.assemblyai.com/v2",
//     headers: {
//       authorization: "2cc61cda1e764cb3bfd807ec9f4e626f",
//       "content-type": "application/json",
//       "transfer-encoding": "chunked",
//     },
//   })

// const SpeechToText = () => {
//   // Mic-Recorder-To-MP3
//   const recorder = useRef(null) //Recorder
//   const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
//   const [blobURL, setBlobUrl] = useState(null)
//   const [audioFile, setAudioFile] = useState(null)
//   const [isRecording, setIsRecording] = useState(null)

//    // Periodically check the status of the Transcript
//    useEffect(() => {
//     const interval = setInterval(() => {
//       if (transcriptData.status !== "completed" && isLoading) {
//         checkStatusHandler()
//       } else {
//         setIsLoading(false)
//         setTranscript(transcriptData.text)

//         clearInterval(interval)
//       }
//     }, 1000)
//     return () => clearInterval(interval)
//   }, )

//   useEffect(() => {
//     //Declares the recorder object and stores it inside of ref
//     recorder.current = new MicRecorder({ bitRate: 128 })
//   }, [])

//   const startRecording = () => {
//     // Check if recording isn't blocked by browser
//     recorder.current.start().then(() => {
//       setIsRecording(true)
//     })
//   }

//   const stopRecording = () => {
//     recorder.current
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const file = new File(buffer, "audio.mp3", {
//           type: blob.type,
//           lastModified: Date.now(),
//         })
//         const newBlobUrl = URL.createObjectURL(blob)
//         setBlobUrl(newBlobUrl)
//         setIsRecording(false)
//         setAudioFile(file)
//       })
//       .catch((e) => console.log(e))
//   }

//   // AssemblyAI API

//   // State variables
//   const [uploadURL, setUploadURL] = useState("")
//   const [transcriptID, setTranscriptID] = useState("")
//   const [transcriptData, setTranscriptData] = useState("")
//   const [transcript, setTranscript] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   // Upload the Audio File and retrieve the Upload URL
//   useEffect(() => {
//     if (audioFile) {
//       assembly
//         .post("/upload", audioFile)
//         .then((res) => setUploadURL(res.data.upload_url))
//         .catch((err) => console.error(err))
//     }
//   }, [audioFile])

//   // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
//   const submitTranscriptionHandler = () => {
//     assembly
//       .post("/transcript", {
//         audio_url: uploadURL,
//       })
//       .then((res) => {
//         setTranscriptID(res.data.id)

//         checkStatusHandler()
//       })
//       .catch((err) => console.error(err))
//   }

//   // Check the status of the Transcript
//   const checkStatusHandler = async () => {
//     setIsLoading(true)
//     try {
//       await assembly.get(`/transcript/${transcriptID}`).then((res) => {
//         setTranscriptData(res.data)
//       })
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // Periodically check the status of the Transcript
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (transcriptData.status !== "completed" && isLoading) {
//         checkStatusHandler()
//       } else {
//         setIsLoading(false)
//         setTranscript(transcriptData.text)

//         clearInterval(interval)
//       }
//     }, 1000)
//     return () => clearInterval(interval)
//   },)

//   const handleDownloadPDF = () => {
//     const input = document.getElementById('pdf-content');
//     // Specify the id of the element you want to convert to PDF
//     html2canvas(input).then((canvas) => {
//       //const imgData = canvas.toDataURL('image/png');

//       const pdf = new jsPDF();

//         var pageHeight= pdf.internal.pageSize.height;
//         var splitTitle = pdf.splitTextToSize(transcript, 180);

//         var y = 500 // Height position of new content

//         if (y >= pageHeight){
//             pdf.addPage();
//             y = 0 // Restart height position
//             pdf.text(15, 20, splitTitle);
//         }
//         pdf.text(15, 20, splitTitle);
//         //doc.text(x, y, "value");

//       //pdf.text(transcript, 10, 10);
//       //   pdf.addImage(imgData, 'PNG', 0, 0);
//       pdf.save('downloaded-file.pdf');
//       // Specify the name of the downloaded PDF file
//     });
//   };

//   return (
//     <div className="flex flex-col" >
//       <audio ref={audioPlayer} src={blobURL} controls='controls' />
//       <div>
//         <button className="btn btn-success" disabled={isRecording} onClick={startRecording}>
//           Start
//         </button>
//         <button className="btn btn-info m-8" disabled={!isRecording} onClick={stopRecording}>
//           Stop
//         </button>
//         <button className="btn btn-warning" onClick={submitTranscriptionHandler}>Submit</button>
//       </div>
//       {transcriptData.status === "completed" ? (
//         <div>
//             <p id="pdf-content">{transcript}</p>
//             <button className="btn btn-info mt-10" onClick={handleDownloadPDF}>Download PDF</button>
//         </div>

//       ) : (
//         <p>{transcriptData.status}</p>
//       )}
//     </div>
//   )
// }

// export default SpeechToText
