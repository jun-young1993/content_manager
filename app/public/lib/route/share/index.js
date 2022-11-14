/**
 * 
 * @param {*} prefix 
 * @param {*} random 
 * @returns 
 */
function uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};

function requestPost(file,uniqId){
    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', "/share/", true);

    uploadRequest.upload.addEventListener('progress', (event) => {
        if(event.lengthComputable) {
            const percent = Math.floor((event.loaded / event.total) * 100);
            document.getElementById(`${uniqId}-percent`).innerText = percent;
            document.getElementById(`${uniqId}-progress`).style = `width : ${percent}%`;
            
            // progressMessageDiv.innerText = percent + "%";
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
        const uniqId = uniqid("",true);
        fileList.appendChild(renderFile(file,uniqId));
        requestPost(file,uniqId);
    }

    function renderFile(file,uniqId) {
        let fileDOM = document.createElement("div");
        fileDOM.className = "file";
        fileDOM.innerHTML = `
              <div class="thumbnail">
                <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입 이미지" class="image">
              </div>
              <div class="details">
                <header class="header">
                  <span class="name">${file.name}</span>
                  <span class="size">${file.size}Byte</span>
                </header>
                <div class="progress">
                  <div id="${uniqId}-progress" class="bar" style="width: 0%;"></div>
                </div>
                <div class="status">
                  <span id="${uniqId}-percent" class="percent">0</span><span class"percent">%</span>
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