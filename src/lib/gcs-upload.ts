import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadDataUrlToGCS(pathPrefix: string, dataUrl: string) {
  try {
    console.log(`Starting upload to ${pathPrefix}...`);
    
    const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
    if (!match) throw new Error("Invalid data URL format");
    
    const mime = match[1];
    const b64 = match[2];
    console.log(`MIME type: ${mime}, Data size: ${b64.length} characters`);
    
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    console.log(`Converted to ${bytes.length} bytes`);
    
    const objectPath = `${pathPrefix}/${crypto.randomUUID()}`;
    console.log(`Upload path: ${objectPath}`);
    
    const objectRef = ref(storage, objectPath);
    console.log(`Uploading to Firebase Storage...`);
    
    await uploadBytes(objectRef, bytes, { contentType: mime });
    console.log(`Upload completed, getting download URL...`);
    
    const downloadUrl = await getDownloadURL(objectRef);
    console.log(`Download URL obtained: ${downloadUrl}`);
    
    return downloadUrl;
  } catch (error) {
    console.error(`Upload failed for ${pathPrefix}:`, error);
    throw new Error(`Firebase Storage upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function uploadFileToGCS(pathPrefix: string, file: File) {
  const safeName = `${Date.now()}-${file.name}`;
  const objectRef = ref(storage, `${pathPrefix}/${safeName}`);
  await uploadBytes(objectRef, file, { contentType: file.type });
  return await getDownloadURL(objectRef);
}

export async function normalizeMediaUrlsToGCS(
  prefix: string, 
  urls: string[], 
  onProgress?: (currentFile: string, completedFiles: number, totalFiles: number) => void
) {
  const result: string[] = [];
  const totalFiles = urls.length;
  console.log(`Processing ${totalFiles} URLs for prefix: ${prefix}`);
  
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    const fileName = u.startsWith("data:") ? `File ${i + 1}` : `URL ${i + 1}`;
    console.log(`Processing URL ${i + 1}/${urls.length}:`, u.substring(0, 50) + '...');
    
    // Update progress
    onProgress?.(fileName, i, totalFiles);
    
    try {
      if (u.startsWith("data:")) {
        console.log(`Uploading data URL ${i + 1} to Firebase Storage...`);
        const uploadedUrl = await uploadDataUrlToGCS(prefix, u);
        console.log(`Uploaded successfully:`, uploadedUrl);
        result.push(uploadedUrl);
      } else {
        console.log(`Keeping existing URL ${i + 1}:`, u);
        result.push(u);
      }
    } catch (error) {
      console.error(`Failed to process URL ${i + 1}:`, error);
      throw new Error(`Failed to upload file ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Final progress update
  onProgress?.("Completed", totalFiles, totalFiles);
  console.log(`Successfully processed all ${result.length} URLs`);
  return result;
}


