function requestPost(file){
    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', "/share/", true);

    uploadRequest.upload.addEventListener('progress', (event) => {
        if(event.lengthComputable) {
            const percent = Math.floor((event.loaded / event.total) * 100);
            console.log('progress', percent);
            // progressMessageDiv.innerText = percent + "%";
        } else {
            console.log('progress', uploadRequest);
            // progressMessageDiv.innerHTML = "&nbsp;&nbsp;&nbsp;Uploading...";
        }
    });
    const formData = new FormData();
    const filePath = (
        (file.webkitRelativePath != null && file.webkitRelativePath != "") ?
            file.webkitRelativePath :
            file.name
    )
    formData.append(filePath,file);
    uploadRequest.send(formData);
}

function DropFile(dropAreaId, fileListId) {
    console.log("=>(index.js:3) dropAreaId", dropAreaId);
    console.log("=>(index.js:4) fileListId", fileListId);
    let dropArea = document.getElementById(dropAreaId);
    let fileList = document.getElementById(fileListId);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        preventDefaults(e);
        dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
        preventDefaults(e);
        dropArea.classList.remove("highlight");
    }

    function handleDrop(e) {
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);

        const fileList = document.getElementById(fileListId);
        if (fileList) {
            fileList.scrollTo({ top: fileList.scrollHeight });
        }
    }

    function handleFiles(files) {
        files = [...files];
        files.forEach(previewFile);
    }

    function previewFile(file) {
        console.log("=>(index.js:44) file", file);
        requestPost(file);
        fileList.appendChild(renderFile(file));
    }

    function renderFile(file) {
        let fileDOM = document.createElement("div");
        fileDOM.className = "file";
        fileDOM.innerHTML = `
              <div class="thumbnail">
                <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입 이미지" class="image">
              </div>
              <div class="details">
                <header class="header">
                  <span class="name">${file.name}</span>
                  <span class="size">${file.size}</span>
                </header>
                <div class="progress">
                  <div class="bar" style="width: 0%;"></div>
                </div>
                <div class="status">
                  <span class="percent">0%</span>
                  <span class="speed">90KB/sec</span>
                </div>
              </div>
            `;
        return fileDOM;
    }

    dropArea.addEventListener("dragenter", highlight, false);
    dropArea.addEventListener("dragover", highlight, false);
    dropArea.addEventListener("dragleave", unhighlight, false);
    dropArea.addEventListener("drop", handleDrop, false);

    return {
        handleFiles
    };
}

const dropFile = new DropFile("drop-file", "files");