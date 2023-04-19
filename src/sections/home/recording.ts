class Recording{
 mediaRecorder?: MediaRecorder;
 chunks: Blob[] = []

 async start(){
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));;
      }

       navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);

        this.chunks = []
  
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          this.chunks.push(event.data)
        });

        //save audio type to pass to set the Blob type
        let mimeType = this.mediaRecorder?.mimeType;

        //listen to the stop event in order to create & return a single Blob object
        this.mediaRecorder.addEventListener("stop", () => {
            //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
            let audioBlob = new Blob(this.chunks, { type: mimeType });

            console.log("inside recorgin")
        });
  
        this.mediaRecorder.start();

        // console.log(this.mediaRecorder)
    
      });

      return Promise.resolve(this.mediaRecorder)
 }

 stop(mediRecorders: MediaRecorder){
    mediRecorders.stop()
 }
}

export default Recording