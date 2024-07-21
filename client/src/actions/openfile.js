import axios from "axios";
import { api } from "./api";
export const OpenFile = async (filename) => {
    try {
        const url = `${api}/file/${filename}`;
        const response = await axios.get(url, { responseType: 'blob' });
        const fileType = response?.data?.type;
        if (fileType.startsWith('image/')) {
            const imageBlob = new Blob([response.data], { type: fileType });
            const imageUrl = URL.createObjectURL(imageBlob);
            return { url: imageUrl, type: "image" }
        }
        else if (fileType === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = (e) => {
                return { url: e.target.result, type: "svg" }
            };
            reader.readAsText(response.data);
        } else if (fileType === 'application/pdf') {
            const pdfBlob = new Blob([response.data], { type: fileType });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return { url: pdfUrl, type: "pdf" }
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const pdfBlob = new Blob([response.data], { type: fileType });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return { url: pdfUrl, type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
        }
        else {
            console.error('The file is not an image or PDF');
        }
    } catch (e) {
        console.error(e);
    }
}