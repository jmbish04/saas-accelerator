"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const react_1 = require("react");
const FileUpload = () => {
    const [file, setFile] = (0, react_1.useState)(null);
    const handleUpload = async () => {
        if (!file)
            return;
        // Get presigned URL
        const res = await fetch("/api/storage/upload-url", {
            method: "POST",
            body: JSON.stringify({
                fileName: file.name,
                contentType: file.type,
            }),
        });
        const { url, key } = await res.json();
        // Upload file directly to R2
        await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });
        // Get public URL
        const publicUrl = `https://${process.env.NEXT_PUBLIC_R2_DOMAIN}/${key}`;
        console.log("File uploaded:", publicUrl);
    };
    return (<div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}/>
      <button onClick={handleUpload}>Upload</button>
    </div>);
};
exports.FileUpload = FileUpload;
